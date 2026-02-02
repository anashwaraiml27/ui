import { Phone, User, Clock, MoreVertical, Mic, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Call } from "@/lib/types"

interface LiveCallCardProps {
    call: Call
    onSelect: (call: Call) => void
}

export function LiveCallCard({ call, onSelect }: LiveCallCardProps) {
    return (
        <Card className="hover:border-slate-600 transition-colors cursor-pointer" onClick={() => onSelect(call)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                    <Badge variant="success" className="animate-pulse">Active</Badge>
                    <span className="text-xs text-slate-500 font-mono">{call.id.slice(-6)}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white">
                            <User className="h-4 w-4 text-slate-400" />
                            <span className="font-semibold">{call.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Clock className="h-3 w-3" />
                            <span>02:14</span>{/* Mock duration */}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 uppercase font-semibold">
                            <span>Node</span>
                            <span>Sentiment</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-emerald-400">{call.currentNodeId}</span>
                            <span className={
                                call.sentiment === 'negative' ? 'text-red-400' :
                                    call.sentiment === 'positive' ? 'text-emerald-400' : 'text-slate-300'
                            }>{call.sentiment}</span>
                        </div>
                    </div>

                    <div className="rounded bg-slate-950 p-3 text-sm text-slate-300 h-20 overflow-hidden relative">
                        <p className="opacity-70 italic">"{call.lastTranscript}"</p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between border-t border-slate-800 mt-2">
                <div className="flex gap-2">
                    <Button size="sm" variant="destructive" className="h-8 text-xs">
                        Hang Up
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 text-xs">
                        Take Over
                    </Button>
                </div>
                <div className="flex items-center text-xs text-slate-500 gap-1">
                    <Mic className="h-3 w-3" />
                    <span>AI Speaking</span>
                </div>
            </CardFooter>
        </Card>
    )
}
