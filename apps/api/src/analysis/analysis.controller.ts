import { Body, Controller, Post, Req } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AiSuggestionsDto } from './dto/ai-suggestions.dto';
import { AtsScoreDto } from './dto/ats-score.dto';
import { JobMatchDto } from './dto/job-match.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('ats-score')
  atsScore(@Req() req: { user: { sub: string } }, @Body() dto: AtsScoreDto) {
    return this.analysisService.getAtsScore(req.user.sub, dto);
  }

  @Post('ai-suggestions')
  aiSuggestions(@Body() dto: AiSuggestionsDto) {
    return this.analysisService.getAiSuggestions(dto);
  }

  @Post('job-match')
  jobMatch(@Req() req: { user: { sub: string } }, @Body() dto: JobMatchDto) {
    return this.analysisService.getJobMatch(req.user.sub, dto);
  }
}
