import { IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  plan_id!: string;
}
