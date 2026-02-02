"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Save, Play, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FlowNode } from "@/components/flow-editor/FlowNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const INITIAL_NODES = [
    { id: "1", type: "greeting", label: "Welcome Message", x: 100, y: 50 },
    { id: "2", type: "consent", label: "Recording Consent", x: 100, y: 250 },
    { id: "3", type: "question", label: "Check Interest", x: 100, y: 450 },
    { id: "4", type: "end", label: "Goodbye", x: 450, y: 450 },
]

export default function FlowEditorPage() {
    const [nodes, setNodes] = useState(INITIAL_NODES)
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

    const selectedNode = nodes.find(n => n.id === selectedNodeId)

    return (
        <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold text-white">Insurance Renewal Campaign</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="success">Active</Badge>
                            <span className="text-xs text-slate-500">Last saved 2m ago</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Play className="h-4 w-4" /> Test Flow
                    </Button>
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Save className="h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden border border-slate-800 rounded-lg bg-slate-950/50 relative">
                {/* Toolbar */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-900 p-2 shadow-xl">
                    <Button variant="ghost" size="icon" title="Add Node">
                        <Plus className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Settings">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 relative overflow-auto bg-[url('/grid-pattern.svg')] bg-fixed" onClick={() => setSelectedNodeId(null)}>
                    {/* Simple SVG for connections (Static for demo) */}
                    <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
                        <line x1={228} y1={150} x2={228} y2={250} stroke="#475569" strokeWidth="2" />
                        <line x1={228} y1={350} x2={228} y2={450} stroke="#475569" strokeWidth="2" />
                        {/* Branching from Q3 */}
                        <path d="M 228 550 L 228 580" stroke="#475569" strokeWidth="2" fill="none" />
                        <path d="M 330 500 L 450 500" stroke="#475569" strokeWidth="2" fill="none" />
                    </svg>

                    {nodes.map(node => (
                        <FlowNode
                            key={node.id}
                            {...node}
                            type={node.type as any}
                            selected={selectedNodeId === node.id}
                            onClick={(e: Event) => {
                                e.stopPropagation()
                                setSelectedNodeId(node.id)
                            }}
                        />
                    ))}
                </div>

                {/* Node Properties Sidebar */}
                {selectedNode && (
                    <div className="w-80 border-l border-slate-800 bg-slate-900 p-4 overflow-y-auto">
                        <div className="mb-6">
                            <h3 className="font-semibold text-white">Node Properties</h3>
                            <p className="text-xs text-slate-400">ID: {selectedNode.id}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Label</Label>
                                <Input defaultValue={selectedNode.label} className="bg-slate-950" />
                            </div>

                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select defaultValue="en-IN">
                                    <SelectTrigger className="bg-slate-950">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en-IN">English (India)</SelectItem>
                                        <SelectItem value="hi-IN">Hindi</SelectItem>
                                        <SelectItem value="mr-IN">Marathi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Content (Script)</Label>
                                <textarea
                                    className="w-full h-32 rounded-md border border-slate-700 bg-slate-950 p-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder:text-slate-500"
                                    placeholder="Enter the text the AI should speak..."
                                />
                            </div>

                            {selectedNode.type === 'question' && (
                                <div className="space-y-2 pt-4 border-t border-slate-800">
                                    <h4 className="text-sm font-medium text-white mb-2">Branches</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="w-16 justify-center">Yes</Badge>
                                            <div className="h-px bg-slate-700 flex-1" />
                                            <span className="text-xs text-slate-500">Next Node &gt;</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="w-16 justify-center">No</Badge>
                                            <div className="h-px bg-slate-700 flex-1" />
                                            <span className="text-xs text-slate-500">End &gt;</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
