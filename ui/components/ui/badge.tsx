import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-slate-800 text-slate-100 hover:bg-slate-800/80",
                secondary:
                    "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
                destructive:
                    "border-transparent bg-red-900/50 text-red-100 hover:bg-red-900/60 border-red-500/20",
                outline: "text-slate-100",
                success: "border-transparent bg-emerald-900/50 text-emerald-100 hover:bg-emerald-900/60 border-emerald-500/20",
                warning: "border-transparent bg-amber-900/50 text-amber-100 hover:bg-amber-900/60 border-amber-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
