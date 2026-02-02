import { X, Mic, MicOff, PhoneOff, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Call } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CallDetailPanelProps {
    call: Call | null
    onClose: () => void
}

export function CallDetailPanel({ call, onClose }: CallDetailPanelProps) {
    if (!call) return null

    return (
        <div className="fixed inset-y-0 right-0 w-[400px] border-l border-slate-800 bg-slate-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
                <div>
                    <h3 className="font-semibold text-white">Live Monitor</h3>
                    <p className="text-xs text-slate-400">ID: {call.id}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Status Header */}
                <div className="flex items-center justify-between rounded-lg bg-slate-900 p-4 border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-800 p-2 rounded-full">
                            <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white">{call.phoneNumber}</h4>
                            <span className="text-xs text-slate-500">{call.campaignId}</span>
                        </div>
                    </div>
                    <Badge variant="success" className="animate-pulse">Live</Badge>
                </div>

                {/* Transcript */}
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Live Transcript
                    </h4>
                    <div className="space-y-4 rounded-lg bg-slate-900/50 p-4 border border-slate-800/50 h-[300px] overflow-y-auto">
                        {/* Fake history for demo */}
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] text-slate-400">AI</div>
                            <div className="bg-slate-800/50 rounded-lg rounded-tl-none p-3 text-sm text-slate-300">
                                Hello, am I speaking with Mr. Sharma?
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-6 h-6 rounded-full bg-emerald-900/50 flex-shrink-0 flex items-center justify-center text-[10px] text-emerald-400">U</div>
                            <div className="bg-emerald-900/20 rounded-lg rounded-tr-none p-3 text-sm text-emerald-100 border border-emerald-500/10">
                                Yes, speaking. Who is this?
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] text-slate-400">AI</div>
                            <div className="bg-slate-800/50 rounded-lg rounded-tl-none p-3 text-sm text-slate-300">
                                I am calling from Swift Insurance regarding your policy renewal. It is expiring next week.
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-6 h-6 rounded-full bg-emerald-900/50 flex-shrink-0 flex items-center justify-center text-[10px] text-emerald-400">U</div>
                            <div className="bg-emerald-900/20 rounded-lg rounded-tr-none p-3 text-sm text-emerald-100 border border-emerald-500/10">
                                {call.lastTranscript || "Yes, I am interested..."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                        <div className="text-xs text-slate-500 mb-1">STT Conf</div>
                        <div className="font-mono text-emerald-400 font-bold">98%</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                        <div className="text-xs text-slate-500 mb-1">Latency</div>
                        <div className="font-mono text-amber-400 font-bold">1.2s</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 text-center">
                        <div className="text-xs text-slate-500 mb-1">Sentiment</div>
                        <div className="font-mono text-blue-400 font-bold">Neutral</div>
                    </div>
                </div>
            </div>

            {/* Footer Controls */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                        <MicOff className="mr-2 h-4 w-4" /> Mute AI
                    </Button>
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                        Pause
                    </Button>
                </div>
                <Button variant="destructive" className="w-full">
                    <PhoneOff className="mr-2 h-4 w-4" /> Force Hang Up
                </Button>
            </div>
        </div>
    )
}
