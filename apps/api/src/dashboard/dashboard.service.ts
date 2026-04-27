import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

type DashboardPayload = {
  resume_history: Array<{
    id: string;
    fileName: string;
    fileType: string;
    createdAt: Date;
  }>;
  analytics: {
    total_resumes: number;
    avg_ats_score: number;
    avg_job_match: number;
  };
};

@Injectable()
export class DashboardService {
  private readonly redis: Redis | null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    this.redis = redisUrl ? new Redis(redisUrl) : null;
  }

  async getDashboard(userId: string) {
    const cacheKey = `dashboard:${userId}`;
    if (this.redis) {
      const cached = await this.redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached) as DashboardPayload;
      }
    }

    const [resumes, analyses, matches] = await Promise.all([
      this.prisma.resume.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: {
          id: true,
          fileName: true,
          fileType: true,
          createdAt: true,
        },
      }),
      this.prisma.analysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { atsScore: true, createdAt: true },
      }),
      this.prisma.jobMatch.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { matchScore: true, createdAt: true },
      }),
    ]);

    const avgAtsScore = analyses.length
      ? Math.round(
          analyses.reduce((sum, item) => sum + item.atsScore, 0) /
            analyses.length,
        )
      : 0;
    const avgJobMatch = matches.length
      ? Math.round(
          matches.reduce((sum, item) => sum + item.matchScore, 0) /
            matches.length,
        )
      : 0;

    const payload: DashboardPayload = {
      resume_history: resumes,
      analytics: {
        total_resumes: resumes.length,
        avg_ats_score: avgAtsScore,
        avg_job_match: avgJobMatch,
      },
    };

    if (this.redis) {
      await this.redis.set(cacheKey, JSON.stringify(payload), 'EX', 30);
    }
    return payload;
  }
}
