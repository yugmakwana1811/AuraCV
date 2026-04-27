import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import * as mammoth from 'mammoth';

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async uploadResume(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const parsedText = await this.extractText(file);
    if (!parsedText.trim()) {
      throw new BadRequestException('Unable to extract text from resume');
    }

    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `resumes/${userId}/${Date.now()}-${safeName}`;
    const storageUrl = await this.storageService.uploadResume(
      file.buffer,
      key,
      file.mimetype,
    );

    const resume = await this.prisma.resume.create({
      data: {
        userId,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        storageUrl,
        parsedText,
      },
    });

    return {
      id: resume.id,
      parsed_text: resume.parsedText,
      stored_file_url: resume.storageUrl,
      created_at: resume.createdAt,
    };
  }

  private async extractText(file: Express.Multer.File) {
    if (file.mimetype === 'application/pdf') {
      const pdfParseModule = await import('pdf-parse');
      const pdfParse = pdfParseModule as unknown as (
        input: Buffer,
      ) => Promise<{ text?: string }>;
      const parsed = await pdfParse(file.buffer);
      return parsed.text ?? '';
    }
    if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value ?? '';
    }
    throw new BadRequestException('Unsupported file type');
  }
}
