"use client"

import { useState } from "react"
import { Play, Save, Mic, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const LANGUAGES = [
    { code: "en-IN", name: "English (India)", voices: ["Aditi", "Raveena", "Neil"] },
    { code: "hi-IN", name: "Hindi", voices: ["Swara", "Madhur", "Kavya"] },
    { code: "mr-IN", name: "Marathi", voices: ["Aarohi", "Manohar"] },
]

export default function ConfigPage() {
    const [playing, setPlaying] = useState<string | null>(null)

    const handlePreview = (voice: string) => {
        setPlaying(voice)
        setTimeout(() => setPlaying(null), 3000) // Mock play
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Voice & Language Configuration</h2>
                <p className="text-slate-400">Manage TTS voices, speaking styles, and language detection settings.</p>
            </div>

            <div className="grid gap-6">
                {LANGUAGES.map((lang) => (
                    <Card key={lang.code}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        {lang.name}
                                        <Badge variant="secondary" className="font-mono text-xs">{lang.code}</Badge>
                                    </CardTitle>
                                    <CardDescription>Configure synthesized voice settings for this language.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label className="text-xs text-slate-500 mr-2">Default</Label>
                                    <input type="radio" name="default_lang" className="accent-emerald-500 h-4 w-4" defaultChecked={lang.code === 'en-IN'} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Voice Model</Label>
                                    <Select defaultValue={lang.voices[0]}>
                                        <SelectTrigger className="bg-slate-950">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lang.voices.map(v => (
                                                <SelectItem key={v} value={v}>{v} (Neural)</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Speaking Speed (1.0x)</Label>
                                    <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" className="w-full accent-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Pitch (Medium)</Label>
                                    <input type="range" min="-10" max="10" step="1" defaultValue="0" className="w-full accent-emerald-500" />
                                </div>
                            </div>

                            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <Label className="text-xs text-slate-500">Preview Text</Label>
                                    <p className="text-sm text-slate-300 italic">
                                        "{lang.code === 'en-IN' ? 'Hello, this is a test of the voice system.' : lang.code === 'hi-IN' ? 'नमस्ते, यह वॉयस सिस्टम का एक परीक्षण है।' : 'नमस्कार, ही व्हॉइस सिस्टमची चाचणी आहे.'}"
                                    </p>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className={playing === lang.code ? "text-emerald-400" : "text-white"}
                                        onClick={() => handlePreview(lang.code)}
                                    >
                                        {playing === lang.code ? <Volume2 className="mr-2 h-4 w-4 animate-pulse" /> : <Play className="mr-2 h-4 w-4" />}
                                        {playing === lang.code ? "Playing..." : "Preview Voice"}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end pb-10">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <Save className="h-4 w-4" /> Save Configuration
                </Button>
            </div>
        </div>
    )
}
