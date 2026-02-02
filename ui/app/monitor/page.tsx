"use client"

import { useState } from "react"
import { Activity, Radio, Filter, PhoneOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CallDetailPanel } from "@/components/monitor/CallDetailPanel"
import { LiveCallCard } from "@/components/monitor/LiveCallCard"
import { useCallContext } from "@/components/providers/CallProvider"
import { Call } from "@/lib/types"

export default function MonitorPage() {
    const { calls } = useCallContext()
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)

    // Filter only active calls for this view
    // In real app 'active' might map to multiple statuses
    const activeCalls = calls.filter(c => c.status === 'active' || c.status === 'listening' || c.status === 'speaking' || c.status === 'thinking' as any)

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-6 relative">
            <CallDetailPanel call={selectedCall} onClose={() => setSelectedCall(null)} />

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Radio className="h-6 w-6 text-red-500 animate-pulse" />
                        Live Monitor
                    </h2>
                    <p className="text-slate-400">Real-time supervision of active conversations</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <Button size="sm" variant="ghost" className="h-8 text-slate-400 data-[state=active]:bg-slate-800 data-[state=active]:text-white">Grid</Button>
                        <Button size="sm" variant="ghost" className="h-8 text-slate-400 hover:text-white">List</Button>
                    </div>
                    <Button variant="outline" className="h-10 border-slate-700 bg-slate-900 hover:bg-slate-800">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-10">
                {activeCalls.map(call => (
                    <LiveCallCard key={call.id} call={call} onSelect={setSelectedCall} />
                ))}
                {/* Placeholder if empty */}
                {activeCalls.length === 0 && (
                    <div className="flex flex-col items-center justify-center col-span-full h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                        <Activity className="h-12 w-12 opacity-20 mb-4" />
                        <p>No active calls currently online.</p>
                        <p className="text-xs mt-2">Make a call to +91 99999 99999 to test.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
