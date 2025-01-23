"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { setCookie } from "cookies-next";
import { loginUser } from "@/lib/api/auth"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            const { accessToken } = await loginUser(email, password)
            console.log(accessToken);
            setCookie('accessToken', accessToken, {
                path: '/',
                secure: true,
                sameSite: 'strict',
            });
            localStorage.setItem('accessToken', accessToken);
            router.push("/")
        } catch (err) {
            setError("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="mt-1"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
                        <Link href="/signup" className="text-primary hover:text-primary-hover font-medium">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

