"use server";

import Stripe from "stripe";
import { errorResponse } from "../utils";
import { PRODUCTS } from "../constants";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY!);

export async function generateStripeCheckoutUrl(
  billingId: string,
  products: IProductInput[]
) {
  console.log(false);
}

// NOTE: https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local [Stripe Webhook]
// NOTE: https://docs.stripe.com/stripe-cli [Stripe CLI]
export async function processStripeWehookEvent(request: Request) {
  console.log(false);
}
