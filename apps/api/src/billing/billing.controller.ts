import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { BillingService } from './billing.service';

type StripeWebhookRequest = Request & { rawBody?: string | Buffer };

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('checkout')
  checkout(
    @Req() req: { user: { sub: string } },
    @Body() dto: CreateCheckoutDto,
  ) {
    return this.billingService.createCheckoutSession(req.user.sub, dto.plan_id);
  }

  @Public()
  @Post('webhook')
  webhook(
    @Req() req: StripeWebhookRequest,
    @Headers('stripe-signature') signature?: string,
  ) {
    return this.billingService.handleWebhook(
      req.rawBody ?? Buffer.from(JSON.stringify(req.body)),
      signature,
    );
  }
}
