import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("accessToken")
        if (!accessToken) {
            const response = NextResponse.next()
            response.headers.set("X-Need-Login", "true")
            return response
        }
        return NextResponse.next()
    } catch (error) {
        console.log("Error during token verification:", error)
        const response = NextResponse.next()
        response.headers.set("X-Need-Login", "true")
        return response
    }
}

export const config = {
    matcher: ["/checkout", "/profile"],
}

