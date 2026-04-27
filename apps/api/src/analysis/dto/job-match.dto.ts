import { IsOptional, IsString } from 'class-validator';

export class JobMatchDto {
  @IsOptional()
  @IsString()
  resumeId?: string;

  @IsString()
  resume!: string;

  @IsString()
  jobDescription!: string;
}
