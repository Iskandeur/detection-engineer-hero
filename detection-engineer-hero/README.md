# Detection Engineer Hero

Application de révision pour le cours de Master en Cybersécurité (SOC & Detection Engineering).

## Fonctionnalités

- **Methodology Drill** : Un exercice interactif pour maîtriser les 9 étapes de la méthodologie d'ingénierie de détection.
- **Scenario Simulator** : Un simulateur de scénario d'attaque (PowerShell Malveillant) pour s'entraîner à la prise de décision (Choix d'outil, Critique de règle, Faux Positifs).
- **Knowledge Base** : Une base de connaissances sur les outils SOC (EDR, NDR, SIEM, etc.).

## Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS (Thème Cyber/Dark)
- **Infrastructure** : Docker & Terraform (OVH Public Cloud)
# 🛡️ DETECTION ENGINEER HERO

> **"Think like an Attacker. Defend like a Pro."**

![License](https://img.shields.io/badge/license-MIT-green) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan) ![Status](https://img.shields.io/badge/Status-Ready_to_Deploy-success)

**Detection Engineer Hero** is an interactive, gamified training platform designed to forge the next generation of SOC Analysts and Detection Engineers. Built with a **Cyberpunk/Hacker aesthetic**, it transforms dry theory into high-octane practice.

---

## 🚀 Mission Briefing

Your objective is simple: **Master the Art of Detection**.
This platform provides three core training modules based on real-world SOC methodologies:

### 1. 🧠 Knowledge Base (The Codex)
A comprehensive archive of cybersecurity wisdom.
- **20+ Tools & Internals**: From Firewalls to eBPF, understand the *real* mechanics.
- **Exam Survival Guide**: Direct tips for acing your Oral Defense.
- **Myth Busting**: Learn why "Blocking PowerShell" is a bad idea.

### 2. ⚡ Methodology Drill (The Dojo)
Speed-run the 9-step Detection Engineering process.
- **Drag & Drop Interface**: Reorder the steps correctly under pressure.
- **Audio Feedback**: Satisfying sound effects for every success (and failure).

### 3. ⚔️ Scenario Simulator (The Arena)
Face off against real attack scenarios.
- **5 Missions**:
    - 🦠 **PowerShell Malware**: Decode obfuscated scripts.
    - 📡 **DNS Exfiltration**: Spot the tunneling in the noise.
    - 🔑 **Credential Dumping**: Catch LSASS thieves in the act.
    - 🌐 **Web Shell Upload**: Secure your web apps against PHP backdoors.
    - 🔒 **Ransomware**: Detect the behavior of mass encryption.
- **Interactive Feedback**: Choose your tool, critique the rule, and refine it.

---

## 🛠️ Tech Stack

Built with the bleeding edge of web tech:
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Cyberpunk Theme
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Infrastructure**: Docker & Terraform (OpenStack/OVH)

---

## 💻 Local Deployment

Ready to start training locally?

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/detection-engineer-hero.git
    cd detection-engineer-hero
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the dev server:**
    ```bash
    npm run dev
    ```
    Access the terminal at `http://localhost:3000`.

---

## ☁️ Deploy to OVH Cloud

Take your training ground public.

### Prerequisites
- An OVH Public Cloud Project.
- `terraform` installed.
- OpenStack credentials (source `openrc.sh`).

### Step 1: Provision Infrastructure
We use Terraform to spawn a hardened Ubuntu instance.

```bash
cd terraform
# Ensure your SSH key exists at ~/.ssh/id_rsa.pub
terraform init
terraform apply
```
*This will output your new Instance IP.*

### Step 2: Deploy the Code
Sync your code to the battle station.

```bash
# Replace with your Instance IP
export SERVER_IP=$(terraform output -raw instance_ip)

rsync -avz --exclude 'node_modules' --exclude '.git' ../detection-engineer-hero ubuntu@$SERVER_IP:/app
```

### Step 3: Launch Containers
SSH into the server and ignite the engines.

```bash
ssh ubuntu@$SERVER_IP
cd /app/detection-engineer-hero
sudo docker-compose up -d --build
```

**Mission Accomplished.** Your instance is live on port `3000`.

---

## 🤝 Contributing

Got a new attack scenario? Found a bug in the matrix?
Pull Requests are welcome. Keep the code clean, and the vibes cyber.

---

*© 2025 Detection Engineer Hero. "Trust, but Verify."*
