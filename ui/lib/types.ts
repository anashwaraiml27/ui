export type CallStatus = 'active' | 'completed' | 'failed' | 'ivr_hangup' | 'user_hangup';

export interface Call {
    id: string;
    phoneNumber: string;
    status: CallStatus;
    startTime: string;
    duration?: number;
    campaignId: string;
    llmTokenSpeed: number;
    currentNodeId: string;
    lastTranscript?: string;
    sentiment?: 'positive' | 'neutral' | 'negative' | 'angry';
    latency?: {
        stt: number;
        llm: number;
        tts: number;
    };
    
}

export interface Node {
    id: string;
    label: string;
    type: 'greeting' | 'question' | 'consent' | 'end' | 'handoff';
    content: string;
    nextNodes?: Record<string, string>; // "yes" -> "node_2"
    config?: Record<string, any>;
}

export interface SystemStats {
    activeCalls: number;
    callsToday: number;
    failedCalls: number;
    avgDuration: number;
    avgLatency: {
        stt: number;
        llm: number;
        total: number;
    };
    errorRate: number;
    llmTokenSpeed: number;
}

export interface VoiceConfig {
    voiceId: string;
    language: string;
    speed: number;
    pitch: number;
    stability: number;
}
