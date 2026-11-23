# ANVESH AI — Discover. Research. Verify. Integrate.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow.svg)](https://www.python.org/)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-black.svg)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **ANVESH AI** is an AI-powered Application Research and Integration Intelligence Platform built for the **Composio AI Product Ops Intern** technical take-home assignment. It researches 100 software applications across 10 functional categories, extracting developer platform capabilities, authentication schemas, Model Context Protocol (MCP) availability, and integration readiness with verifiable citations.

---

## 🚀 Live Project

| Resource | Link |
|---|---|
| **Live Dashboard** | https://anvesh-ai.vercel.app/ |
| **HTML Case Study** | https://anvesh-ai.vercel.app/case_study.html |
| **GitHub Repository** | https://github.com/saicharanega/anvesh-ai |
| **Deployment Platform** | Vercel |

---

## Table of Contents

- Project Overview
- Key Features
- Architecture & Research Pipeline
- Repository Structure
- Tech Stack
- Prerequisites
- Installation & Setup
- Running the Frontend Dashboard
- Running the Live Research Pipeline
- Independent Verification Audit
- Dataset Validation
- Viewing the HTML Case Study
- Research Findings & Summary
- Deployment Guide
- License

---

## Project Overview

Integrating modern enterprise and SaaS platforms into AI-agent workflows requires exact technical intelligence:

- What authentication methods are supported (OAuth 2.0, Personal Access Tokens, API Keys, mTLS)?
- Is API access instant self-serve or gated behind partner applications and sales calls?
- Is there an existing Model Context Protocol (MCP) server, and is it official first-party or third-party/community?
- What are the real integration blockers (rate limits, webhooks latency, IP allowlisting)?

**ANVESH AI automates this research process:**

1. **100 Applications Researched:** Distributed across 10 functional software categories.
2. **Live HTTP Network Extraction:** Autonomous crawler fetches official developer portals, API documentation, and GitHub repositories.
3. **50-Claim Independent Audit:** A representative audit reporting 76% strict standard accuracy and an experimental weighted score of 85%.
4. **Human-in-the-Loop Verification Center:** Interactive reviewer console for inspecting claims, reviewing documentation evidence, and recording decisions.

---

## Key Features

- **Executive Overview Dashboard:** Application metrics, authentication distribution, API protocol breakdowns, and MCP availability.
- **Application Explorer:** Search and filter 100 applications by category, authentication, MCP classification, and buildability.
- **Deep Application Dossiers:** Technical documentation, API endpoints, rate limits, webhook capabilities, and audit corrections.
- **Verification Audit Center:** Interactive claim verification across 10 representative applications.
- **Composio Integration Matrix:** Prioritized integration opportunities and roadmap recommendations.
- **Indian Heritage × Modern AI Theme:** Deep Emerald, Warm Gold, and Parchment design system.

---

## Architecture & Research Pipeline

The research architecture consists of six stages:

1. Discovery and normalization.
2. Live HTTP network crawling.
3. Multi-pattern technical extraction.
4. LLM technical enrichment.
5. Evidence citation and scoring.
6. Independent audit and human-in-the-loop verification.

---

## Repository Structure

```text
ANVESH-AI/
├── case_study.html
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── checkpoints/
│   ├── research_checkpoint.json
│   └── verification_audit.json
├── pipeline/
│   ├── live_crawler.py
│   ├── batch_live_crawler.py
│   ├── independent_verification_audit.py
│   └── research_pipeline.py
├── public/
│   └── case_study.html
├── scripts/
│   ├── generate_composio_100.js
│   └── validate_dataset.js
└── src/
    ├── data/
    ├── pages/
    ├── components/
    └── types/
```

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript 5.7 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS 3.4 |
| Data Visualization | Recharts |
| Iconography | Lucide React |
| Crawling | Python 3.10+, Requests |
| Parsing | BeautifulSoup4, Regex |
| LLM Enrichment | Google Gemini API |
| Validation | Node.js Test Runner |
| Hosting | Vercel |
| Version Control | Git and GitHub |

---

## Prerequisites

Install the following before running the project:

- Node.js v18 or higher
- npm v9 or higher
- Python v3.10 or higher
- Git

Optional:

- Google Gemini API key for LLM-based research enrichment.

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/saicharanega/anvesh-ai.git
cd anvesh-ai
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Install Python dependencies

```bash
pip3 install beautifulsoup4 requests
```

Optional Gemini integration:

```bash
pip3 install google-genai
```

Set your API key securely in your local environment:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

Never commit API keys or `.env` files to GitHub.

---

## Running the Frontend Dashboard

### Development Server

