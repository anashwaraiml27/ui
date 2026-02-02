import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm", className)}>
        {children}
    </div>
)

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}>
        {children}
    </h3>
)

export const Badge = ({ children, variant = "default", className }: { children: React.ReactNode; variant?: "default" | "success" | "destructive" | "warning"; className?: string }) => {
    const variants = {
        default: "bg-slate-800 text-slate-300",
        success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20 border",
        destructive: "bg-red-500/15 text-red-400 border-red-500/20 border",
        warning: "bg-amber-500/15 text-amber-400 border-amber-500/20 border",
    }
    return (
        <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", variants[variant], className)}>
            {children}
        </span>
    )
}
