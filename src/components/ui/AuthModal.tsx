"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function useNeedsLogin() {
    const [needsLogin, setNeedsLogin] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const checkNeedsLogin = async () => {
            const res = await fetch(pathname, { method: "HEAD" })
            setNeedsLogin(res.headers.get("X-Need-Login") === "true")
        }

        checkNeedsLogin()
    }, [pathname])

    return needsLogin
}

export function AuthModal() {
    const needsLogin = useNeedsLogin()
    const router = useRouter()

    const handleLogin = () => {
        router.push("/login")
    }

    return (
        <Dialog open={needsLogin} onOpenChange={() => { }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                    <DialogDescription>You need to be logged in to access this page.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button onClick={handleLogin} className="bg-red-600 text-white hover:bg-red-500">Go to Login</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

