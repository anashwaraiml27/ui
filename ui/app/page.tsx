"use client"

import { useEffect, useState } from "react"
import { Activity, Brain, Clock, MessageSquare, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/dashboard/StatCard"
import { useCallContext } from "@/components/providers/CallProvider"

export default function Dashboard() {
  const { stats, calls, isConnected } = useCallContext()
  const [latencyHistory, setLatencyHistory] = useState<{ time: string, value: number }[]>([])
  const [timeStr, setTimeStr] = useState<string>("")

  // Update time only on client side to avoid hydration mismatch
  useEffect(() => {
    setTimeStr(new Date().toLocaleTimeString())
    const interval = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (stats.avgLatency.total > 0) {
      setLatencyHistory(prev => {
        const newPoint = { time: new Date().toLocaleTimeString(), value: stats.avgLatency.total }
        const newHistory = [...prev, newPoint]
        if (newHistory.length > 20) return newHistory.slice(1)
        return newHistory
      })
    }
  }, [stats.avgLatency.total])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard</h2>
          <p className="text-slate-400">Real-time overview of voice operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "success" : "destructive"} className={isConnected ? "animate-pulse" : ""}>
            {isConnected ? "● Live System" : "○ Disconnected"}
          </Badge>
          <span className="text-xs text-slate-500">Last updated: {timeStr}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Calls"
          value={stats.activeCalls}
          icon={Activity}
          color="emerald"
          description={isConnected ? "Live metrics" : "Connecting..."}
        />
        <StatCard
          title="Avg Latency"
          value={stats.avgLatency.total ? `${stats.avgLatency.total.toFixed(2)}s` : '-'}
          icon={Clock}
          color="amber"
          description="Target: < 1.5s"
        />
        <StatCard
          title="LLM Token Speed"
          value="45 t/s"
          icon={Brain}
          color="blue"
          description="Groq Llama 3"
        />
        <StatCard
          title="Calls Today"
          value={stats.callsToday}
          icon={MessageSquare}
          color="slate"
          description={`${stats.failedCalls} failed (${stats.errorRate}%)`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>System Latency (Real-time)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latencyHistory}>
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={30}
                  />
                  <YAxis
                    stroke="#475569"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 3]}
                    tickFormatter={(value) => `${value}s`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {calls.filter(c => c.status === 'active').map(call => (
                <div key={call.id} className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">{call.phoneNumber}</p>
                    <p className="text-xs text-slate-500">{call.campaignId}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={call.sentiment === 'negative' ? 'destructive' : 'default'} className="uppercase text-[10px]">
                      {call.sentiment}
                    </Badge>
                    <span className="text-xs font-mono text-emerald-500">
                      {call.latency?.total ? `${call.latency.total}s` : '-'}
                    </span>
                  </div>
                </div>
              ))}
              {calls.filter(c => c.status === 'active').length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center text-slate-500">
                  <Activity className="mb-2 h-8 w-8 opacity-20" />
                  <p className="text-sm">No active calls</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
