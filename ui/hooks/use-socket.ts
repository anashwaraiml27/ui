import { useEffect, useState, useRef } from "react";

export function useWebSocket(url: string) {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<any>(null);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Avoid re-connecting on every render if url hasn't changed
        const ws = new WebSocket(url);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log("Connected to WS");
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log("Disconnected from WS");
            setIsConnected(false);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setLastMessage(data);
            } catch (e) {
                console.error("Failed to parse WS message", event.data);
            }
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return { socket: socketRef.current, isConnected, lastMessage };
}
