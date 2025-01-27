"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface CheckoutButtonProps {
    products: { name: string; price: number; quantity: number }[];
    totalPrice: number;
}

export default function CheckoutButton({ products, totalPrice }: CheckoutButtonProps) {
    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v4/checkout", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ products }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.error || "Failed to create checkout session");
            }

            const { id } = await response.json();
            const stripe = await stripePromise;
            if (!stripe) throw new Error("Stripe.js failed to load");

            const orderResponse = await fetch("http://localhost:8080/api/v3/furniro-orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    products,
                    totalPrice,
                }),
            });

            if (!orderResponse.ok) {
                const orderError = await orderResponse.json();
                throw new Error(orderError.error || "Failed to place order");
            }

            const orderData = await orderResponse.json();
            alert("Order placed successfully!");
            console.log("Order data:", orderData);

            const result = await stripe.redirectToCheckout({ sessionId: id });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error("Checkout or order error:", error);
            alert("Something went wrong during checkout or order creation. Please try again.");
        }
    };

    return (
        <button
            onClick={handleCheckout}
            className="w-[35%] bg-gradient-to-r from-myOrange to-myOrange text-white py-3 px-6 text-center text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            Pay Now
        </button>
    );
}
