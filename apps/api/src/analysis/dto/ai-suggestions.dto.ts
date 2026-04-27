import { IsString } from 'class-validator';

export class AiSuggestionsDto {
  @IsString()
  resumeText!: string;
}
