"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api/baseUrl";
import Cookies from "js-cookie";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [orderStatus, setOrderStatus] = useState<"pending" | "success" | "error">("pending");
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const success = searchParams.get("success");

        if (success === "true") {
            createOrderAfterPayment();
        } else {
            // If no success param, redirect to home
            router.push("/");
        }
    }, [searchParams]);

    const createOrderAfterPayment = async () => {
        try {
            const token = localStorage.getItem("accessToken") || Cookies.get("accessToken");

            if (!token) {
                setOrderStatus("error");
                return;
            }

            // Get cart items from localStorage
            const cartItems = JSON.parse(localStorage.getItem("CART_ITEMS") || "[]");

            if (cartItems.length === 0) {
                setOrderStatus("error");
                return;
            }

            const totalPrice = cartItems.reduce(
                (sum: number, item: any) => sum + Number(item.price) * Number(item.quantity),
                0
            );

            const products = cartItems.map((item: any) => ({
                name: item.title,
                price: item.price,
                quantity: item.quantity,
            }));

            const response = await fetch(`${BASE_URL}/api/v3/create-payment-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    products,
                    totalPrice,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();
            setOrderId(data.order._id);
            setOrderStatus("success");

            // Clear cart after successful order
            localStorage.removeItem("CART_ITEMS");
        } catch (error) {
            console.error("Order creation error:", error);
            setOrderStatus("error");
        }
    };

    if (orderStatus === "pending") {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white">
                    <CardContent className="flex flex-col items-center py-12">
                        <Loader2 className="h-16 w-16 text-green-500 animate-spin mb-4" />
                        <p className="text-gray-600 text-sm">Processing your order...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (orderStatus === "error") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 px-4">
                <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white">
                    <CardContent className="flex flex-col items-center py-12">
                        <p className="text-red-500 text-sm mb-4">
                            Payment successful but order creation failed. Please contact support.
                        </p>
                        <Link href="/">
                            <Button className="px-6 py-2 text-white transition-all">
                                Return to Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white">
                <CardHeader className="flex flex-col items-center">
                    <motion.div
                        className="mb-4"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                        Payment Successful!
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600 text-sm">
                    <p>Your transaction has been completed successfully.</p>
                    {orderId && (
                        <p className="mt-2 text-xs text-gray-500">Order ID: {orderId}</p>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Link href="/profile">
                        <Button variant="outline" className="px-6 py-2 transition-all">
                            View Orders
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button className="px-6 py-2 text-white transition-all">
                            Return to Home
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 px-4">
            <Suspense
                fallback={
                    <Card className="w-full max-w-sm shadow-lg border border-gray-200 bg-white">
                        <CardContent className="flex flex-col items-center py-12">
                            <Loader2 className="h-16 w-16 text-green-500 animate-spin mb-4" />
                            <p className="text-gray-600 text-sm">Loading...</p>
                        </CardContent>
                    </Card>
                }
            >
                <PaymentSuccessContent />
            </Suspense>
        </div>
    );
}

