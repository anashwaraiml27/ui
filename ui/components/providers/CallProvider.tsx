"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useWebSocket } from "@/hooks/use-socket"
import { Call, SystemStats } from "@/lib/types"

interface CallContextType {
    calls: Call[]
    stats: SystemStats
    isConnected: boolean
}

const CallContext = createContext<CallContextType>({
    calls: [],
    stats: {
        activeCalls: 0,
        callsToday: 0,
        failedCalls: 0,
        avgDuration: 0,
        avgLatency: { stt: 0, llm: 0, total: 0 },
        errorRate: 0
    },
    isConnected: false
})

export function CallProvider({ children }: { children: React.ReactNode }) {
    const { socket, isConnected, lastMessage } = useWebSocket("ws://localhost:8000/ws/dashboard")
    const [calls, setCalls] = useState<Call[]>([])
    const [stats, setStats] = useState<SystemStats>({
        activeCalls: 0,
        callsToday: 0,
        failedCalls: 0,
        avgDuration: 0,
        avgLatency: { stt: 0, llm: 0, total: 0 },
        errorRate: 0
    })

    useEffect(() => {
        if (!lastMessage) return

        if (lastMessage.type === "session_update") {
            const data = lastMessage.data
            setCalls(prev => {
                const existing = prev.find(c => c.id === data.sessionId)
                if (existing) {
                    return prev.map(c => c.id === data.sessionId ? {
                        ...c,
                        status: data.status, // "listening" | "speaking" etc map to active? 
                        // Note: Monitor.py sends "listening"/"speaking" as status. 
                        // But our Call type expects "active" | "completed".
                        // We'll map "listening"/"speaking"/"thinking" -> "active"
                        lastTranscript: data.transcript,
                        latency: data.latency,
                        // Update other fields
                    } : c)
                } else {
                    // New call
                    return [...prev, {
                        id: data.sessionId,
                        phoneNumber: "Unknown", // Backend doesn't send phone yet?
                        status: "active",
                        startTime: new Date().toISOString(),
                        campaignId: "default",
                        currentNodeId: "start",
                        lastTranscript: data.transcript,
                        latency: data.latency
                    }]
                }
            })

            // Update stats based on calls
            setStats(prev => ({
                ...prev,
                activeCalls: calls.filter(c => c.status === 'active').length
            }))
        }
    }, [lastMessage])

    return (
        <CallContext.Provider value={{ calls, stats, isConnected }}>
            {children}
        </CallContext.Provider>
    )
}

export const useCallContext = () => useContext(CallContext)
