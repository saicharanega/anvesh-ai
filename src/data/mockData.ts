import applicationsRaw from './applications.json';
import correctedApplicationsRaw from './corrected_applications.json';
import { 
  Application, 
  VerificationItem, 
  ResearchStep,
  IntegrationBlockerStat 
} from '../types';

// Ground-truth applications dataset (original first-pass research records)
export const applications: Application[] = applicationsRaw as Application[];

// Audited & corrected applications dataset (retaining original where unaudited, applying verified corrections for the 10 audited apps)
export const correctedApplications: Application[] = correctedApplicationsRaw as Application[];

// Cleanly separated Benchmark Demonstration Data for preview mode
export const sampleBenchmarkStats = {
  researchedCount: 68,
  verifiedCount: 42,
  selfServeCount: 68,
  gatedCount: 24,
  highBuildability: 62,
  mediumBuildability: 28,
  lowBuildability: 10,
  categoryCounts: {
    "CRM and Sales": 10,
    "Support and Helpdesk": 10,
    "Communications and Messaging": 10,
    "Marketing, Ads, Email and Social": 10,
    "Ecommerce": 10,
    "Data, SEO and Scraping": 10,
    "Developer, Infra and Data Platforms": 10,
    "Productivity and Project Management": 10,
    "Finance and Fintech": 10,
    "AI, Research and Media-native": 10
  },
  authDistribution: [
    { name: 'OAuth2', value: 44, color: '#143826' },
    { name: 'API Key', value: 38, color: '#C59A27' },
    { name: 'OAuth2 & API Key', value: 12, color: '#2D6A4F' },
    { name: 'Basic Auth', value: 4, color: '#C85A32' },
    { name: 'No Public API', value: 2, color: '#718079' }
  ],
  accessDistribution: [
    { name: 'Self-Serve', value: 68, color: '#143826' },
    { name: 'Gated / Approval', value: 18, color: '#C85A32' },
    { name: 'Contact Sales', value: 12, color: '#C59A27' },
    { name: 'No Public API', value: 2, color: '#718079' }
  ],
  apiTypeDistribution: [
    { name: 'REST + Webhooks', count: 54, fill: '#143826' },
    { name: 'REST', count: 32, fill: '#2D6A4F' },
    { name: 'GraphQL', count: 8, fill: '#C59A27' },
    { name: 'gRPC', count: 4, fill: '#C85A32' },
    { name: 'No Public API', count: 2, fill: '#718079' }
  ],
  mcpDistribution: [
    { name: 'Native MCP Server', count: 18, fill: '#143826' },
    { name: 'Community MCP', count: 42, fill: '#C59A27' },
    { name: 'OpenAPI Available', count: 24, fill: '#2D6A4F' },
    { name: 'No MCP Support', count: 16, fill: '#C85A32' }
  ],
  buildabilityDistribution: [
    { name: 'High Buildability', count: 62, fill: '#143826' },
    { name: 'Medium Buildability', count: 28, fill: '#C59A27' },
    { name: 'Low Buildability', count: 10, fill: '#C85A32' }
  ]
};

export const verificationItems: VerificationItem[] = [
  {
    id: "VER-001",
    applicationId: "APP-021",
    applicationName: "Slack",
    category: "Communications and Messaging",
    aspect: "MCP Server Compatibility",
    status: "Verified",
    evidenceUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack",
    findings: "Native Model Context Protocol (MCP) server actively maintained. Tool calling supports channel listing, message posting, and thread reactions.",
    auditorNotes: "Verified full bidirectional tool-calling functionality using Claude 3.5 Sonnet and Composio agent test suites.",
    verifiedDate: "2026-11-20",
    auditor: "Integration Lead"
  },
  {
    id: "VER-002",
    applicationId: "APP-061",
    applicationName: "GitHub",
    category: "Developer, Infra and Data Platforms",
    aspect: "API Access Verification",
    status: "Pending Review",
    evidenceUrl: "https://docs.github.com/en/rest",
    findings: "Self-serve Personal Access Tokens and OAuth Apps available immediately. Rate limits up to 5,000 requests/hour for authenticated users.",
    auditorNotes: "Under quality audit: Documentation verified at https://docs.github.com/en/rest. Official MCP server @modelcontextprotocol/server-github validated. Pending independent attestation sign-off.",
    verifiedDate: "2026-11-20",
    auditor: "Senior Agent Architect"
  },
  {
    id: "VER-003",
    applicationId: "APP-081",
    applicationName: "Stripe",
    category: "Finance and Fintech",
    aspect: "Tool Calling Schema",
    status: "Verified",
    evidenceUrl: "https://docs.stripe.com/api",
    findings: "Official Stripe Agent Toolkit and Model Context Protocol server. Idempotency keys prevent duplicate transaction executions.",
    auditorNotes: "Gold standard API design for autonomous agents. Test mode keys work out of the box with zero delay.",
    verifiedDate: "2026-11-19",
    auditor: "API Reviewer"
  },
  {
    id: "VER-004",
    applicationId: "APP-064",
    applicationName: "Linear",
    category: "Developer, Infra and Data Platforms",
    aspect: "MCP Server Compatibility",
    status: "Verified",
    evidenceUrl: "https://github.com/jerhadf/linear-mcp-server",
    findings: "Native GraphQL schema allows exact field queries with zero payload bloat. Personal API keys generate instantly.",
    auditorNotes: "Verified high buildability. Clean mutation responses for issue creation and sprint planning.",
    verifiedDate: "2026-11-18",
    auditor: "Integration Lead"
  },
  {
    id: "VER-005",
    applicationId: "APP-001",
    applicationName: "Salesforce",
    category: "CRM and Sales",
    aspect: "OAuth Flow Inspection",
    status: "Flagged Discrepancy",
    evidenceUrl: "https://developer.salesforce.com/docs",
    findings: "Connected App configuration requires System Administrator access. Production instances enforce strict IP login ranges and MFA session tokens.",
    auditorNotes: "Gated access: cannot be connected in a purely self-serve automated agent workflow without human admin authorization.",
    verifiedDate: "2026-11-18",
    auditor: "Senior Security Assessor"
  },
  {
    id: "VER-006",
    applicationId: "APP-095",
    applicationName: "Midjourney",
    category: "AI, Research and Media-native",
    aspect: "API Access Verification",
    status: "Flagged Discrepancy",
    evidenceUrl: "https://docs.midjourney.com",
    findings: "No public official API provided. Only accessible via Discord chat commands or unofficial reverse-engineered wrappers.",
    auditorNotes: "Low buildability for reliable production agent integrations. Lacks programmatic webhook status callbacks.",
    verifiedDate: "2026-11-17",
    auditor: "Agent Architect"
  },
  {
    id: "VER-007",
    applicationId: "APP-071",
    applicationName: "Notion",
    category: "Productivity and Project Management",
    aspect: "Tool Calling Schema",
    status: "Verified",
    evidenceUrl: "https://developers.notion.com",
    findings: "Official Notion API and MCP server. Requires users to explicitly share specific databases or page trees with the internal integration.",
    auditorNotes: "Block hierarchy requires recursive parsing, but page creation and property updates are fully supported.",
    verifiedDate: "2026-11-16",
    auditor: "Integration Lead"
  },
  {
    id: "VER-008",
    applicationId: "APP-039",
    applicationName: "Twitter / X API",
    category: "Marketing, Ads, Email and Social",
    aspect: "Rate Limits & Blockers",
    status: "Pending Review",
    evidenceUrl: "https://developer.x.com/en/docs",
    findings: "Paywalled tiers ($100/mo Basic, $5,000/mo Pro). Free tier strictly limits read calls and permits very limited posting.",
    auditorNotes: "Requires review of whether to mark as Gated / Paywalled for autonomous open-source agent deployments.",
    verifiedDate: "2026-11-15",
    auditor: "API Reviewer"
  }
];

