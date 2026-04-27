import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    });
  }

  async getAnalytics() {
    const [users, resumes, analyses, activeSubscriptions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.resume.count(),
      this.prisma.analysis.count(),
      this.prisma.user.count({
        where: { subscriptionStatus: 'ACTIVE' },
      }),
    ]);
    return {
      users,
      resumes,
      analyses,
      active_subscriptions: activeSubscriptions,
    };
  }

  async paymentOverview() {
    const paidUsers = await this.prisma.user.findMany({
      where: { subscriptionStatus: 'ACTIVE' },
      select: {
        id: true,
        email: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
      },
      take: 100,
    });
    return { paid_users: paidUsers };
  }
}
