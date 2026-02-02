"use client"

import { FileText, Download, Filter, Search, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CALLS } from "@/lib/mock-api"

export default function LogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Call Logs & Debugging</h2>
                    <p className="text-slate-400">Search and analyze historical conversation data.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 border-slate-700 bg-slate-900">
                        <Download className="h-4 w-4" /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input placeholder="Search by Phone or Call ID..." className="pl-9 bg-slate-900 border-slate-700" />
                </div>
                <div className="w-[180px]">
                    <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[180px]">
                    <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700">
                            <SelectValue placeholder="Campaign" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Campaigns</SelectItem>
                            <SelectItem value="insurance">Insurance R.</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="secondary">
                    <Filter className="mr-2 h-4 w-4" /> apply
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-slate-800 bg-slate-950">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-slate-950">
                            <TableHead className="w-[100px]">Call ID</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Avg Latency</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {CALLS.map((call) => (
                            <TableRow key={call.id} className="cursor-pointer group">
                                <TableCell className="font-mono text-xs text-slate-500">{call.id}</TableCell>
                                <TableCell className="font-medium text-white">{call.phoneNumber}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        call.status === 'active' ? 'success' :
                                            call.status === 'completed' ? 'default' : 'destructive'
                                    }>
                                        {call.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-400">
                                    {call.duration ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s` : '-'}
                                </TableCell>
                                <TableCell className="text-slate-400">{call.campaignId}</TableCell>
                                <TableCell className="font-mono text-xs">
                                    <span className={
                                        (call.latency?.total || 0) > 1.5 ? "text-amber-500" : "text-emerald-500"
                                    }>
                                        {call.latency?.total ? `${call.latency.total}s` : 'N/A'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-slate-500 text-xs">
                                    {new Date(call.startTime).toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="h-4 w-4 text-emerald-400" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Fills for demo */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i} className="cursor-pointer group">
                                <TableCell className="font-mono text-xs text-slate-500">call_mock_{i}</TableCell>
                                <TableCell className="font-medium text-white">+91 98888 7777{i}</TableCell>
                                <TableCell>
                                    <Badge variant="default">completed</Badge>
                                </TableCell>
                                <TableCell className="text-slate-400">1m 45s</TableCell>
                                <TableCell className="text-slate-400">insurance_renewal</TableCell>
                                <TableCell className="font-mono text-xs text-emerald-500">1.1s</TableCell>
                                <TableCell className="text-slate-500 text-xs">2/1/2026, 10:3{i} AM</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <PlayCircle className="h-4 w-4 text-emerald-400" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FileText className="h-4 w-4 text-blue-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
