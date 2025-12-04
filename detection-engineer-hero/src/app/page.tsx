"use client";

import Link from "next/link";
import { Shield, Terminal, BookOpen } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-cyber-dark text-white relative overflow-hidden">
            <div className="z-10 text-center space-y-8">
                <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-purple glitch-text" data-text="DETECTION ENGINEER HERO">
                    DETECTION ENGINEER HERO
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Maîtrisez la méthodologie SOC, analysez les scénarios d'attaque et devenez un expert en détection.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <Link href="/drill" className="group p-6 border border-cyber-green/30 rounded-xl hover:bg-cyber-green/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-cyber-green/20 rounded-full group-hover:bg-cyber-green/30 transition-colors">
                                <Shield className="w-12 h-12 text-cyber-green" />
                            </div>
                            <h2 className="text-2xl font-bold text-cyber-green">Methodology Drill</h2>
                            <p className="text-sm text-gray-400">Maîtrisez les 9 étapes de l'ingénierie de détection.</p>
                        </div>
                    </Link>

                    <Link href="/scenario" className="group p-6 border border-cyber-purple/30 rounded-xl hover:bg-cyber-purple/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(188,19,254,0.2)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-cyber-purple/20 rounded-full group-hover:bg-cyber-purple/30 transition-colors">
                                <Terminal className="w-12 h-12 text-cyber-purple" />
                            </div>
                            <h2 className="text-2xl font-bold text-cyber-purple">Scenario Simulator</h2>
                            <p className="text-sm text-gray-400">Analysez des attaques réelles et affinez vos règles.</p>
                        </div>
                    </Link>

                    <Link href="/knowledge" className="group p-6 border border-blue-500/30 rounded-xl hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                                <BookOpen className="w-12 h-12 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-blue-500">Knowledge Base</h2>
                            <p className="text-sm text-gray-400">Explorez les outils et concepts clés du SOC.</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        </main>
    );
}
