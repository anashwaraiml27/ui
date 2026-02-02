import { Handle, Position } from "reactflow" // Only if we use ReactFlow, but I'll make a custom one for now to avoid dependencies if not installed.
// Wait, I don't have reactflow installed. I will build a Custom Node Card.

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, PlayCircle, MessageCircle, AlertTriangle, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlowNodeProps {
    id: string
    label: string
    type: "greeting" | "question" | "consent" | "end"
    x: number
    y: number
    selected?: boolean
    onClick?: () => void
}

export function FlowNode({ id, label, type, x, y, selected, onClick }: FlowNodeProps) {
    return (
        <div
            className={cn(
                "absolute w-64 cursor-pointer transition-transform hover:scale-105 active:scale-100",
                selected && "z-10"
            )}
            style={{ left: x, top: y }}
            onClick={onClick}
        >
            {/* Input Handle */}
            {type !== 'greeting' && (
                <div className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-slate-600 bg-slate-950" />
            )}

            <Card className={cn(
                "border-2 overflow-hidden bg-slate-900/90",
                selected ? "border-emerald-500 shadow-lg shadow-emerald-500/20" : "border-slate-700"
            )}>
                <div className={cn(
                    "flex items-center justify-between px-3 py-2 border-b",
                    selected ? "border-emerald-500/50 bg-emerald-500/10" : "border-slate-800 bg-slate-900"
                )}>
                    <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-slate-500 cursor-grab" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">{type}</span>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-slate-400" />
                </div>
                <div className="p-3">
                    <p className="font-semibold text-slate-200 mb-2">{label}</p>
                    <p className="text-xs text-slate-400 line-clamp-2">
                        Draft content for this node...
                    </p>
                </div>
                <div className="bg-slate-950/50 p-2 flex gap-1 justify-end">
                    <Badge variant="default" className="text-[10px] h-5">en-IN</Badge>
                    {type === 'question' && <Badge variant="warning" className="text-[10px] h-5">Retry: 2</Badge>}
                </div>
            </Card>

            {/* Output Handle */}
            {type !== 'end' && (
                <div className="absolute -bottom-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-emerald-500 bg-slate-950" />
            )}
        </div>
    )
}
