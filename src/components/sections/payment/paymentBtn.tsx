"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface CheckoutButtonProps {
    products: { name: string; price: number; quantity: number }[];
}

export default function CheckoutButton({ products }: CheckoutButtonProps) {
    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v4/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ products }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.error || "Failed to create checkout session");
            }

            const { id } = await response.json();

            const stripe = await stripePromise;
            if (!stripe) throw new Error("Stripe.js failed to load");

            // Redirect to Stripe Checkout
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong during checkout. Please try again.");
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="w-[90%] bg-white py-2 text-center border border-myOrange text-sm font-medium text-myOrange hover:bg-lightOrange hover:text-myOrange"
        >
            Checkout
        </button>
    );
}
