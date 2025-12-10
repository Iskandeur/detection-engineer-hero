"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, XCircle, ArrowRight, Terminal, Network, Key, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { playWhipSound } from "@/utils/sound";

type GameState = "selection" | "intro" | "tool_selection" | "draft_critique" | "refinement" | "success";

interface Scenario {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    correctTool: string;
    draftRule: string;
    critiqueOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    refinementOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
}

const SCENARIOS: Scenario[] = [
    {
        id: "powershell",
        title: "Malicious PowerShell",
        description: "An attacker executes an obfuscated PowerShell script to download and execute malware.",
        icon: <Terminal className="w-10 h-10 text-cyber-purple" />,
        correctTool: "EDR",
        draftRule: "powershell.exe AND (Invoke-WebRequest OR -EncodedCommand)",
        critiqueOptions: [
            { id: "fp", text: "It generates too many False Positives.", isCorrect: false, feedback: "True, but incomplete. Consideration must be given to bypasses too." },
            { id: "bypass", text: "It is easy to bypass.", isCorrect: false, feedback: "Yes, a simple alias 'iwr' bypasses the rule. But that's not all." },
            { id: "missing", text: "It misses scenarios (e.g., IEX).", isCorrect: false, feedback: "Correct, but there are also False Positives." },
            { id: "all", text: "All of the above.", isCorrect: true, feedback: "Exactly! The rule is naive: it misses aliases, LOLBins, and in-memory execution." }
        ],
        refinementOptions: [
            { id: "admin", text: "Standard admin scripts.", isCorrect: false, feedback: "Possible, but look for a more structural case." },
            { id: "hypervisor", text: "Hypervisors / Monitoring Agents.", isCorrect: true, feedback: "Correct! Hypervisors (VMware, Hyper-V) often use encoded PowerShell for WMI." },
            { id: "browser", text: "Browser updates.", isCorrect: false, feedback: "Rarely via encoded PowerShell." }
        ]
    },
    {
        id: "dns_exfil",
        title: "DNS Exfiltration",
        description: "An attacker exfiltrates sensitive data by encoding it in DNS subdomains (Tunneling).",
        icon: <Network className="w-10 h-10 text-blue-500" />,
        correctTool: "NDR",
        draftRule: "DNS Query Length > 50 characters",
        critiqueOptions: [
            { id: "fp", text: "False Positives (CDNs, Long Domains).", isCorrect: true, feedback: "Exact! Many legitimate services (AWS, CDNs) have very long names." },
            { id: "bypass", text: "The attacker can use short queries.", isCorrect: false, feedback: "True, but the main problem with this rule is noise (FP)." },
            { id: "protocol", text: "DNS is not visible to the Firewall.", isCorrect: false, feedback: "The Firewall sees DNS, but doesn't analyze it as deeply as NDR." }
        ],
        refinementOptions: [
            { id: "entropy", text: "Check entropy and frequency per root domain.", isCorrect: true, feedback: "Perfect. Entropy detects random encoding and frequency detects volume." },
            { id: "block", text: "Block all outbound DNS traffic.", isCorrect: false, feedback: "Impossible, that would break Internet access." },
            { id: "user", text: "Alert if user is not admin.", isCorrect: false, feedback: "Not relevant for technical exfiltration." }
        ]
    },
    {
        id: "lsass_dump",
        title: "Credential Dumping (LSASS)",
        description: "An attacker attempts to extract NTLM hashes from lsass.exe process memory (e.g., Mimikatz).",
        icon: <Key className="w-10 h-10 text-yellow-500" />,
        correctTool: "EDR",
        draftRule: "Process Access to lsass.exe",
        critiqueOptions: [
            { id: "fp", text: "Too generic (Antivirus, Updates).", isCorrect: true, feedback: "Yes! Many legitimate processes (AV, Google Update) touch LSASS." },
            { id: "bypass", text: "Attacker can rename lsass.exe.", isCorrect: false, feedback: "No, lsass is a protected system process, it cannot be easily renamed." },
            { id: "missing", text: "Does not detect file dump.", isCorrect: false, feedback: "It does, process access is the first step." }
        ],
        refinementOptions: [
            { id: "mask", text: "Check Access Masks (e.g., 0x1010) and Call Stack.", isCorrect: true, feedback: "Excellent. Only accesses with specific rights (Read Memory) are suspicious." },
            { id: "parent", text: "Check if parent is cmd.exe.", isCorrect: false, feedback: "Too easy to bypass (parent spoofing)." },
            { id: "time", text: "Alert only at night.", isCorrect: false, feedback: "Bad practice. Attackers operate at all hours." }
        ]
    },
    {
        id: "webshell",
        title: "Web Shell Upload",
        description: "An attacker exploits an upload vulnerability to drop a malicious PHP script (Web Shell) on the web server.",
        icon: <Globe className="w-10 h-10 text-orange-500" />,
        correctTool: "WAF",
        draftRule: "http.request.uri ENDSWITH '.php'",
        critiqueOptions: [
            { id: "fp", text: "Blocks all legitimate PHP pages.", isCorrect: true, feedback: "Catastrophic. This rule would break the entire website." },
            { id: "bypass", text: "Attacker can use .phtml.", isCorrect: false, feedback: "True, but the main problem is legitimate blocking (FP)." },
            { id: "missing", text: "Does not detect FTP upload.", isCorrect: false, feedback: "WAF only sees HTTP, that is a known limitation." }
        ],
        refinementOptions: [
            { id: "method", text: "Restrict to POST methods on /upload.", isCorrect: true, feedback: "Much better. Targeting the upload action specifically." },
            { id: "content", text: "Scan content for 'system()'.", isCorrect: false, feedback: "Difficult for a WAF (encryption, performance)." },
            { id: "ip", text: "Block foreign IPs.", isCorrect: false, feedback: "Ineffective and causes business issues." }
        ]
    },
    {
        id: "ransomware",
        title: "Ransomware Execution",
        description: "A process begins massively encrypting user files and drops a ransom note.",
        icon: <Lock className="w-10 h-10 text-red-600" />,
        correctTool: "EDR",
        draftRule: "File Write 'READ_ME.txt'",
        critiqueOptions: [
            { id: "fp", text: "A user can create this file.", isCorrect: true, feedback: "Yes, a text file is not malicious in itself." },
            { id: "bypass", text: "Attacker can change the name.", isCorrect: false, feedback: "True, but that's not the only issue." },
            { id: "missing", text: "Does not detect encryption.", isCorrect: false, feedback: "Correct, but the FP is the first problem to solve." }
        ],
        refinementOptions: [
            { id: "behavior", text: "Detect >100 writes/sec + entropy change.", isCorrect: true, feedback: "Excellent. This is a typical behavioral signature of ransomware." },
            { id: "extension", text: "Block .encrypted extension.", isCorrect: false, feedback: "Too easy for the attacker to change." },
            { id: "backup", text: "Check deletion of Shadow Copies.", isCorrect: false, feedback: "Good indicator, but secondary to encryption." }
        ]
    }
];

