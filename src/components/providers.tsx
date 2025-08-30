"use client"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { MemeProvider } from "@/app/contexts/meme-context"
import React from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <MemeProvider>
                {children}
            </MemeProvider>
        </QueryClientProvider>
    )
}

export default Providers