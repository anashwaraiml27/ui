"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Phone, GitBranch, Settings, ShieldAlert, FileText, Menu, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Live Monitor", href: "/monitor", icon: Phone },
    { label: "Flow Editor", href: "/flows", icon: GitBranch },
    { label: "Voice Config", href: "/config", icon: Settings },
    { label: "Compliance", href: "/compliance", icon: ShieldAlert },
    { label: "Call Logs", href: "/logs", icon: FileText },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950 transition-transform">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <h1 className="text-xl font-bold text-white">
                    Voice<span className="text-emerald-500">Bot</span> Admin
                </h1>
            </div>

            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-white",
                                    pathname === item.href
                                        ? "bg-slate-800 text-white"
                                        : "text-slate-400 hover:bg-slate-800/50"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-slate-500">
                        External Links
                    </h2>
                    <div className="space-y-1">
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800/50 hover:text-white"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Documentation
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    )
}
