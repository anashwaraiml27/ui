import { Call, SystemStats } from "./types"

export const CALLS: Call[] = [
    {
        id: "call_123456",
        phoneNumber: "+91 98765 43210",
        status: "active",
        startTime: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        campaignId: "insurance_renewal_jan",
        currentNodeId: "node_question_interest",
        lastTranscript: "Yes, I am interested in renewing, but check the price.",
        sentiment: "neutral",
        latency: { stt: 0.4, llm: 1.2, tts: 0.3 }
    },
    {
        id: "call_123457",
        phoneNumber: "+91 99887 76655",
        status: "active",
        startTime: new Date(Date.now() - 1000 * 30).toISOString(),
        campaignId: "insurance_renewal_jan",
        currentNodeId: "node_greeting",
        lastTranscript: "Hello? Who is this?",
        sentiment: "neutral",
        latency: { stt: 0.2, llm: 0.8, tts: 0.2 }
    },
    {
        id: "call_123455",
        phoneNumber: "+91 88776 65544",
        status: "completed",
        startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        duration: 342,
        campaignId: "insurance_renewal_jan",
        currentNodeId: "node_end_success",
        lastTranscript: "Thank you for the update. Bye.",
        sentiment: "positive",
    }
]

export const STATS: SystemStats = {
    activeCalls: 2,
    callsToday: 145,
    failedCalls: 3,
    avgDuration: 245,
    avgLatency: {
        stt: 0.35,
        llm: 0.95,
        total: 1.6
    },
    errorRate: 1.2
}
