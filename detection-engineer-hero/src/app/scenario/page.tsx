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
        title: "PowerShell Malveillant",
        description: "Un attaquant exécute un script PowerShell obfusqué pour télécharger et exécuter un malware.",
        icon: <Terminal className="w-10 h-10 text-cyber-purple" />,
        correctTool: "EDR",
        draftRule: "powershell.exe AND (Invoke-WebRequest OR -EncodedCommand)",
        critiqueOptions: [
            { id: "fp", text: "Elle génère trop de Faux Positifs.", isCorrect: false, feedback: "Vrai, mais incomplet. Pensez aussi aux contournements." },
            { id: "bypass", text: "Elle est facile à contourner (Bypass).", isCorrect: false, feedback: "Oui, un simple alias 'iwr' contourne la règle. Mais ce n'est pas tout." },
            { id: "missing", text: "Elle manque des scénarios (ex: IEX).", isCorrect: false, feedback: "Correct, mais il y a aussi des Faux Positifs." },
            { id: "all", text: "Toutes les réponses ci-dessus.", isCorrect: true, feedback: "Exactement ! La règle est naïve : elle rate les alias, les LoLBins et les exécutions en mémoire." }
        ],
        refinementOptions: [
            { id: "admin", text: "Scripts d'administration lambda.", isCorrect: false, feedback: "Possible, mais cherchez un cas plus structurel." },
            { id: "hypervisor", text: "Hyperviseurs / Agents de monitoring.", isCorrect: true, feedback: "Correct ! Les hyperviseurs (VMware, Hyper-V) utilisent souvent PowerShell encodé pour WMI." },
            { id: "browser", text: "Mises à jour du navigateur.", isCorrect: false, feedback: "Rarement via PowerShell encodé." }
        ]
    },
    {
        id: "dns_exfil",
        title: "Exfiltration DNS",
        description: "Un attaquant exfiltre des données sensibles en les encodant dans des sous-domaines de requêtes DNS (Tunneling).",
        icon: <Network className="w-10 h-10 text-blue-500" />,
        correctTool: "NDR",
        draftRule: "DNS Query Length > 50 characters",
        critiqueOptions: [
            { id: "fp", text: "Faux Positifs (CDN, Domaines longs).", isCorrect: true, feedback: "Exact ! De nombreux services légitimes (AWS, CDNs) ont des noms très longs." },
            { id: "bypass", text: "L'attaquant peut utiliser des requêtes courtes.", isCorrect: false, feedback: "C'est vrai, mais le problème principal de cette règle est le bruit (FP)." },
            { id: "protocol", text: "Le DNS n'est pas visible par le Firewall.", isCorrect: false, feedback: "Le Firewall voit le DNS, mais ne l'analyse pas aussi bien que le NDR." }
        ],
        refinementOptions: [
            { id: "entropy", text: "Vérifier l'entropie et la fréquence par domaine racine.", isCorrect: true, feedback: "Parfait. L'entropie détecte l'encodage aléatoire et la fréquence détecte le volume." },
            { id: "block", text: "Bloquer tout le trafic DNS sortant.", isCorrect: false, feedback: "Impossible, cela casserait l'accès Internet." },
            { id: "user", text: "Alerter si l'utilisateur n'est pas admin.", isCorrect: false, feedback: "Non pertinent pour une exfiltration technique." }
        ]
    },
    {
        id: "lsass_dump",
        title: "Credential Dumping (LSASS)",
        description: "Un attaquant tente d'extraire les hashs NTLM de la mémoire du processus lsass.exe (ex: Mimikatz).",
        icon: <Key className="w-10 h-10 text-yellow-500" />,
        correctTool: "EDR",
        draftRule: "Process Access to lsass.exe",
        critiqueOptions: [
            { id: "fp", text: "Trop générique (Antivirus, Updates).", isCorrect: true, feedback: "Oui ! De nombreux processus légitimes (AV, Google Update) touchent à LSASS." },
            { id: "bypass", text: "L'attaquant peut renommer lsass.exe.", isCorrect: false, feedback: "Non, lsass est un processus système protégé, on ne peut pas le renommer facilement." },
            { id: "missing", text: "Ne détecte pas le dump fichier.", isCorrect: false, feedback: "Si, l'accès au processus est la première étape." }
        ],
        refinementOptions: [
            { id: "mask", text: "Vérifier les Access Masks (ex: 0x1010) et la Call Stack.", isCorrect: true, feedback: "Excellent. Seuls les accès avec des droits spécifiques (Read Memory) sont suspects." },
            { id: "parent", text: "Vérifier si le parent est cmd.exe.", isCorrect: false, feedback: "Trop facile à contourner (parent spoofing)." },
            { id: "time", text: "Alerter seulement la nuit.", isCorrect: false, feedback: "Mauvaise pratique. Les attaquants opèrent à toute heure." }
        ]
    },
    {
        id: "webshell",
        title: "Web Shell Upload",
        description: "Un attaquant exploite une faille d'upload pour déposer un script PHP malveillant (Web Shell) sur le serveur web.",
        icon: <Globe className="w-10 h-10 text-orange-500" />,
        correctTool: "WAF",
        draftRule: "http.request.uri ENDSWITH '.php'",
        critiqueOptions: [
            { id: "fp", text: "Bloque toutes les pages PHP légitimes.", isCorrect: true, feedback: "C'est catastrophique. Cette règle casserait tout le site web." },
            { id: "bypass", text: "L'attaquant peut utiliser .phtml.", isCorrect: false, feedback: "Vrai, mais le problème principal est le blocage légitime (FP)." },
            { id: "missing", text: "Ne détecte pas l'upload via FTP.", isCorrect: false, feedback: "Le WAF ne voit que le HTTP, c'est une limitation connue." }
        ],
        refinementOptions: [
            { id: "method", text: "Restreindre aux méthodes POST sur /upload.", isCorrect: true, feedback: "Bien mieux. On cible l'action d'upload spécifiquement." },
            { id: "content", text: "Scanner le contenu pour 'system()'.", isCorrect: false, feedback: "Difficile pour un WAF (chiffrement, performance)." },
            { id: "ip", text: "Bloquer les IP étrangères.", isCorrect: false, feedback: "Inefficace et source de problèmes métier." }
        ]
    },
    {
        id: "ransomware",
        title: "Ransomware Execution",
        description: "Un processus commence à chiffrer massivement des fichiers utilisateur et dépose une note de rançon.",
        icon: <Lock className="w-10 h-10 text-red-600" />,
        correctTool: "EDR",
        draftRule: "File Write 'READ_ME.txt'",
        critiqueOptions: [
            { id: "fp", text: "Un utilisateur peut créer ce fichier.", isCorrect: true, feedback: "Oui, un fichier texte n'est pas malveillant en soi." },
            { id: "bypass", text: "L'attaquant peut changer le nom.", isCorrect: false, feedback: "Vrai, mais ce n'est pas le seul souci." },
            { id: "missing", text: "Ne détecte pas le chiffrement.", isCorrect: false, feedback: "Exact, mais le FP est le premier problème à régler." }
        ],
        refinementOptions: [
            { id: "behavior", text: "Détecter >100 écritures/sec + modification d'entropie.", isCorrect: true, feedback: "Excellent. C'est une signature comportementale typique du ransomware." },
            { id: "extension", text: "Bloquer l'extension .encrypted.", isCorrect: false, feedback: "Trop facile à changer pour l'attaquant." },
            { id: "backup", text: "Vérifier la suppression des Shadow Copies.", isCorrect: false, feedback: "Bon indicateur, mais secondaire par rapport au chiffrement." }
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
            setFeedback({ type: "success", message: "Excellent choix ! C'est l'outil le plus adapté pour cette visibilité." });
            setTimeout(() => {
                setFeedback(null);
                setGameState("draft_critique");
            }, 2000);
        } else {
            setFeedback({ type: "error", message: "Pas idéal. Cet outil manque de visibilité spécifique pour cette attaque." });
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
                        ← Retour
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
                                <h2 className="text-3xl font-bold text-center text-white mb-8">Choisissez votre Mission</h2>
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
                                    Votre mission : Construire une détection robuste pour cette menace.
                                </p>
                                <button
                                    onClick={() => { playWhipSound(); setGameState("tool_selection"); }}
                                    className="mt-8 px-8 py-3 bg-cyber-purple hover:bg-cyber-purple/80 text-white rounded-lg font-bold transition-all flex items-center gap-2 mx-auto"
                                >
                                    Commencer la Mission <ArrowRight className="w-5 h-5" />
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
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Étape 1 : Sélection de l'Outil</h2>
                                <p className="text-lg text-gray-300">
                                    Quel outil de sécurité est le plus approprié pour détecter cette attaque ?
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
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Étape 2 : Critique de la Règle</h2>
                                <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-400 border border-gray-700">
                                    {currentScenario.draftRule}
                                </div>
                                <p className="text-lg text-gray-300">
                                    Cette règle "brouillon" a été proposée. Quel est son problème majeur ?
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
                                <h2 className="text-2xl font-bold text-cyber-green mb-4">Étape 3 : Affinage</h2>
                                <p className="text-lg text-gray-300">
                                    Comment affiner cette règle pour réduire les Faux Positifs ou améliorer la détection ?
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
                                <h2 className="text-4xl font-bold text-white">Mission Accomplie !</h2>
                                <p className="text-xl text-gray-300">
                                    Vous avez maîtrisé la détection pour le scénario : <br />
                                    <span className="text-cyber-purple font-bold">{currentScenario.title}</span>
                                </p>
                                <div className="flex justify-center gap-4 mt-8">
                                    <button onClick={() => { playWhipSound(); setGameState("selection"); }} className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-white/10 transition-colors">
                                        Choisir une autre Mission
                                    </button>
                                    <button onClick={() => { playWhipSound(); setGameState("intro"); }} className="px-6 py-3 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-colors">
                                        Rejouer
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
