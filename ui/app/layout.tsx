import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { CallProvider } from "@/components/providers/CallProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoiceChat Admin",
  description: "Admin panel for AI Voicebot operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950`}
      >
        <CallProvider>
          <Sidebar />
          <div className="pl-64 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </CallProvider>
      </body>
    </html>
  );
}