export const commonBlockersList: IntegrationBlockerStat[] = [
  { blocker: "Enterprise Plan Required for Webhooks or Full API", count: 24, impactLevel: "High", affectedCategories: ["CRM and Sales", "Support and Helpdesk", "Data, SEO and Scraping"] },
  { blocker: "Complex OAuth App Approval / Manual Admin Review", count: 21, impactLevel: "High", affectedCategories: ["Marketing, Ads, Email and Social", "Communications and Messaging"] },
  { blocker: "Strict Rate Limits (Under 100 requests per minute)", count: 18, impactLevel: "Medium", affectedCategories: ["Support and Helpdesk", "Ecommerce", "Data, SEO and Scraping"] },
  { blocker: "No Public REST or GraphQL API Available", count: 8, impactLevel: "High", affectedCategories: ["AI, Research and Media-native", "Ecommerce"] },
  { blocker: "Missing Webhook Callbacks (Polling Required)", count: 15, impactLevel: "Medium", affectedCategories: ["Productivity and Project Management", "AI, Research and Media-native"] },
  { blocker: "Domain-Specific Data Center Routing Endpoints", count: 11, impactLevel: "Low", affectedCategories: ["CRM and Sales", "Marketing, Ads, Email and Social"] },
  { blocker: "Short OAuth Token Expiry (Under 60 Minutes)", count: 14, impactLevel: "Medium", affectedCategories: ["Finance and Fintech", "CRM and Sales"] }
];

export const initialResearchSteps: ResearchStep[] = [
  {
    id: "step-1",
    title: "Documentation & Endpoint Discovery",
    category: "Documentation",
    status: "completed",
    timestamp: "14:22:05",
    details: "Crawled developer reference portal and OpenAPI / Swagger JSON schemas.",
    findings: "Discovered 48 documented REST endpoints, 12 webhook trigger events, and OpenAPI 3.1.0 specifications.",
    confidenceScore: 0.99
  },
  {
    id: "step-2",
    title: "Authentication Protocol & Rate Limit Analysis",
    category: "Authentication",
    status: "completed",
    timestamp: "14:22:28",
    details: "Inspected token grant workflows: OAuth2 authorization code with PKCE and Personal Access Tokens.",
    findings: "Rate limit threshold: 5,000 requests/hour with standard HTTP 429 response headers and Retry-After timestamps.",
    confidenceScore: 0.96,
    codeSnippet: `// Authentication Header Schema
GET /api/v1/tools HTTP/1.1
Host: api.targetapp.com
Authorization: Bearer <access_token>
Accept: application/json
User-Agent: AnveshAI-Agent/2.4 (Tool-Calling-Evaluator)`
  },
  {
    id: "step-3",
    title: "Model Context Protocol (MCP) & Tool Schema Evaluation",
    category: "MCP Evaluation",
    status: "completed",
    timestamp: "14:23:02",
    details: "Evaluated JSON-RPC 2.0 tool definitions against Anthropic and OpenAI tool-calling specifications.",
    findings: "Compatible with MCP servers. Structured argument validation via JSON Schema draft-07.",
    confidenceScore: 0.95
  },
  {
    id: "step-4",
    title: "AI Agent Buildability & Readiness Synthesis",
    category: "Buildability Synthesis",
    status: "completed",
    timestamp: "14:23:34",
    details: "Synthesized overall integration readiness index across developer experience, access gating, and error handling.",
    findings: "Rating: High Buildability. Self-serve API access confirmed with sandbox testing support.",
    confidenceScore: 0.98
  }
];
