import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Payment Successful!</CardTitle>
                    <CardDescription className="text-center">Thank you for your purchase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold">Order #12345</p>
                        <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <p className="font-semibold">Order Summary:</p>
                        <ul className="list-disc list-inside text-sm">
                            <li>Product A - $XX.XX</li>
                            <li>Product B - $XX.XX</li>
                        </ul>
                        <p className="font-semibold mt-2">Total: $XX.XX</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/">
                        <Button>Return to Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

