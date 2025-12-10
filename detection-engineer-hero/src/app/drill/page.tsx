"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { playWhipSound } from "@/utils/sound";

const STEPS = [
    { id: 1, text: "Understand the Attack Scenario" },
    { id: 2, text: "Select the Detection Tool" },
    { id: 3, text: "Write the Initial Detection Rule" },
    { id: 4, text: "Identify Potential False Positives" },
    { id: 5, text: "Distinguish True Positives vs False Positives" },
    { id: 6, text: "Identify Evasion Techniques (Bypass)" },
    { id: 7, text: "Identify Missing Scenarios" },
    { id: 8, text: "Rewrite the Optimized Rule" },
    { id: 9, text: "Test and Validate the Rule" },
];

export default function DrillPage() {
    const [availableSteps, setAvailableSteps] = useState<typeof STEPS>([]);
    const [userOrder, setUserOrder] = useState<typeof STEPS>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        // Shuffle steps on mount
        setAvailableSteps([...STEPS].sort(() => Math.random() - 0.5));
    }, []);

    const handleStepClick = (step: typeof STEPS[0]) => {
        playWhipSound();
        if (isComplete) return;

        const nextIndex = userOrder.length;
        const correctStep = STEPS[nextIndex];

        if (step.id === correctStep.id) {
            // Correct
            const newOrder = [...userOrder, step];
            setUserOrder(newOrder);
            setAvailableSteps(availableSteps.filter((s) => s.id !== step.id));
            setFeedback(null);

            if (newOrder.length === STEPS.length) {
                setIsComplete(true);
            }
        } else {
            // Incorrect
            setFeedback("That's not the correct step! Try again.");
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    const resetGame = () => {
        playWhipSound();
        setAvailableSteps([...STEPS].sort(() => Math.random() - 0.5));
        setUserOrder([]);
        setIsComplete(false);
        setFeedback(null);
    };

    return (
        <div className="min-h-screen bg-cyber-dark text-white p-8 flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/" onClick={playWhipSound} className="text-cyber-green hover:underline flex items-center gap-2">
                        ← Back
                    </Link>
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-purple glitch-text" data-text="METHODOLOGY DRILL">
                        METHODOLOGY DRILL
                    </h1>
                    <button onClick={resetGame} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <RefreshCw className="w-6 h-6 text-cyber-purple" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Available Steps */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-300">Available Steps</h2>
                        <div className="grid gap-3">
                            <AnimatePresence>
                                {availableSteps.map((step) => (
                                    <motion.button
                                        key={step.id}
                                        layoutId={`step-${step.id}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => handleStepClick(step)}
                                        className="w-full p-4 bg-cyber-gray border border-gray-700 rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 transition-all text-left flex justify-between items-center group"
                                    >
                                        <span>{step.text}</span>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 text-cyber-green transition-opacity" />
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                        {availableSteps.length === 0 && isComplete && (
                            <div className="p-8 bg-cyber-green/10 border border-cyber-green rounded-xl text-center">
                                <CheckCircle className="w-16 h-16 text-cyber-green mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-cyber-green mb-2">Congratulations!</h3>
                                <p className="text-gray-300">You have mastered the methodology.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Timeline */}
                    <div className="space-y-4 relative">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-300">Your Methodology</h2>

                        {/* Timeline Line */}
                        <div className="absolute left-8 top-16 bottom-4 w-0.5 bg-gray-800 -z-10" />

                        <div className="space-y-4">
                            {STEPS.map((step, index) => {
                                const isFilled = userOrder.length > index;
                                const filledStep = userOrder[index];

                                return (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 z-0 bg-cyber-dark transition-colors ${isFilled ? 'border-cyber-green text-cyber-green shadow-[0_0_15px_rgba(0,255,65,0.3)]' : 'border-gray-700 text-gray-700'}`}>
                                            <span className="text-xl font-bold">{index + 1}</span>
                                        </div>

                                        <div className={`flex-1 p-4 rounded-lg border min-h-[60px] flex items-center transition-all ${isFilled ? 'bg-cyber-green/5 border-cyber-green/50' : 'bg-transparent border-gray-800 border-dashed'}`}>
                                            {isFilled ? (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="font-medium text-white"
                                                >
                                                    {filledStep.text}
                                                </motion.span>
                                            ) : (
                                                <span className="text-gray-600 italic text-sm">Pending...</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Feedback Toast */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-sm"
                        >
                            <XCircle className="w-5 h-5" />
                            {feedback}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
