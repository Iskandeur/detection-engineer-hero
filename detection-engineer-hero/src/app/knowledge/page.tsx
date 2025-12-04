"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Database, Lock, Search, AlertTriangle, CheckCircle, Terminal, Cpu, Layers, Globe, Mail, FileCode, Activity, Server, Zap, Eye, Fingerprint } from "lucide-react";
import { playWhipSound } from "@/utils/sound";

export default function KnowledgeBase() {
    return (
        <div className="min-h-screen bg-cyber-dark text-cyber-green p-8 font-mono relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_2px,#00ff00_2px)] bg-[length:100%_3px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <Link
                    href="/"
                    onClick={playWhipSound}
                    className="inline-flex items-center text-cyber-purple hover:text-cyber-green transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au QG
                </Link>

                <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-purple animate-pulse glitch-text" data-text="BASE DE CONNAISSANCES">
                    BASE DE CONNAISSANCES
                </h1>
                <p className="text-cyber-gray mb-12 text-xl">Archives classifiées : Outils, Internes et Méthodologies du SOC.</p>

                <div className="space-y-20">

                    {/* SECTION 1: CORE SECURITY TOOLS */}
                    <section>
                        <h2 className="text-3xl font-bold mb-8 flex items-center border-b-2 border-cyber-purple pb-4 text-cyber-purple">
                            <Shield className="w-8 h-8 mr-4" />
                            1. OUTILS DE SÉCURITÉ CŒUR (CORE)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ToolCard
                                title="Firewall (Pare-feu)"
                                icon={<Lock className="w-6 h-6" />}
                                strengths={["Contrôle centralisé du trafic (IP/Port/Protocole).", "Segmentation réseau (réduction surface d'attaque).", "Bloque l'accès externe non autorisé."]}
                                weaknesses={["Aveugle au trafic autorisé (ex: HTTP malveillant).", "Gestion complexe des règles.", "Inefficace contre les menaces internes."]}
                                limits="Ne voit pas le contenu chiffré ni le comportement des endpoints."
                                misconception="Croire qu'il arrête toutes les attaques ou remplace l'EDR."
                            />
                            <ToolCard
                                title="Antivirus / EPP"
                                icon={<Shield className="w-6 h-6" />}
                                strengths={["Bloque les malwares connus (signatures).", "Analyse heuristique de base.", "Gestion centralisée."]}
                                weaknesses={["Inefficace contre les APT et attaques sans fichier.", "Facilement contourné par les attaquants.", "Peut impacter les performances."]}
                                limits="Ne prévient pas les mouvements latéraux. Dépend des mises à jour."
                                misconception="Suffisant pour arrêter les ransomwares modernes."
                            />
                            <ToolCard
                                title="IDS / IPS"
                                icon={<Activity className="w-6 h-6" />}
                                strengths={["Détecte les scans et exploits réseaux connus.", "IPS peut bloquer activement.", "Visibilité sur les zones exposées (DMZ)."]}
                                weaknesses={["Basé sur les signatures (rate les inconnus).", "Aveugle au trafic chiffré.", "Faux positifs fréquents."]}
                                limits="Ne voit pas le trafic interne (workstation-to-workstation)."
                                misconception="Le voir comme une source de visibilité totale."
                            />
                            <ToolCard
                                title="EDR (Endpoint Detection & Response)"
                                icon={<Terminal className="w-6 h-6" />}
                                strengths={["Visibilité totale sur l'endpoint (processus, fichiers).", "Détection comportementale (sans fichier).", "Réponse automatisée (isolement)."]}
                                weaknesses={["Nécessite un agent.", "Génère beaucoup d'alertes (fatigue).", "Peut être contourné par des experts."]}
                                limits="Aveugle aux attaques purement réseau."
                                misconception="Remplace l'antivirus ou garantit 100% de sécurité."
                            />
                            <ToolCard
                                title="NDR (Network Detection & Response)"
                                icon={<Layers className="w-6 h-6" />}
                                strengths={["Visibilité réseau globale (Est-Ouest).", "Détection des mouvements latéraux et C2.", "Couvre les appareils non gérés (IoT)."]}
                                weaknesses={["Aveugle au trafic chiffré (sans déchiffrement).", "Détection souvent post-intrusion.", "Peu de blocage actif."]}
                                limits="Ne voit pas ce qui se passe DANS l'endpoint."
                                misconception="Remplace l'IDS ou l'EDR."
                            />
                            <ToolCard
                                title="SIEM"
                                icon={<Database className="w-6 h-6" />}
                                strengths={["Centralisation des logs.", "Corrélation multi-sources.", "Support investigation et conformité."]}
                                weaknesses={["Pas de temps réel (latence).", "Complexe à maintenir.", "Dépend de la qualité des logs."]}
                                limits="Ne bloque rien. Ne crée pas de données, il les collecte."
                                misconception="Remplace les outils de détection ou 'trouve tout' seul."
                            />
                        </div>
                    </section>

                    {/* SECTION 2: ADVANCED TOOLS & ORCHESTRATION */}
                    <section>
                        <h2 className="text-3xl font-bold mb-8 flex items-center border-b-2 border-blue-500 pb-4 text-blue-500">
                            <Zap className="w-8 h-8 mr-4" />
                            2. OUTILS AVANCÉS & ORCHESTRATION
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <ToolCard
                                title="TIP (Threat Intelligence Platform)"
                                icon={<Globe className="w-6 h-6" />}
                                strengths={["Centralise les flux de menaces (Feeds).", "Enrichit les alertes (IOCs).", "Facilite le partage d'infos."]}
                                weaknesses={["Dépend de la qualité des feeds.", "Risque d'IOCs obsolètes.", "Ne détecte pas les attaques inconnues."]}
                                limits="L'intelligence sans contexte est du bruit."
                                misconception="Remplace la détection comportementale."
                            />
                            <ToolCard
                                title="WAF (Web App Firewall)"
                                icon={<Globe className="w-6 h-6" />}
                                strengths={["Protège les applis web (OWASP Top 10).", "Virtual Patching.", "Filtre HTTP/HTTPS."]}
                                weaknesses={["Inefficace contre les failles logiques.", "Contournable par obfuscation.", "Ne protège pas l'interne."]}
                                limits="Ne remplace pas le code sécurisé."
                                misconception="Une solution magique pour ne pas fixer le code."
                            />
                            <ToolCard
                                title="DLP (Data Loss Prevention)"
                                icon={<AlertTriangle className="w-6 h-6" />}
                                strengths={["Protège les données sensibles.", "Bloque l'exfiltration (USB, Web).", "Audit de conformité."]}
                                weaknesses={["Faux positifs bloquants.", "Inefficace contre le chiffrement/stéganographie.", "Lourd à gérer."]}
                                limits="Ne protège pas contre la destruction de données."
                                misconception="Remplace la sensibilisation des utilisateurs."
                            />
                            <ToolCard
                                title="XDR (Extended Detection & Response)"
                                icon={<Layers className="w-6 h-6" />}
                                strengths={["Unifie EDR, NDR, SIEM.", "Corrélation native.", "Simplifie les opérations SOC."]}
                                weaknesses={["Souvent une suite de produits mal intégrés.", "Vendor lock-in.", "Promesse marketing vs réalité."]}
                                limits="N'est pas magique si les composants individuels sont faibles."
                                misconception="Une solution unique qui remplace tout le reste."
                            />
                            <ToolCard
                                title="UEBA (User Behavior Analytics)"
                                icon={<Fingerprint className="w-6 h-6" />}
                                strengths={["Détecte les menaces internes.", "Repère les comptes compromis.", "Basé sur les anomalies."]}
                                weaknesses={["Faux positifs (comportement inhabituel mais légitime).", "Temps d'apprentissage long.", "Cher."]}
                                limits="Inefficace sans une bonne baseline."
                                misconception="Remplace les règles de détection déterministes."
                            />
                            <ToolCard
                                title="SOAR (Orchestration & Auto)"
                                icon={<Zap className="w-6 h-6" />}
                                strengths={["Automatise les tâches répétitives.", "Enrichissement automatique.", "Réponse rapide (blocage IP)."]}
                                weaknesses={["Complexe à intégrer.", "Risque de blocage abusif (Over-automation).", "Maintenance des playbooks."]}
                                limits="Garbage In, Garbage Out (dépend de la détection)."
                                misconception="Améliore la qualité de la détection (non, juste la vitesse)."
                            />
                            <ToolCard
                                title="Vuln Scanning"
                                icon={<Search className="w-6 h-6" />}
                                strengths={["Identifie les CVE connues.", "Priorisation des patchs.", "Vue surface d'attaque."]}
                                weaknesses={["Image à un instant T.", "Faux positifs.", "Ne voit pas les 0-days."]}
                                limits="Ne remplace pas le Pentest."
                                misconception="Suffisant pour dire 'on est sécurisé'."
                            />
                        </div>
                    </section>

                    {/* SECTION 3: DETECTION INTERNALS */}
                    <section>
                        <h2 className="text-3xl font-bold mb-8 flex items-center border-b-2 border-green-500 pb-4 text-green-500">
                            <Cpu className="w-8 h-8 mr-4" />
                            3. MÉCANISMES INTERNES (INTERNALS)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InternalCard
                                title="Hashing & Fuzzy Hashing"
                                description="Empreintes numériques pour identifier les fichiers."
                                details={[
                                    "MD5/SHA256 : Identification exacte (facile à changer par l'attaquant).",
                                    "Imphash : Basé sur les imports PE (détecte les variantes).",
                                    "SSDEEP/TLSH : Hachage flou pour la similarité (détecte le code modifié)."
                                ]}
                            />
                            <InternalCard
                                title="Signatures & Heuristics"
                                description="Recherche de motifs et analyse statique."
                                details={[
                                    "Regex : Chaînes simples.",
                                    "Yara : Le standard pour la chasse (Fichiers, Mémoire, Processus).",
                                    "Heuristique : Analyse de la structure et de l'entropie (fichiers packés/chiffrés)."
                                ]}
                            />
                            <InternalCard
                                title="File Monitoring (Linux/Windows)"
                                description="Comment le système voit les fichiers."
                                details={[
                                    "Linux inotify : Non-bloquant, user-space.",
                                    "Linux fanotify : Bloquant, utilisé par les AV.",
                                    "Windows Minifilter : Driver noyau, bloquant, standard pour les EDR."
                                ]}
                            />
                            <InternalCard
                                title="Linux Kernel Interfaces"
                                description="Sources de télémétrie Linux."
                                details={[
                                    "ProcFS/SysFS : Infos processus et système.",
                                    "Netlink : Événements réseau.",
                                    "eBPF : Le futur. Exécution de code sandboxé dans le noyau pour une visibilité totale et performante."
                                ]}
                            />
                            <InternalCard
                                title="Windows Event Monitoring"
                                description="Sources de télémétrie Windows."
                                details={[
                                    "ETW (Event Tracing for Windows) : Le système nerveux de Windows. Haute performance.",
                                    "ETW-TI : Threat Intel feed pour détecter les injections (Mem, Process).",
                                    "WMI : Interface de gestion (souvent abusée par les attaquants)."
                                ]}
                            />
                            <InternalCard
                                title="AMSI (Antimalware Scan Interface)"
                                description="Protection contre les scripts."
                                details={[
                                    "Permet aux langages (PS, VBS, .NET) d'envoyer leur contenu à l'AV.",
                                    "Détecte les scripts obfusqués APRÈS décodage en mémoire.",
                                    "Contournable (Patching de la DLL amsi.dll en mémoire)."
                                ]}
                            />
                            <InternalCard
                                title="Logging Techniques"
                                description="Collecte de preuves."
                                details={[
                                    "Linux : /var/log (texte), Auditd (structuré, noyau).",
                                    "Windows : Event Logs (.evtx), Sysmon (Indispensable pour une bonne détection)."
                                ]}
                            />
                            <InternalCard
                                title="Sigma Rules"
                                description="Standardisation de la détection."
                                details={[
                                    "Format générique pour les règles SIEM.",
                                    "Indépendant de la plateforme (Splunk, ELK, QRadar).",
                                    "Permet le partage communautaire."
                                ]}
                            />
                        </div>
                    </section>

                    {/* SECTION 4: PROTOCOLS & FORMATS */}
                    <section>
                        <h2 className="text-3xl font-bold mb-8 flex items-center border-b-2 border-yellow-500 pb-4 text-yellow-500">
                            <FileCode className="w-8 h-8 mr-4" />
                            4. PROTOCOLES & FORMATS
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InternalCard
                                title="Threat Intel Formats"
                                description="Structuration de la connaissance."
                                details={[
                                    "MISP : Modèle Événements/Attributs. Optimisé pour le partage et la corrélation.",
                                    "STIX 2.x : Format JSON standard. Basé sur des objets et relations (Graph). Préféré pour l'analyse contextuelle."
                                ]}
                            />
                            <InternalCard
                                title="Email Authentication"
                                description="Protection contre le Spoofing."
                                details={[
                                    "SPF : Liste des IP autorisées (DNS). Fragile au forwarding.",
                                    "DKIM : Signature cryptographique des mails. Garantit l'intégrité.",
                                    "DMARC : Politique (Reject/Quarantine) et alignement SPF/DKIM."
                                ]}
                            />
                        </div>
                    </section>


                    {/* Exam Survival Guide Section */}
                    <section>
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-8 flex items-center gap-3">
                            <Shield className="w-8 h-8 text-red-500" />
                            EXAM SURVIVAL GUIDE
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-cyber-dark/80 border border-red-500/30 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-red-400 mb-4">Oral Defense Checklist</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span><strong>Justify Tool Choice:</strong> Why EDR and not Firewall? (Visibility vs Blocking)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span><strong>Explain Logic:</strong> Why did you use `Process Access` and not `Image Load`?</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span><strong>Know Your FPs:</strong> Admit the weaknesses of your rule. "This rule triggers on Admin scripts, but I accept the risk because..."</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span><strong>Bypass Awareness:</strong> "I know renaming the binary bypasses this, but I have another rule for that."</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-cyber-dark/80 border border-orange-500/30 p-6 rounded-xl">
                                <h3 className="text-xl font-bold text-orange-400 mb-4">Common Pitfalls</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                                        <span><strong>The "Perfect Rule" Myth:</strong> Don't try to catch everything. A specific rule is better than a noisy generic one.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                                        <span><strong>Ignoring Context:</strong> Blocking PowerShell globally is not a solution.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                                        <span><strong>Over-reliance on Hashes:</strong> Hashes change. Behaviors stay.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

function ToolCard({ title, icon, strengths, weaknesses, limits, misconception }: {
    title: string,
    icon: React.ReactNode,
    strengths: string[],
    weaknesses: string[],
    limits: string,
    misconception: string
}) {
    return (
        <div className="bg-cyber-dark/80 border border-cyber-green/20 p-6 rounded-xl hover:border-cyber-green/60 transition-all hover:shadow-[0_0_15px_rgba(0,255,0,0.1)] group flex flex-col h-full">
            <div className="flex items-center mb-4 text-cyber-green group-hover:text-cyber-purple transition-colors">
                <div className="p-3 bg-cyber-green/10 rounded-lg group-hover:bg-cyber-purple/10 transition-colors">
                    {icon}
                </div>
                <h3 className="text-xl font-bold ml-3">{title}</h3>
            </div>

            <div className="space-y-4 text-sm flex-grow">
                <div>
                    <strong className="text-cyber-green block mb-1 uppercase text-xs tracking-wider">Forces</strong>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>

                <div>
                    <strong className="text-red-400 block mb-1 uppercase text-xs tracking-wider">Faiblesses</strong>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                        {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 space-y-2 text-xs">
                <p><strong className="text-yellow-500 uppercase tracking-wider">Limites :</strong> <span className="text-gray-500">{limits}</span></p>
                <p><strong className="text-orange-500 uppercase tracking-wider">Idée Reçue :</strong> <span className="text-gray-500 italic">"{misconception}"</span></p>
            </div>
        </div>
    );
}

function InternalCard({ title, description, details }: { title: string, description: string, details: string[] }) {
    return (
        <div className="bg-cyber-dark/80 border border-cyber-purple/20 p-6 rounded-xl hover:border-cyber-purple/60 transition-all hover:shadow-[0_0_15px_rgba(188,19,254,0.1)] h-full">
            <h3 className="text-lg font-bold text-cyber-purple mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 italic">{description}</p>
            <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                {details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
        </div>
    );
}
