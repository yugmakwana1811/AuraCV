import { IsOptional, IsString } from 'class-validator';

export class AtsScoreDto {
  @IsOptional()
  @IsString()
  resumeId?: string;

  @IsString()
  parsedResume!: string;
}
