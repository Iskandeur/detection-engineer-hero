"use client";

import Link from "next/link";
import { ArrowLeft, Book, Shield, Network, Activity } from "lucide-react";

export default function FoundationsPage() {
    return (
        <main className="min-h-screen p-8 bg-cyber-dark text-white pt-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="space-y-4">
                    <Link href="/" className="inline-flex items-center text-cyber-green hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-blue-500">
                        SOC Foundations
                    </h1>

                    <p className="text-xl text-gray-300">
                        Understanding the core principles, history, and structure of a Security Operations Center.
                    </p>
                </div>

                {/* History Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-green">
                        <Book className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">History & Evolution</h2>
                    </div>
                    <div className="bg-cyber-darker border border-cyber-green/20 rounded-xl p-6 space-y-4">
                        <p className="text-gray-300">
                            Cybersecurity grew rapidly and often reactively. Key events during 2010-2017 shaped both perception and practice.
                            We are now entering a phase where quality, prioritization, and technical mastery become essential.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="bg-black/40 p-4 rounded-lg border-l-2 border-cyber-green">
                                <span className="text-cyber-green font-bold block mb-1">Stuxnet (2010)</span>
                                <span className="text-sm text-gray-400">Cyber was mostly invisible to the public, used by governments as a precise tool.</span>
                            </div>
                            <div className="bg-black/40 p-4 rounded-lg border-l-2 border-cyber-green">
                                <span className="text-cyber-green font-bold block mb-1">Snowden Leaks (2013)</span>
                                <span className="text-sm text-gray-400">Revealed that cyber capabilities exist in governments with global reach.</span>
                            </div>
                            <div className="bg-black/40 p-4 rounded-lg border-l-2 border-cyber-green md:col-span-2">
                                <span className="text-cyber-green font-bold block mb-1">WannaCry (2017)</span>
                                <span className="text-sm text-gray-400">Attacks hit enterprises worldwide; threat became professional and financially motivated.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SOC Models Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-green">
                        <Network className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">SOC Organizational Models</h2>
                    </div>
                    <div className="bg-cyber-darker border border-cyber-green/20 rounded-xl p-6 space-y-6">
                        <p className="text-gray-300">
                            A SOC can be organized in several ways depending on the organization's size, resources, and security strategy.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="text-xl font-bold text-cyber-green mb-2">Centralized SOC</h3>
                                <p className="text-sm text-gray-400">Single location monitoring all systems. Strong control and coordination.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="text-xl font-bold text-cyber-green mb-2">Distributed SOC</h3>
                                <p className="text-sm text-gray-400">Multiple locations, often across regions. Better local coverage.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="text-xl font-bold text-cyber-green mb-2">Virtual SOC</h3>
                                <p className="text-sm text-gray-400">Remote teams leveraging cloud tools. Flexible and cost-efficient.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <h3 className="text-xl font-bold text-cyber-green mb-2">Outsourced (MSSP)</h3>
                                <p className="text-sm text-gray-400">Managed by third-party providers. Complements internal capabilities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Roles Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-green">
                        <Shield className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Roles & Responsibilities</h2>
                    </div>
                    <div className="bg-cyber-darker border border-cyber-green/20 rounded-xl p-6">
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-bold mt-1 mr-3 min-w-[60px] text-center">Tier 1</span>
                                <div>
                                    <strong className="block text-white">Analyst</strong>
                                    <span className="text-gray-400 text-sm">Monitors alerts, triages incidents. First line of defense.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold mt-1 mr-3 min-w-[60px] text-center">Tier 2</span>
                                <div>
                                    <strong className="block text-white">Analyst</strong>
                                    <span className="text-gray-400 text-sm">Investigates and escalates complex incidents. Deeper analysis.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold mt-1 mr-3 min-w-[60px] text-center">Tier 3</span>
                                <div>
                                    <strong className="block text-white">Threat Hunter</strong>
                                    <span className="text-gray-400 text-sm">Performs proactive threat hunting and deep forensic analysis.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="inline-block px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-bold mt-1 mr-3 min-w-[60px] text-center">DFIR</span>
                                <div>
                                    <strong className="block text-white">Incident Responder</strong>
                                    <span className="text-gray-400 text-sm">Leads containment, eradication, and recovery during major breaches.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Processes Section */}
                <section className="space-y-6">
                    <div className="flex items-center space-x-3 text-cyber-green">
                        <Activity className="w-8 h-8" />
                        <h2 className="text-3xl font-bold">Core Processes</h2>
                    </div>
                    <div className="bg-cyber-darker border border-cyber-green/20 rounded-xl p-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border-l-4 border-blue-500">
                                <div className="font-mono text-blue-400 font-bold">01</div>
                                <div>
                                    <h4 className="font-bold text-white">Monitoring & Alerting</h4>
                                    <p className="text-sm text-gray-400">Continuous surveillance of networks, endpoints, and cloud.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border-l-4 border-yellow-500">
                                <div className="font-mono text-yellow-400 font-bold">02</div>
                                <div>
                                    <h4 className="font-bold text-white">Triage & Investigation</h4>
                                    <p className="text-sm text-gray-400">Validate and analyze alerts to determine true positives.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border-l-4 border-red-500">
                                <div className="font-mono text-red-400 font-bold">03</div>
                                <div>
                                    <h4 className="font-bold text-white">Containment & Eradication</h4>
                                    <p className="text-sm text-gray-400">Stop threats and remove them from the environment.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border-l-4 border-green-500">
                                <div className="font-mono text-green-400 font-bold">04</div>
                                <div>
                                    <h4 className="font-bold text-white">Recovery & Lessons Learned</h4>
                                    <p className="text-sm text-gray-400">Restore systems and improve defenses based on the incident.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
