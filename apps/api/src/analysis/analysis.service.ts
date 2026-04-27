import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import { AiSuggestionsDto } from './dto/ai-suggestions.dto';
import { AtsScoreDto } from './dto/ats-score.dto';
import { JobMatchDto } from './dto/job-match.dto';

type AiSuggestionPayload = {
  improved_bullets?: unknown;
  skills_suggestions?: unknown;
};

@Injectable()
export class AnalysisService {
  private readonly openai: OpenAI | null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.openai = apiKey ? new OpenAI({ apiKey }) : null;
  }

  async getAtsScore(userId: string, dto: AtsScoreDto) {
    const normalized = dto.parsedResume.toLowerCase();
    const skillsScore = this.scoreSkills(normalized);
    const experienceScore = this.scoreExperience(normalized);
    const educationScore = this.scoreEducation(normalized);

    const score = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          skillsScore * 0.4 + experienceScore * 0.4 + educationScore * 0.2,
        ),
      ),
    );

    const suggestions = this.generateSuggestions(normalized);
    const analysis = await this.prisma.analysis.create({
      data: {
        userId,
        resumeId: dto.resumeId,
        atsScore: score,
        skillsSection: JSON.stringify(skillsScore),
        experienceScore,
        educationScore,
        suggestionsJson: suggestions,
      },
    });

    return {
      id: analysis.id,
      score,
      sections: {
        skills: skillsScore,
        experience: experienceScore,
        education: educationScore,
      },
      suggestions,
    };
  }

  async getAiSuggestions(dto: AiSuggestionsDto) {
    const fallback = this.generateAiFallback(dto.resumeText);
    if (!this.openai) {
      return fallback;
    }

    try {
      const response = await Promise.race([
        this.openai.responses.create({
          model: 'gpt-4.1-mini',
          input: [
            {
              role: 'system',
              content:
                'You improve resumes. Return compact JSON with improved_bullets (string[]) and skills_suggestions (string[]).',
            },
            { role: 'user', content: dto.resumeText },
          ],
          text: {
            format: {
              type: 'json_schema',
              name: 'resume_suggestions',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  improved_bullets: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  skills_suggestions: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['improved_bullets', 'skills_suggestions'],
                additionalProperties: false,
              },
            },
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI timeout')), 5000),
        ),
      ]);
      const parsed = JSON.parse(
        (response as OpenAI.Responses.Response).output_text,
      ) as AiSuggestionPayload;
      return {
        improved_bullets:
          Array.isArray(parsed.improved_bullets) &&
          parsed.improved_bullets.length
            ? parsed.improved_bullets
            : fallback.improved_bullets,
        skills_suggestions:
          Array.isArray(parsed.skills_suggestions) &&
          parsed.skills_suggestions.length
            ? parsed.skills_suggestions
            : fallback.skills_suggestions,
      };
    } catch {
      return fallback;
    }
  }

  async getJobMatch(userId: string, dto: JobMatchDto) {
    const resumeTokens = this.tokenize(dto.resume);
    const jobTokens = this.tokenize(dto.jobDescription);
    const overlap = [...jobTokens].filter((token) => resumeTokens.has(token));
    const matchScore = Math.max(
      0,
      Math.min(
        100,
        Math.round((overlap.length / Math.max(1, jobTokens.size)) * 100),
      ),
    );
    const missingKeywords = [...jobTokens]
      .filter((token) => !resumeTokens.has(token))
      .slice(0, 20);

    const match = await this.prisma.jobMatch.create({
      data: {
        userId,
        resumeId: dto.resumeId,
        jobDescription: dto.jobDescription,
        matchScore,
        missingKeywords,
      },
    });

    return {
      id: match.id,
      match_score: matchScore,
      missing_keywords: missingKeywords,
    };
  }

  private scoreSkills(text: string) {
    const skillKeywords = [
      'typescript',
      'javascript',
      'react',
      'node',
      'sql',
      'aws',
      'docker',
      'leadership',
      'communication',
    ];
    const found = skillKeywords.filter((keyword) =>
      text.includes(keyword),
    ).length;
    return Math.min(100, 30 + found * 8);
  }

  private scoreExperience(text: string) {
    const indicators = [
      'experience',
      'years',
      'led',
      'managed',
      'delivered',
      'improved',
    ];
    const found = indicators.filter((keyword) => text.includes(keyword)).length;
    return Math.min(100, 35 + found * 10);
  }

  private scoreEducation(text: string) {
    const indicators = [
      'bachelor',
      'master',
      'degree',
      'university',
      'college',
      'certification',
    ];
    const found = indicators.filter((keyword) => text.includes(keyword)).length;
    return Math.min(100, 40 + found * 10);
  }

  private generateSuggestions(text: string) {
    const suggestions: string[] = [];
    if (!text.includes('%')) {
      suggestions.push(
        'Add measurable outcomes (for example, percentages or cost savings).',
      );
    }
    if (!text.includes('lead')) {
      suggestions.push(
        'Highlight leadership or ownership verbs for key achievements.',
      );
    }
    if (!text.includes('skills')) {
      suggestions.push(
        'Include a dedicated skills section tailored to target job descriptions.',
      );
    }
    if (!suggestions.length) {
      suggestions.push(
        'Strong foundation detected; tailor keywords for each job post.',
      );
    }
    return suggestions;
  }

  private generateAiFallback(resumeText: string) {
    const lines = resumeText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const improved = lines.slice(0, 3).map((line) => {
      if (line.startsWith('-')) {
        return `${line} with clear business impact and quantifiable outcomes.`;
      }
      return `Led initiative: ${line} with measurable improvements.`;
    });

    return {
      improved_bullets: improved.length
        ? improved
        : [
            'Led cross-functional execution to deliver measurable business impact.',
          ],
      skills_suggestions: [
        'ATS keyword optimization',
        'Impact-focused writing',
        'Role-targeted skills',
      ],
    };
  }

  private tokenize(text: string) {
    return new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9+#]+/)
        .filter((token) => token.length > 2),
    );
  }
}
