"use client"

import { Shield, Clock, Phone, AlertOctagon, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Inline Switch Component for speed (usually in components/ui/switch.tsx)
function SimpleSwitch({ checked, onCheckedChange }: { checked?: boolean, onCheckedChange?: (c: boolean) => void }) {
    return (
        <button
            type="button"
            className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-emerald-600' : 'bg-slate-700'}`}
            onClick={() => onCheckedChange && onCheckedChange(!checked)}
        >
            <span className={`block w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`} />
        </button>
    )
}

export default function CompliancePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
                    <Shield className="h-6 w-6 text-emerald-500" />
                    Compliance & Guardrails
                </h2>
                <p className="text-slate-400">Operation boundaries, calling hours, and consent tracking.</p>
            </div>

            <div className="grid gap-6">
                {/* Operational Hours */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-400" /> Operating Hours
                        </CardTitle>
                        <CardDescription>Restricts AI calling to specific time windows to comply with TRAI regulations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Time</Label>
                                <Input type="time" defaultValue="09:00" className="bg-slate-950" />
                            </div>
                            <div className="space-y-2">
                                <Label>End Time</Label>
                                <Input type="time" defaultValue="20:00" className="bg-slate-950" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">Holiday Mode</Label>
                                <p className="text-xs text-slate-500">Block all outbound calls on public holidays</p>
                            </div>
                            <SimpleSwitch />
                        </div>
                    </CardContent>
                </Card>

                {/* Global DND */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-amber-400" /> DND Enforcement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">NDNC Registry Check</Label>
                                <p className="text-xs text-slate-500">Scrub numbers against National Do Not Call registry before dialling</p>
                            </div>
                            <SimpleSwitch checked={true} />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">Internal DND List</Label>
                                <p className="text-xs text-slate-500">Respect user opt-outs ("Don't call me again")</p>
                            </div>
                            <SimpleSwitch checked={true} />
                        </div>
                    </CardContent>
                </Card>

                {/* Safety Limits */}
                <Card className="border-red-900/20 bg-red-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-200">
                            <AlertOctagon className="h-5 w-5 text-red-500" /> Safety Limits
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Max Calls Per Day (Per User)</Label>
                                <Input type="number" defaultValue="3" className="bg-slate-950 border-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Retry Attempts</Label>
                                <Input type="number" defaultValue="2" className="bg-slate-950 border-slate-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end pb-10">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <Save className="h-4 w-4" /> Update Rules
                </Button>
            </div>
        </div>
    )
}
