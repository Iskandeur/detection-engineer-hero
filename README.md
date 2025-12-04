# Detection Engineer Hero

## Overview
Detection Engineer Hero is an interactive web application designed to help cybersecurity professionals master SOC (Security Operations Center) methodologies, analyze attack scenarios, and refine detection engineering skills. It serves as a gamified learning platform for aspiring and experienced detection engineers.

## Features
- **Methodology Drill**: Master the 9 steps of detection engineering.
- **Scenario Simulator**: Analyze real-world attack scenarios and refine detection rules.
- **Knowledge Base**: Explore key SOC tools and concepts.
- **Interactive UI**: Engaging cyber-themed interface with animations.

## Tech Stack
- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Infrastructure**: Terraform, OpenStack (OVH Cloud)
- **Containerization**: Docker, Docker Compose

## Installation

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Docker (optional, for containerized run)

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/detection-engineer-hero.git
   cd detection-engineer-hero
   ```

2. Install dependencies:
   ```bash
   cd detection-engineer-hero
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Docker Deployment
1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Infrastructure Deployment

This project includes Terraform configurations for deploying to an OpenStack provider (e.g., OVH Cloud).

### Prerequisites
- Terraform installed
- OpenStack credentials (source your `openrc.sh` or configure environment variables)

### Deploying
1. Navigate to the terraform directory:
   ```bash
   cd terraform
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Plan the deployment:
   ```bash
   terraform plan
   ```

4. Apply the configuration:
   ```bash
   terraform apply
   ```

## License
[MIT](LICENSE)