export default function ScenarioPage() {
    const [gameState, setGameState] = useState<GameState>("selection");
    const [currentScenario, setCurrentScenario] = useState<Scenario>(SCENARIOS[0]);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const selectScenario = (scenario: Scenario) => {
        playWhipSound();
        setCurrentScenario(scenario);
        setGameState("intro");
    };

    const handleToolSelection = (tool: string) => {
        playWhipSound();
        if (tool === currentScenario.correctTool) {
            setFeedback({ type: "success", message: "Excellent choice! This is the most suitable tool for this visibility." });
            setTimeout(() => {
                setFeedback(null);
                setGameState("draft_critique");
            }, 2000);
        } else {
            setFeedback({ type: "error", message: "Not ideal. This tool lacks specific visibility for this attack." });
        }
    };

    const handleCritiqueSelection = (optionId: string) => {
        playWhipSound();
        const option = currentScenario.critiqueOptions.find(o => o.id === optionId);
        if (option?.isCorrect) {
            setFeedback({ type: "success", message: option.feedback });
            setTimeout(() => {
                setFeedback(null);
                setGameState("refinement");
            }, 3000);
        } else {
            setFeedback({ type: "error", message: option?.feedback || "Incorrect." });
        }
    };

    const handleRefinementSelection = (optionId: string) => {
        playWhipSound();
        const option = currentScenario.refinementOptions.find(o => o.id === optionId);
        if (option?.isCorrect) {
            setFeedback({ type: "success", message: option.feedback });
            setTimeout(() => {
                setFeedback(null);
                setGameState("success");
            }, 3000);
        } else {
            setFeedback({ type: "error", message: option?.feedback || "Incorrect." });
        }
    };

    return (
        <div className="min-h-screen bg-cyber-dark text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_2px,#00ff00_2px)] bg-[length:100%_3px] scanline"></div>
            </div>

            <div className="w-full max-w-5xl relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" onClick={playWhipSound} className="text-cyber-green hover:underline flex items-center gap-2">
                        ← Back
                    </Link>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-green glitch-text" data-text="SCENARIO SIMULATOR">
                        SCENARIO SIMULATOR
                    </h1>
                    <div className="w-8" />
                </div>

                <div className="bg-cyber-gray/50 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm min-h-[500px] relative overflow-hidden">

                    {/* Progress Bar (Hidden in selection) */}
                    {gameState !== "selection" && (
                        <div className="absolute top-0 left-0 h-1 bg-cyber-purple transition-all duration-500"
                            style={{ width: gameState === "intro" ? "0%" : gameState === "tool_selection" ? "25%" : gameState === "draft_critique" ? "50%" : gameState === "refinement" ? "75%" : "100%" }} />
                    )}

                    <AnimatePresence mode="wait">
                        {gameState === "selection" && (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8"
                            >
                                <h2 className="text-3xl font-bold text-center text-white mb-8">Choose Your Mission</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {SCENARIOS.map((scenario) => (
                                        <button
                                            key={scenario.id}
                                            onClick={() => selectScenario(scenario)}
                                            className="bg-cyber-dark/80 border border-gray-600 p-6 rounded-xl hover:border-cyber-green hover:bg-cyber-green/10 transition-all group text-left flex flex-col h-full"
                                        >
                                            <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                                {scenario.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-cyber-green mb-2 group-hover:text-white transition-colors">{scenario.title}</h3>
                                            <p className="text-gray-400 text-sm">{scenario.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {gameState === "intro" && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 text-center"
                            >
                                <div className="w-24 h-24 bg-cyber-purple/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    {currentScenario.icon}
                                </div>
                                <h2 className="text-3xl font-bold text-white">{currentScenario.title}</h2>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                    "{currentScenario.description}"
                                </p>
                                <p className="text-gray-400">
                                    Your mission: Build a robust detection for this threat.
                                </p>
                                <button
                                    onClick={() => { playWhipSound(); setGameState("tool_selection"); }}
                                    className="mt-8 px-8 py-3 bg-cyber-purple hover:bg-cyber-purple/80 text-white rounded-lg font-bold transition-all flex items-center gap-2 mx-auto"
                                >
                                    Start Mission <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}

                        {gameState === "tool_selection" && (
                            <motion.div
                                key="tool_selection"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Step 1: Tool Selection</h2>
                                <p className="text-lg text-gray-300">
                                    Which security tool is most appropriate to detect this attack?
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    {["Firewall", "EDR", "NDR", "SIEM"].map((tool) => (
                                        <button
                                            key={tool}
                                            onClick={() => handleToolSelection(tool)}
                                            className="p-4 border border-gray-600 rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 transition-all text-left font-semibold"
                                        >
                                            {tool}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {gameState === "draft_critique" && (
                            <motion.div
                                key="draft_critique"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Step 2: Rule Critique</h2>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-400 border border-gray-700">
                                    {currentScenario.draftRule}
                                </div>
                                <p className="text-lg text-gray-300">
                                    This "draft" rule has been proposed. What is its major problem?
                                </p>
                                <div className="space-y-3 mt-6">
                                    {currentScenario.critiqueOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleCritiqueSelection(option.id)}
                                            className="w-full p-4 border border-gray-600 rounded-lg hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all text-left"
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {gameState === "refinement" && (
                            <motion.div
                                key="refinement"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Step 3: Refinement</h2>
                                <p className="text-lg text-gray-300">
                                    How can we refine this rule to reduce False Positives or improve detection?
                                </p>
                                <div className="space-y-3 mt-6">
                                    {currentScenario.refinementOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleRefinementSelection(option.id)}
                                            className="w-full p-4 border border-gray-600 rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 transition-all text-left"
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {gameState === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 py-12"
                            >
                                <CheckCircle className="w-24 h-24 text-cyber-green mx-auto" />
                                <h2 className="text-4xl font-bold text-white">Mission Accomplished!</h2>
                                <p className="text-xl text-gray-300">
                                    You have mastered detection for scenario: <br />
                                    <span className="text-cyber-purple font-bold">{currentScenario.title}</span>
                                </p>
                                <div className="flex justify-center gap-4 mt-8">
                                    <button onClick={() => { playWhipSound(); setGameState("selection"); }} className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-white/10 transition-colors">
                                        Choose Another Mission
                                    </button>
                                    <button onClick={() => { playWhipSound(); setGameState("intro"); }} className="px-6 py-3 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-colors">
                                        Replay
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Feedback Overlay */}
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className={`absolute bottom-8 left-8 right-8 p-4 rounded-lg flex items-center gap-3 shadow-lg backdrop-blur-md border ${feedback.type === 'success' ? 'bg-green-500/20 border-green-500 text-green-200' : 'bg-red-500/20 border-red-500 text-red-200'}`}
                            >
                                {feedback.type === 'success' ? <CheckCircle className="w-6 h-6 flex-shrink-0" /> : <AlertTriangle className="w-6 h-6 flex-shrink-0" />}
                                <span className="font-medium">{feedback.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
