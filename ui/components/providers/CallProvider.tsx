"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useWebSocket } from "@/hooks/use-socket"
import { Call, SystemStats } from "@/lib/types"

/**
 * 🔴 CHANGE THIS ONLY IF VM IP CHANGES
 */
const ACTIVE_CALLS_WS =
  "ws://35.200.217.153:9000/ws/active-calls"

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
    errorRate: 0,
    llmTokenSpeed: 0,
  },
  isConnected: false
})

export function CallProvider({ children }: { children: React.ReactNode }) {
  /**
   * EXISTING SESSION / DASHBOARD SOCKET
   * (do NOT remove, used for sessions list later)
   */
  const { isConnected, lastMessage } = useWebSocket(
    "ws://localhost:8000/ws/dashboard"
  )

  const [calls, setCalls] = useState<Call[]>([])
  const [stats, setStats] = useState<SystemStats>({
    activeCalls: 0,
    callsToday: 0,
    failedCalls: 0,
    avgDuration: 0,
    avgLatency: { stt: 0, llm: 0, total: 0 },
    errorRate: 0,
    llmTokenSpeed:0

  })

  /**
   * 🔵 SESSION UPDATES (unchanged)
   */
  useEffect(() => {
    if (!lastMessage) return

    if (lastMessage.type === "session_update") {
      const data = lastMessage.data

      setCalls(prev => {
        const existing = prev.find(c => c.id === data.sessionId)

        if (existing) {
          return prev.map(c =>
            c.id === data.sessionId
              ? {
                  ...c,
                  status: "active",
                  lastTranscript: data.transcript,
                  latency: data.latency
                }
              : c
          )
        }

        return [
          ...prev,
          {
            id: data.sessionId,
            phoneNumber: "Unknown",
            status: "active",
            startTime: new Date().toISOString(),
            campaignId: "default",
            llmTokenSpeed:0,
            currentNodeId: "start",
            lastTranscript: data.transcript,
            latency: data.latency,
            
          }
        ]
      })
    }
  }, [lastMessage])

  /**
   * 🟢 ACTIVE CALLS (BACKEND SOURCE OF TRUTH)
   */
  useEffect(() => {
    const ws = new WebSocket(ACTIVE_CALLS_WS)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      setStats(prev => ({
      ...prev,
      activeCalls: data.active_calls ?? prev.activeCalls,
      callsToday: data.calls_today ?? prev.callsToday,
      avgLatency: {
    ...prev.avgLatency,
    total: data.avg_latency ?? prev.avgLatency.total,},
     llmTokenSpeed: data.llm_token_speed ?? prev.llmTokenSpeed,
}))
    }

    // ws.onerror = (err) => {
    //   console.error("Active Calls WS error", err)
    // }

    return () => ws.close()
  }, [])

  return (
    <CallContext.Provider value={{ calls, stats, isConnected }}>
      {children}
    </CallContext.Provider>
  )
}

export const useCallContext = () => useContext(CallContext)
