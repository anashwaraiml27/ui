import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    color: "emerald" | "amber" | "blue" | "slate" | "red"
    description?: string
}

export function StatCard({ title, value, icon: Icon, color, description }: StatCardProps) {
    const colorClasses = {
        emerald: "text-emerald-500",
        amber: "text-amber-500",
        blue: "text-blue-500",
        slate: "text-slate-500",
        red: "text-red-500",
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col gap-2">
                    <span className="text-slate-400 text-sm font-medium">{title}</span>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-white">{value}</span>
                        <Icon className={`h-6 w-6 ${colorClasses[color]}`} />
                    </div>
                    {description && (
                        <p className="text-xs text-slate-500 mt-1">{description}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
