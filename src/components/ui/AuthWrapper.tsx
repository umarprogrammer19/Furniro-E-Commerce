"use client"

import { AuthModal } from "./AuthModal"
import type React from "react"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AuthModal />
        </>
    )
}

