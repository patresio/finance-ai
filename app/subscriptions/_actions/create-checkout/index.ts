"use server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "boleto", "cashapp"], // Define o tipo de método de pagamento como cartão
    mode: "subscription", // Define o modo como assinatura
    success_url: process.env.APP_URL, // Define a URL de sucesso
    cancel_url: process.env.APP_URL, // Define a URL de cancelamento
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID, // Define o ID do plano de assinatura
        quantity: 1,
      },
    ],
  });
  return { sessionId: session.id };
};
