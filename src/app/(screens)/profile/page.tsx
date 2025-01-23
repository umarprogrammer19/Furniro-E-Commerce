"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/api/user"

interface User {
    id: string
    fullname: string
    email: string
    orders: any[]
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await getUser();
                setUser(userData)
            } catch (err) {
                if (err instanceof Error && err.message === "No access token found") {
                    router.push("/login")
                } else {
                    setError("Failed to load user profile")
                }
            } finally {
                setIsLoading(false)
            }
        }

        loadUser()
    }, [router])

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center text-red-500">{error}</div>
            </div>
        )
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
                                    {user?.orders.length} Orders
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

