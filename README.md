# ANVESH AI — Discover. Research. Verify. Integrate.

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow.svg)](https://www.python.org/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black.svg)](https://vercel.com/)

**ANVESH AI** is an AI-powered Application Research and Integration Intelligence Platform developed for the **Composio AI Product Ops Intern Take-Home Assignment**.

It researches 100 software applications across 10 functional categories, analyzing authentication methods, API capabilities, Model Context Protocol (MCP) availability, developer documentation, and integration readiness.

---

## 🚀 Live Project

| Resource | Link |
|---|---|
| Live Dashboard | https://anvesh-ai.vercel.app/ |
| Live HTML Case Study | https://anvesh-ai.vercel.app/case_study.html |
| GitHub Repository | https://github.com/saicharanega/anvesh-ai |

---

## ⚡ Quick Start — Run the Research Agent

Follow these steps to clone the repository and run the research agent locally.

### 1. Clone the repository

```bash
git clone https://github.com/saicharanega/anvesh-ai.git
cd anvesh-ai
```

### 2. Install dependencies

Install Node.js dependencies:

```bash
npm install
```

Install Python dependencies:

```bash
pip3 install beautifulsoup4 requests
```

For optional Gemini-based LLM enrichment:

```bash
pip3 install google-genai
```

### 3. Run research for a single application

```bash
python3 pipeline/live_crawler.py APP-064
```

### 4. Run batch research

To research five applications starting from index 0:

```bash
python3 pipeline/batch_live_crawler.py --start 0 --size 5
```

### 5. Run the complete 100-application research pipeline

```bash
python3 pipeline/batch_live_crawler.py --all
```

The crawler saves progress in:

```text
checkpoints/research_checkpoint.json
```

It supports resuming from previously completed applications.

### 6. Validate the dataset

```bash
npm run validate
```

### Optional: Configure Gemini API

For Gemini-based research enrichment, configure your API key as an environment variable:

**macOS / Linux:**

```bash
export GEMINI_API_KEY="your-api-key-here"
```

**Windows PowerShell:**

```powershell
$env:GEMINI_API_KEY="your-api-key-here"
```

Never commit API keys or `.env` files to GitHub.

---

## 📌 Project Overview

Researching enterprise applications for AI-agent integrations requires understanding:

- Authentication methods such as OAuth 2.0, API Keys, and Personal Access Tokens.
- API availability and developer access requirements.
- REST and GraphQL API capabilities.
- Official and community-maintained MCP servers.
- Integration challenges such as rate limits, webhooks, and access restrictions.

ANVESH AI automates this research through live documentation crawling, technical extraction, LLM enrichment, evidence collection, and independent verification.

---

## ✨ Key Features

1. **Executive Dashboard:** Displays research metrics, authentication distribution, API protocols, and MCP availability.
2. **Application Explorer:** Search and filter 100 applications across 10 categories.
3. **Application Details:** Provides technical information, developer documentation, API endpoints, and integration requirements.
4. **Verification Audit Center:** Reviews and evaluates research claims against primary sources.
5. **Composio Integration Matrix:** Identifies integration opportunities and prioritizes potential applications.
6. **Human-in-the-Loop Verification:** Allows reviewers to inspect claims and record verification decisions.

---

## 🏗️ Architecture & Research Pipeline

The platform follows six major stages:

```text
1. Discovery & Normalization
          |
          v
2. Live HTTP Network Crawling
          |
          v
3. Technical Information Extraction
          |
          v
4. LLM-Based Enrichment
          |
          v
5. Evidence Citation & Scoring
          |
          v
6. Independent Verification
   & Human-in-the-Loop Review
```

### Research Pipeline Components

| Component | Responsibility |
|---|---|
| Discovery | Identifies and organizes applications |
| Live Crawler | Fetches official developer documentation |
| Technical Extraction | Extracts authentication, API, and MCP information |
| LLM Enrichment | Uses Gemini for additional technical analysis |
| Evidence Scoring | Records sources and evaluates integration readiness |
| Verification Audit | Independently checks research claims |

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Data Visualization | Recharts |
| Icons | Lucide React |
| Backend Research Pipeline | Python |
| Web Crawling | Requests |
| HTML Parsing | BeautifulSoup4, Regex |
| LLM Integration | Google Gemini API |
| Validation | Node.js |
| Hosting | Vercel |
| Version Control | Git, GitHub |

---

## 📂 Repository Structure

```text
ANVESH-AI/
│
├── case_study.html
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
│
├── checkpoints/
│   ├── research_checkpoint.json
│   └── verification_audit.json
│
├── pipeline/
│   ├── live_crawler.py
│   ├── batch_live_crawler.py
│   ├── independent_verification_audit.py
│   └── research_pipeline.py
│
├── public/
│   └── case_study.html
│
├── scripts/
│   ├── generate_composio_100.js
│   └── validate_dataset.js
│
└── src/
    ├── data/
    ├── pages/
    ├── components/
    └── types/
```

---

## 💻 Running the Frontend Dashboard

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, normally:

```text
http://localhost:5173
```

If port 5173 is occupied, Vite automatically selects another available port.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

The production build is generated inside the `dist/` directory.

---

## 🔍 Independent Verification Audit

Run the independent verification audit:

```bash
python3 pipeline/independent_verification_audit.py
```

The audit evaluates 50 claims across 10 representative applications.

### Verification Results

| Result | Claims | Percentage |
|---|---:|---:|
| Strictly Verified | 38 | 76% |
| Partially Verified | 9 | 18% |
| Incorrect / Corrected | 3 | 6% |
| Experimental Weighted Score | — | 85% |

Weighted score:

```text
(38 + 0.5 × 9) / 50 × 100 = 85%
```

*The weighted score applies only to the representative 50-claim audit sample.*

---

## 📊 Dataset Validation

Run:

```bash
npm run validate
```

The validation checks:

- 100 applications in total.
- 10 applications per category.
- No duplicate application names or identifiers.
- Valid documentation and developer portal URLs.
- Special cases involving gated API access and applications without public APIs.

---

## 📑 HTML Case Study

The project includes a self-contained HTML case study covering 18 sections.

It includes:

- Executive summary and problem statement.
- Research methodology.
- Technical architecture and workflow.
- 100-application coverage matrix.
- Research findings and API/MCP insights.
- Independent verification audit.
- Composio integration roadmap.
- Technical challenges and recommendations.

**View the live case study:**

https://anvesh-ai.vercel.app/case_study.html

---

## 🌐 Deployment Guide

ANVESH AI is deployed using **Vercel** and connected to the GitHub repository.

### Vercel Configuration

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Deploying Updates

After making changes to the project, push them to GitHub:

```bash
git add .
git commit -m "Update ANVESH AI"
git push origin main
```

Vercel automatically builds and deploys new changes when the connected production branch receives updates.

### Vercel CLI (Alternative)

```bash
npm install -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

---

## 📈 Research Categories

The platform covers 100 applications across 10 categories:

| Category | Applications |
|---|---:|
| CRM and Sales | 10 |
| Support and Helpdesk | 10 |
| Communications and Messaging | 10 |
| Marketing, Ads and Social | 10 |
| Ecommerce | 10 |
| Data, SEO and Scraping | 10 |
| Developer and Infrastructure | 10 |
| Productivity and Project Management | 10 |
| Finance and Fintech | 10 |
| AI, Research and Media | 10 |
| **Total** | **100** |

---

## 🔐 Security Notes

- Keep API keys and credentials outside source control.
- Never commit `.env` files.
- Use environment variables for sensitive configuration.
- Review files before pushing changes to GitHub.

---

## 👩‍💻 Author & Attribution

**Developed for:** Composio AI Product Ops Intern Take-Home Assignment.

**Project:** ANVESH AI

**Tagline:** Discover. Research. Verify. Integrate.

**Live Application:** https://anvesh-ai.vercel.app/

**Source Repository:** https://github.com/saicharanega/anvesh-ai

**Design Philosophy:** Indian Heritage aesthetics × Modern Enterprise AI.

