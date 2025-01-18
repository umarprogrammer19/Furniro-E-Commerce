"use server";

import { IProductInput } from "@/types";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY!);
console.log(stripe);

export async function generateStripeCheckoutUrl(
  billingId: string,
  products: IProductInput[]
) {
  console.log(false, products);
  return billingId;
}

// NOTE: https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local [Stripe Webhook]
// NOTE: https://docs.stripe.com/stripe-cli [Stripe CLI]
export async function processStripeWehookEvent(request: Request) {
  return request
}
