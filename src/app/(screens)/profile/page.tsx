"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/api/baseUrl";

interface User {
    id: string;
    fullname: string;
    email: string;
}

interface Order {
    _id: string;
    products: { name: string; price: number; quantity: number }[];
    totalPrice: number;
    createdAt: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function loadUserData() {
            try {
                // Fetch user profile
                const userResponse = await fetch(`${BASE_URL}/api/v1/getUser`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });

                if (!userResponse.ok) throw new Error("Failed to fetch user profile");
                const userData = await userResponse.json();
                setUser(userData.user);

                // Fetch user orders
                const ordersResponse = await fetch(`${BASE_URL}/api/v3/furniro-orders`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });

                if (!ordersResponse.ok) throw new Error("Failed to fetch user orders");
                const ordersData = await ordersResponse.json();
                setOrders(ordersData.orders);
            } catch (err) {
                if (err instanceof Error && err.message === "No access token found") {
                    router.push("/login");
                } else {
                    setError("Failed to load user data");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadUserData();
    }, [router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto bg-white shadow-lg">
                <CardHeader className="bg-primary/10 pb-8 pt-6 px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="absolute left-1/2 -bottom-12 -translate-x-1/2">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                            <AvatarFallback className="bg-primary text-white text-2xl">
                                {isLoading
                                    ? "..."
                                    : user?.fullname
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
                <CardContent className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-48 mx-auto" />
                            <Skeleton className="h-6 w-64 mx-auto" />
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">{user?.fullname}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <div className="pt-4">
                                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary">
                                    {orders.length} Orders
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Orders List */}
            <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order History</h3>
                {isLoading ? (
                    <Skeleton className="h-20 w-full" />
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">No orders found</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order._id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold text-lg">Order ID: {order._id}</h4>
                                    <span className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <ul className="mt-2 space-y-2">
                                    {order.products.map((product, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between text-sm text-gray-700"
                                        >
                                            <span>{product.name}</span>
                                            <span>
                                                {product.quantity} x ${product.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-2 text-right font-bold text-gray-800">
                                    Total: ${order.totalPrice}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
