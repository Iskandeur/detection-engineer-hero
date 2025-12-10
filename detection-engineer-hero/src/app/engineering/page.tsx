"use client";

import Link from "next/link";
import { ArrowLeft, Code, Cpu, Target } from "lucide-react";

export default function EngineeringPage() {
    return (
        <main className="min-h-screen p-8 bg-cyber-dark text-white pt-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <Link href="/" className="inline-flex items-center text-blue-500 hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                        Detection Engineering
                    </h1>

                    <p className="text-xl text-gray-300">
                        The art and science of building high-quality, high-fidelity detection rules.
                    </p>
                </div>

                {/* Internals Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-blue-500">
                        <Cpu className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Detection Mechanisms</h2>
                    </div>

                    <div className="bg-cyber-darker border border-blue-500/20 rounded-xl p-6 space-y-8">
                        {/* Hashing */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">File-Based Detection (Hashing)</h3>
                            <p className="text-gray-400 text-sm mb-4">Foundational but easily bypassed by modifying a single bit.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 p-3 rounded">
                                    <span className="text-blue-400 font-bold block">Cryptographic</span>
                                    <span className="text-xs text-gray-500">MD5, SHA256. Exact matches only.</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded">
                                    <span className="text-blue-400 font-bold block">Imphash</span>
                                    <span className="text-xs text-gray-500">Import Hash. Detects variants with same imports.</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded">
                                    <span className="text-blue-400 font-bold block">Fuzzy Hash</span>
                                    <span className="text-xs text-gray-500">SSDEEP. Detects similar files (70% match).</span>
                                </div>
                            </div>
                        </div>

                        {/* OS Internals */}
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">OS Internals & Monitoring</h3>
                            <div className="space-y-4">
                                <div className="border-l-2 border-green-500 pl-4 py-1">
                                    <h4 className="font-bold text-white">Windows (ETW, AMSI)</h4>
                                    <p className="text-sm text-gray-400">
                                        <strong>ETW (Event Tracing for Windows):</strong> Kernel-level telemetry. The backbone of EDR.<br />
                                        <strong>AMSI:</strong> Allows apps to send content (scripts, macros) to AV for scanning before execution.
                                    </p>
                                </div>
                                <div className="border-l-2 border-orange-500 pl-4 py-1">
                                    <h4 className="font-bold text-white">Linux (eBPF, Auditd)</h4>
                                    <p className="text-sm text-gray-400">
                                        <strong>eBPF:</strong> Runs sandboxed programs in kernel. High performance, massive observability.<br />
                                        <strong>fanotify/inotify:</strong> File system monitoring hooks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Rule Engineering Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-blue-500">
                        <Code className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Rule Languages</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-cyber-darker border border-blue-500/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">YARA</h3>
                            <p className="text-sm text-gray-400 mb-4">The "grep" for malware. Scans files and memory for byte sequences and strings.</p>
                            <pre className="bg-black/50 p-3 rounded text-xs text-green-400 font-mono">
                                rule Detect_Malware &#123;{"\n"}
                                &nbsp;&nbsp;strings:{"\n"}
                                &nbsp;&nbsp;&nbsp;&nbsp;$a = "suspicious_string"{"\n"}
                                &nbsp;&nbsp;condition:{"\n"}
                                &nbsp;&nbsp;&nbsp;&nbsp;$a{"\n"}
                                &#125;
                            </pre>
                        </div>
                        <div className="bg-cyber-darker border border-blue-500/20 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Sigma</h3>
                            <p className="text-sm text-gray-400 mb-4">Generic signature format for SIEM detection rules. "Write once, deploy anywhere".</p>
                            <pre className="bg-black/50 p-3 rounded text-xs text-orange-400 font-mono">
                                detection:{"\n"}
                                &nbsp;&nbsp;selection:{"\n"}
                                &nbsp;&nbsp;&nbsp;&nbsp;EventID: 4688{"\n"}
                                &nbsp;&nbsp;&nbsp;&nbsp;CommandLine|contains: 'powershell'
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Methodology Link */}
                <section className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to put this into practice?</h3>
                    <p className="text-gray-300 mb-6">Master the 9-step Detection Engineering Methodology in our interactive drill.</p>
                    <Link href="/drill" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
                        Start Methodology Drill
                    </Link>
                </section>
            </div>
        </main>
    );
}
