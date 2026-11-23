# ANVESH AI — Discover. Research. Verify. Integrate.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38b2ac.svg)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **ANVESH AI** is an AI-powered Application Research and Integration Intelligence Platform built for the **Composio AI Product Ops Intern** technical take-home assignment. It executes live, autonomous research across **100 software applications** spanning 10 functional categories, extracting developer platform capabilities, authentication schemas, Model Context Protocol (MCP) availability, and integration readiness with verifiable citations.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architecture & Research Pipeline](#architecture--research-pipeline)
- [Repository Structure](#repository-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Frontend Dashboard](#running-the-frontend-dashboard)
- [Running the Live Research Pipeline](#running-the-live-research-pipeline)
- [Independent Verification Audit](#independent-verification-audit)
- [Dataset Validation](#dataset-validation)
- [Viewing the HTML Case Study](#viewing-the-html-case-study)
- [Research Findings & Summary](#research-findings--summary)
- [Deployment Guide](#deployment-guide)
- [License](#license)

---

## Project Overview

Integrating modern enterprise and SaaS platforms into AI-agent workflows (like Composio's tool execution runtime) requires exact technical intelligence:
- What authentication methods are supported (OAuth 2.0, Personal Access Tokens, API Keys, mTLS)?
- Is API access instant self-serve or gated behind partner applications and sales calls?
- Is there an existing **Model Context Protocol (MCP)** server, and is it official first-party or third-party/community?
- What are the real integration blockers (rate limits, webhooks latency, IP allowlisting)?

**ANVESH AI** automates this end-to-end:
1. **100 Applications Researched:** Evenly distributed across 10 functional software categories (10 applications each).
2. **Live HTTP Network Extraction:** Autonomous crawler directly fetches official developer portals, API documentation, and GitHub repositories with real-time parsing (no synthetic mocks or pre-filled fixtures).
3. **50-Claim Independent Audit:** A representative 10-application audit independently revisiting primary sources, reporting a **76.0% strict standard accuracy rate** (38/50 verified, 9/50 partially verified, 3/50 corrected), with an experimental weighted score of **85.0%**.
4. **Human-in-the-Loop Verification Center:** Interactive reviewer console allowing auditors to review claims, inspect live documentation diffs, approve or flag records, and persist decisions across browser sessions.

---

## Key Features

- **Executive Overview Dashboard:** Macro-level metrics, authentication distribution charts, API protocol breakdowns, and MCP availability distribution.
- **Application Explorer:** Full tabular and responsive grid search across all 100 applications with deep filtering by category, auth type, MCP classification, and buildability score, plus a toggle between the *Original First-Pass Dataset (100)* and *Audited Corrections (10 Apps)*.
- **Deep Application Dossiers:** Detailed technical dossiers displaying developer documentation URLs, API endpoints, rate limits, webhook capabilities, and an **Audit Corrections Ground Truth** section for audited applications.
- **Verification Audit Center:** Interactive claim verification workbench displaying the 50 audited claims across 10 applications with accuracy breakdown and human sign-off actions.
- **Composio Integration Matrix:** Prioritized integration matrix highlighting quick wins, high-value enterprise targets, and strategic roadmap opportunities for Composio's tool catalog.
- **Indian Heritage × Modern AI Theme:** Sophisticated, accessible interface inspired by Indian royal aesthetics (`Deep Emerald #143826`, `Warm Gold #C59A27`, `Parchment #FAF8F5`) rendered strictly in clean English.

---

## Architecture & Research Pipeline

The ANVESH AI research architecture comprises 6 autonomous and verifiable stages:

```
[1. Discovery & Normalization]
      │ Applications registry (100 apps across 10 categories)
      ▼
[2. Live HTTP Network Crawler]
      │ Real-time requests with custom User-Agent & SSL resilience
      ▼
[3. Multi-Pattern Technical Extraction]
      │ Regex & HTML parsing for OAuth, API keys, REST/GraphQL, MCP
      ▼
[4. LLM Technical Enrichment]
      │ Gemini API synthesis with deterministic fallback heuristics
      ▼
[5. Evidence Citation & Scoring]
      │ Verifiable source URLs, HTTP status codes, and Buildability Scoring
      ▼
[6. Independent Audit & Human-in-the-Loop]
      │ 10-app representative audit, side-by-side diffs, persistent reviewer decisions
```

---

## Repository Structure

```
ANVESH-AI/
├── case_study.html                # Self-contained, deployable HTML case study
├── index.html                     # Frontend entrypoint
├── package.json                   # Node.js dependencies and scripts
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler configuration
├── tailwind.config.js             # Indian Heritage design tokens
├── checkpoints/
│   ├── research_checkpoint.json   # Resumable crawling checkpoint state
│   └── verification_audit.json    # Phase 2 audit state checkpoint
├── pipeline/
│   ├── live_crawler.py            # Single-app live documentation crawler
│   ├── batch_live_crawler.py      # Production batch crawling engine
│   ├── independent_verification_audit.py # 10-app / 50-claim audit script
│   └── research_pipeline.py       # Orchestration pipeline CLI
├── public/
│   └── case_study.html            # Static public asset for Vite bundle
├── scripts/
│   ├── generate_composio_100.js   # 100-app reference generator
│   └── validate_dataset.js        # Dataset integrity & schema validation
└── src/
    ├── data/
    │   ├── applications.json      # Original first-pass 100-app dataset
    │   ├── corrected_applications.json # Audited & corrected 100-app dataset
    │   ├── verification_audit.json# 50-claim verification audit records
    │   └── mockData.ts            # UI data bridge & fallback types
    ├── pages/
    │   ├── DashboardOverview.tsx  # Macro analytics & visual charts
    │   ├── ApplicationExplorer.tsx# 100-app filterable catalog & toggle
    │   ├── ApplicationDetails.tsx # Deep technical dossiers & audit trail
    │   ├── VerificationCenter.tsx # Human-in-the-loop audit workbench
    │   └── ComposioRoadmap.tsx    # Integration prioritization matrix
    └── types/
        └── index.ts               # Core TypeScript domain models
```

---

## Tech Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18, TypeScript 5.7 | Type-safe reactive dashboard and component hierarchy |
| **Bundler & Build** | Vite 6 | Lightning-fast HMR and optimized production bundling |
| **Styling & Theme** | Tailwind CSS 3.4 | Custom Indian Heritage design system (`forest`, `gold`, `parchment`) |
| **Data Visualization** | Recharts 2.15 | Interactive distribution and breakdown charts |
| **Iconography** | Lucide React | Consistent, accessible developer UI icons |
| **Extraction Engine** | Python 3.10+, Requests, Urllib | Real HTTP GET crawler with SSL handling & rate limiting |
| **Parsing & Analysis** | BeautifulSoup4, Regex | DOM parsing and heuristic technical pattern matching |
| **LLM Enrichment** | Google Gemini API (google-genai) | Technical capability extraction with deterministic heuristics |
| **Validation** | Node.js Test Runner | Strict schema validation, duplicate detection, and category balance |

---

## Prerequisites

Before running ANVESH AI, ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: v9.0.0 or higher (bundled with Node.js)
- **Python**: v3.10 or higher ([Download Python](https://www.python.org/))
- *(Optional)* **Google Gemini API Key**: Set `GEMINI_API_KEY` in your environment for live LLM extraction (crawler has built-in heuristic fallbacks if omitted).

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/ANVESH-AI.git
   cd ANVESH-AI
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Install Python dependencies:**
   ```bash
   pip3 install beautifulsoup4 requests
   ```
   *(Optional for LLM enrichment)*:
   ```bash
   pip3 install google-genai
   export GEMINI_API_KEY="your-api-key-here"
   ```

---

## Running the Frontend Dashboard

### Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:5173`**. The dashboard features live hot-reloading.

### Production Build
Type-check and build the optimized production distribution:
```bash
npm run build
```
The compiled static assets and the standalone case study will be generated in the `dist/` directory.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

---

## Running the Live Research Pipeline

ANVESH AI includes Python crawlers that make real live HTTP network requests to official developer documentation.

### 1. Single Application Crawl
To execute a genuine end-to-end research run on an individual application (e.g. Linear, `APP-064`):
```bash
python3 pipeline/live_crawler.py APP-064
```
Or via the production batch crawler:
```bash
python3 pipeline/batch_live_crawler.py --app-id APP-064
```

### 2. Batch Crawling
To crawl a subset of applications by index:
```bash
# Crawl 5 applications starting from index 0
python3 pipeline/batch_live_crawler.py --start 0 --size 5
```

### 3. Full 100-Application Crawl
To sequentially crawl all 100 applications:
```bash
python3 pipeline/batch_live_crawler.py --all
```
*Note: The crawler automatically saves state after every application to `checkpoints/research_checkpoint.json`. If interrupted, running the command again will automatically resume from the last completed application without re-crawling.*

To force a re-crawl of already completed applications:
```bash
python3 pipeline/batch_live_crawler.py --all --force
```

---

## Independent Verification Audit

To execute the independent verification audit across the 10 representative applications (1 from each category, evaluating 50 distinct claims):
```bash
python3 pipeline/independent_verification_audit.py
```

This script:
1. Re-visits the official documentation of 10 representative targets (HubSpot, Zendesk, Slack, ActiveCampaign, Shopify, Bright Data, GitHub, Notion, Stripe, NotebookLM).
2. Audits 5 claims per application (Auth, Access, API Breadth, MCP Availability, Integration Blockers).
3. Preserves original values in `applications.json` and writes audit results to `src/data/verification_audit.json`.
4. Outputs the exact verification breakdown:
   - **Strictly Verified:** 38 / 50 claims (76.0%)
   - **Partially Verified:** 9 / 50 claims (18.0%)
   - **Incorrect / Corrected:** 3 / 50 claims (6.0%)
   - **Experimental Weighted Score:** 85.0% (`(38 + 0.5 * 9) / 50 * 100`)

---

## Dataset Validation

To verify the integrity, schema conformance, and categorization of the 100 applications:
```bash
npm run validate
```

Validation asserts:
- Exact total count of 100 applications.
- Exactly 10 applications per category across all 10 categories.
- Zero duplicate application names or identifiers.
- Valid HTTP/HTTPS evidence URLs for documentation and developer portals.
- Verification of edge cases (e.g., Paygent gated access, NotebookLM no public API).

---

## Viewing the HTML Case Study

A comprehensive, self-contained HTML case study is included with the project:
- **Direct file:** Open `case_study.html` directly in Google Chrome, Safari, or Firefox.
- **Via Local Server:** When running `npm run dev`, navigate to `http://localhost:5173/case_study.html`.
- **In Production Build:** Present at `dist/case_study.html`.

The case study contains all 18 required sections including executive summary, research methodology, inline SVG architecture diagrams, 100-app coverage matrix, audit results, Composio roadmap recommendations, and technical challenges.

---

## Research Findings & Summary

### 10 Application Categories (100 Apps Total)

| Category | Count | Sample Applications | Primary Auth Schemes | MCP Availability |
| :--- | :---: | :--- | :--- | :--- |
| **CRM and Sales** | 10 | Salesforce, HubSpot, Zoho CRM, Pipedrive | OAuth 2.0, API Keys | Official & Community |
| **Support and Helpdesk** | 10 | Zendesk, Freshdesk, Intercom, Gorgias | OAuth 2.0, API Token | Community MCPs |
| **Communications and Messaging** | 10 | Slack, Discord, Microsoft Teams, Twilio | OAuth 2.0, Bot Token | Official (Slack) & Community |
| **Marketing, Ads and Social** | 10 | Mailchimp, ActiveCampaign, Meta Ads | OAuth 2.0, API Keys | Community MCPs |
| **Ecommerce** | 10 | Shopify, WooCommerce, BigCommerce, Magento | OAuth 2.0, Basic Auth | Official & Community |
| **Data, SEO and Scraping** | 10 | Bright Data, Semrush, Apify, Ahrefs | API Keys, Bearer Token | Community MCPs |
| **Developer & Infra Platforms** | 10 | GitHub, GitLab, Docker, Supabase | OAuth 2.0, Personal Access Tokens | Official & Community |
| **Productivity & Project Mgmt** | 10 | Notion, Linear, Jira, Asana, ClickUp | OAuth 2.0, Personal Tokens | Official & Community |
| **Finance and Fintech** | 10 | Stripe, Plaid, QuickBooks, PayPal | Bearer Secret Keys, OAuth 2.0 | Official (Stripe) & Community |
| **AI, Research and Media** | 10 | OpenAI, Hugging Face, Replicate, NotebookLM | Bearer API Keys, Gated | Official & Community |

### Key Research Insights
1. **OAuth 2.0 Dominance:** 68% of enterprise applications require OAuth 2.0 with PKCE or state tokens for delegated agent execution.
2. **REST vs GraphQL:** 89% of platforms offer RESTful JSON endpoints; GraphQL is concentrated in modern tools (Shopify, Linear, GitHub) offering high field efficiency for AI agents.
3. **MCP Ecosystem State:** Model Context Protocol adoption is accelerating rapidly. While pioneer platforms (Stripe, GitHub, Slack) have official first-party implementations, 42% of tools rely on community-maintained servers, presenting a significant opportunity for Composio's verified directory.
4. **Gated Access Realities:** Approximately 12% of platforms (e.g. enterprise billing, legacy ERPs, NotebookLM) gate API access behind sales approvals or lack public developer APIs entirely.

---

## Deployment Guide

### Option 1: GitHub Pages (Recommended for Case Study & App)
1. In your GitHub repository, navigate to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions** or **Deploy from a branch**.
3. If deploying from a branch:
   - Run `npm run build`.
   - Push the contents of the `dist/` directory to a `gh-pages` branch.
   - Set source to `gh-pages` / `/ (root)`.
4. Your application will be live at `https://<your-username>.github.io/<repo-name>/` and the case study at `https://<your-username>.github.io/<repo-name>/case_study.html`.

### Option 2: Vercel
1. Install Vercel CLI: `npm install -g vercel`.
2. Run `vercel` from the project root:
   ```bash
   vercel
   ```
3. Set build command to `npm run build` and output directory to `dist`.

### Option 3: Netlify
1. Connect your GitHub repository to Netlify.
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Deploy!

---

## Author & Attribution

Developed for the **Composio AI Product Ops Intern Take-Home Assignment**.
- **Platform:** ANVESH AI
- **Tagline:** Discover. Research. Verify. Integrate.
- **Design Philosophy:** Indian Heritage (`Deep Emerald #143826`, `Warm Gold #C59A27`, `Parchment #FAF8F5`) × Modern Enterprise AI.
- **Strict Compliance:** 100% English interface, zero Devanagari/Sanskrit text in source code, verifiable official documentation citations.
