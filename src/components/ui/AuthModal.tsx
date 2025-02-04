"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getCookie, deleteCookie } from "cookies-next"

export function AuthModal() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const needsLogin = getCookie("needsLogin")
        if (needsLogin === "true") {
            setIsOpen(true)
            deleteCookie("needsLogin")
        }
    }, [])

    const handleLogin = () => {
        setIsOpen(false)
        router.push("/login")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                    <DialogDescription>You need to be logged in to access this page.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button onClick={handleLogin}>Go to Login</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

