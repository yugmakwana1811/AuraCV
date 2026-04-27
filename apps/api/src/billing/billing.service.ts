/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BillingService {
  private readonly stripe: any | null;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secret = this.configService.get<string>('STRIPE_SECRET_KEY');
    this.stripe = secret ? new Stripe(secret) : null;
  }

  async createCheckoutSession(userId: string, planId: string) {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const priceId = this.resolvePriceId(planId);
    const appUrl =
      this.configService.get<string>('APP_URL') ?? 'http://localhost:3000';
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: `${appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/billing/cancel`,
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        userId: user.id,
        planId,
      },
    });
    return {
      checkout_url: session.url,
      subscription_status: user.subscriptionStatus,
    };
  }

  async handleWebhook(payload: Buffer | string, signature?: string) {
    if (!this.stripe) {
      return { accepted: false, reason: 'Stripe not configured' };
    }

    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );
    let event: any;
    if (webhookSecret && signature) {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } else {
      const raw =
        typeof payload === 'string' ? payload : payload.toString('utf8');
      event = JSON.parse(raw);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      if (userId) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: session.customer?.toString(),
            stripeSubscriptionId: session.subscription?.toString(),
            subscriptionStatus: 'ACTIVE',
          },
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      await this.prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { subscriptionStatus: 'CANCELED' },
      });
    }

    return { accepted: true };
  }

  private resolvePriceId(planId: string) {
    if (planId === 'pro') {
      return this.configService.get<string>('STRIPE_PRICE_PRO') ?? '';
    }
    return this.configService.get<string>('STRIPE_PRICE_BASIC') ?? '';
  }
}