```bash
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

If port 5173 is already occupied, Vite automatically selects another available port, such as 5174.

### Production Build

```bash
npm run build
```

The production files are generated inside the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Running the Live Research Pipeline

### Single Application Crawl

```bash
python3 pipeline/live_crawler.py APP-064
```

### Batch Crawling

```bash
python3 pipeline/batch_live_crawler.py --start 0 --size 5
```

### Full 100-Application Crawl

```bash
python3 pipeline/batch_live_crawler.py --all
```

The crawler saves progress in:

```text
checkpoints/research_checkpoint.json
```

It can resume from the last completed application.

### Force Re-crawl

```bash
python3 pipeline/batch_live_crawler.py --all --force
```

---

## Independent Verification Audit

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

The weighted score is calculated as:

`(38 + 0.5 × 9) / 50 × 100 = 85%`

This score applies only to the representative 50-claim audit sample.

---

## Dataset Validation

Run:

```bash
npm run validate
```

Validation checks include:

- Exactly 100 applications.
- Exactly 10 applications per category.
- No duplicate application names or identifiers.
- Valid HTTP/HTTPS documentation URLs.
- Special cases such as gated API access and applications without public APIs.

---

## Viewing the HTML Case Study

The project includes a self-contained HTML case study.

### Local Viewing

Open `case_study.html` directly in your browser.

Alternatively, start the Vite server:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/case_study.html
```

Use the port printed by Vite if it selects a different one.

### Live Case Study

https://anvesh-ai.vercel.app/case_study.html

The case study contains 18 sections covering the executive summary, research methodology, architecture, application coverage, verification results, Composio integration opportunities, and technical challenges.

---

## Research Findings & Summary

### 10 Application Categories

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

### Key Research Insights

1. OAuth 2.0 is a dominant authentication method across enterprise applications.
2. REST APIs remain widely used, while GraphQL is available in several modern platforms.
3. MCP adoption is growing, with both official and community-maintained implementations.
4. Some platforms restrict API access through partner approvals, enterprise plans, or other access requirements.

---

## Deployment Guide

### Production Deployment — Vercel

ANVESH AI is deployed on Vercel and connected to its GitHub repository.

**Live URLs:**

- Dashboard: https://anvesh-ai.vercel.app/
- Case Study: https://anvesh-ai.vercel.app/case_study.html
- GitHub: https://github.com/saicharanega/anvesh-ai

### Vercel Configuration

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### Deploy Using GitHub Integration

1. Sign in to [Vercel](https://vercel.com/) using GitHub.
2. Select **Add New → Project**.
3. Import `saicharanega/anvesh-ai`.
4. Verify the build configuration above.
5. Click **Deploy**.
6. Wait until the deployment status becomes **Ready**.
7. Open the production URL and verify the dashboard and case study.

### Automatic Deployment

After connecting GitHub to Vercel, future pushes to the configured production branch trigger new deployments automatically.

To publish updates:

```bash
git add .
git commit -m "Update ANVESH AI"
git push origin main
```

Vercel will build and deploy the latest changes.

### Deploy Using Vercel CLI

Alternatively, install the Vercel CLI:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

For production:

```bash
vercel --prod
```

### Environment Variables

The currently published frontend dashboard and static case study do not require environment variables.

The optional research pipeline can use `GEMINI_API_KEY` locally for Gemini-based enrichment.

Never upload API keys, credentials, or `.env` files to GitHub.

If a future deployed feature requires a secret, configure it through:

**Vercel → Project Settings → Environment Variables**

### Other Hosting Options

**Netlify**

1. Connect your GitHub repository.
2. Set build command to `npm run build`.
3. Set publish directory to `dist`.
4. Deploy.

**GitHub Pages**

The standalone HTML case study can be hosted as a static page. For the Vite dashboard, configure the repository base path and a GitHub Actions build workflow before publishing `dist/`.

---

## Deployment Verification Checklist

- [ ] GitHub repository is accessible.
- [ ] Vercel deployment status is Ready.
- [ ] Dashboard homepage loads correctly.
- [ ] HTML case study loads correctly.
- [ ] Charts, tables, and navigation work.
- [ ] No API keys or private credentials are exposed.

---

## Author & Attribution

Developed for the **Composio AI Product Ops Intern Take-Home Assignment**.

- **Project:** ANVESH AI
- **Tagline:** Discover. Research. Verify. Integrate.
- **Deployment:** Vercel
- **Source Code:** https://github.com/saicharanega/anvesh-ai
- **Live Application:** https://anvesh-ai.vercel.app/

**Design Philosophy:** Indian Heritage aesthetics × Modern Enterprise AI.

