"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/50 px-6 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <div className="relative w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search active calls, logs, or settings..."
                        className="pl-9 bg-slate-900/50 border-slate-800"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-slate-400">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                    <span className="text-xs font-bold text-emerald-400">AD</span>
                </div>
            </div>
        </header>
    )
}
