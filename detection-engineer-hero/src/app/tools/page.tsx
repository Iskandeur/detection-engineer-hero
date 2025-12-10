"use client";

import Link from "next/link";
import { ArrowLeft, Server, Lock, Activity } from "lucide-react";

export default function ToolsPage() {
    return (
        <main className="min-h-screen p-8 bg-cyber-dark text-white pt-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <Link href="/" className="inline-flex items-center text-cyber-purple hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-pink-500">
                        Security Tools
                    </h1>

                    <p className="text-xl text-gray-300">
                        Deep dive into the technologies that power modern detection and defense.
                    </p>
                </div>

                {/* Prevention Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-purple">
                        <Lock className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Prevention</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Firewall */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Firewalls</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-cyber-green mb-2">Strengths</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Centralized control of network traffic.</li>
                                        <li>Filters based on IP, port, protocol.</li>
                                        <li>Network segmentation reduces attack surface.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-500 mb-2">Limits</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Cannot detect malicious activity inside allowed traffic.</li>
                                        <li>Blind to internal traffic (unless segmented).</li>
                                        <li>Misconfigurations cause false positives.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* AV / EPP */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Antivirus & EPP</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-cyber-green mb-2">Strengths</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Protects endpoints from known malware.</li>
                                        <li>Heuristic analysis for variants.</li>
                                        <li>Centralized management.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-500 mb-2">Limits</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Limited against APTs and fileless malware.</li>
                                        <li>Cannot prevent lateral movement alone.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detection Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-purple">
                        <Activity className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Detection</h2>
                    </div>

                    <div className="space-y-6">
                        {/* EDR */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">EDR (Endpoint Detection & Response)</h3>
                            <p className="text-gray-300 mb-4">Advanced threat detection focusing on behavioral analysis rather than signatures.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-bold text-cyber-green mb-2">Capabilities</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Continuous endpoint monitoring (processes, registry).</li>
                                        <li>Detects LOLBins and lateral movement.</li>
                                        <li>Automated containment (isolate host).</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-500 mb-2">Weaknesses</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                        <li>Requires agent deployment (gaps if missing).</li>
                                        <li>Can be bypassed by advanced attackers.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* NDR */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">NDR (Network Detection & Response)</h3>
                            <p className="text-gray-300 mb-4">Monitors east-west traffic and detects anomalies in network flows.</p>
                            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                <li>Detects lateral movement and C2 beaconing.</li>
                                <li>Complements EDR where agents can't go (IoT, printers).</li>
                                <li><strong>Blind spot:</strong> Encrypted traffic (without TLS inspection).</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Management Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-purple">
                        <Server className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Management & Orchestration</h2>
                    </div>

                    <div className="space-y-6">
                        {/* SIEM */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">SIEM</h3>
                            <p className="text-gray-300 mb-4">Centralized log management, correlation, and alerting.</p>
                            <div className="p-4 bg-white/5 rounded-lg border-l-4 border-yellow-500">
                                <span className="font-bold text-yellow-500 block mb-1">Critical Insight</span>
                                <p className="text-sm text-gray-400">SIEM does not replace endpoint or network monitoring; it only correlates the data already collected.</p>
                            </div>
                        </div>

                        {/* SOAR */}
                        <div className="bg-cyber-darker border border-cyber-purple/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">SOAR</h3>
                            <p className="text-gray-300 mb-4">Security Orchestration, Automation, and Response.</p>
                            <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                                <li>Automates repetitive tasks (enrichment, blocking).</li>
                                <li>Reduces Mean Time To Respond (MTTR).</li>
                                <li><strong>Warning:</strong> Requires high-quality detection upstream. No good input = No good output.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
