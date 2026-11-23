export type Category = 
  | 'CRM and Sales'
  | 'Support and Helpdesk'
  | 'Communications and Messaging'
  | 'Marketing, Ads, Email and Social'
  | 'Ecommerce'
  | 'Data, SEO and Scraping'
  | 'Developer, Infra and Data Platforms'
  | 'Productivity and Project Management'
  | 'Finance and Fintech'
  | 'AI, Research and Media-native';

export type AuthMethod = 
  | 'Personal Access Tokens & OAuth 2.0'
  | 'Personal Access Tokens'
  | 'OAuth2'
  | 'API Key'
  | 'OAuth2 & API Key'
  | 'Basic Auth'
  | 'Session / Cookie'
  | 'JWT / App Tokens'
  | 'None'
  | 'Pending'
  | string;

export type ApiAccess = 
  | 'Self-Serve'
  | 'Gated / Enterprise Approval'
  | 'Waitlist / Contact Sales'
  | 'No Public API'
  | 'Pending';

export type ApiType = 
  | 'REST'
  | 'GraphQL'
  | 'REST + Webhooks'
  | 'gRPC'
  | 'SDK Only'
  | 'None'
  | 'Pending';

export type McpStatus = 
  | 'Official First-Party MCP Server'
  | 'Third-Party MCP Server'
  | 'Community-Maintained MCP Server'
  | 'No Verified MCP Server'
  | 'Unknown'
  | 'Native MCP Server'
  | 'Community MCP Available'
  | 'OpenAPI Spec Available'
  | 'No MCP Support'
  | 'Pending';

export type Buildability = 
  | 'High'
  | 'Medium'
  | 'Low'
  | 'Pending Research';

export type ResearchStatus = 
  | 'Completed'
  | 'In Progress'
  | 'Pending';

export type VerificationStatus = 
  | 'Verified'
  | 'Pending Review'
  | 'Flagged Discrepancy';

export interface EvidenceClaim {
  claim: string;
  url: string;
  supports: string;
  verificationMethod: string;
  isDocumentedFact: boolean; // false if inferred
  verificationStatus: 'Verified' | 'Not Verified' | 'Pending Review';
}

/**
 * Consistent research result schema matching FastAPI backend payloads
 */
export interface Application {
  id: string; // APP-001 to APP-100
  name: string;
  category: Category;
  url: string; // Original starting URL
  docsUrl: string;
  description: string;
  
  // Research & Verification Status
  researchStatus: ResearchStatus;
  verificationStatus: VerificationStatus;
  confidence: number; // 0.0 to 1.0 confidence score
  modelConfidence?: number;
  measuredVerificationAccuracy?: number;
  
  // Technical Evaluation Schema (FastAPI consistent)
  apiAvailable: boolean;
  apiType: ApiType;
  apiBreadth: 'Full / Extensive' | 'Core Endpoints' | 'Read-Only / Basic' | 'None' | 'Pending Research';
  authMethod: AuthMethod;
  authMethods: string[]; // List of supported auth mechanisms
  accessModel: ApiAccess; // Aliased to accessModel for backend consistency
  apiAccess: ApiAccess;
  mcpStatus: McpStatus;
  buildability: Buildability;
  
  // Detailed Capabilities
  toolCallingSupport: string; // e.g. "Full Structured Tool Calling", "Basic Actions", "None"
  webhooksSupport: boolean;
  sdkAvailability: string[]; // e.g. ["Python", "TypeScript"]
  rateLimits: string; // e.g. "5,000 req/hr", "Tiered", "Pending"
  pricingTierForApi: string;
  sandboxAvailable: boolean;
  
  // Blockers & Evidence
  integrationBlockers: string[]; // Standardized key for backend
  commonBlockers: string[]; // Retained for backwards compatibility
  evidenceUrls: string[]; // Official documentation & endpoint URLs audited
  auditedClaims?: EvidenceClaim[]; // Detailed evidence claims with verification audit trail
  
  // Summary & Special Notes
  agentSuitabilitySummary: string;
  specialResearchNotes?: string; // Special notes for Paygent Connect, NotebookLM, etc.
  lastResearched?: string;
  verifiedBy?: string;
  auditCorrection?: ApplicationAuditCorrection;
}

export interface AuditCorrectionItem {
  field: string;
  originalValue: any;
  correctedValue: any;
  reason: string;
  evidenceUrl: string;
}

export interface ApplicationAuditCorrection {
  isAudited: boolean;
  auditDate?: string;
  auditor?: string;
  claimsVerifiedCount?: number;
  claimsTotalCount?: number;
  corrections: AuditCorrectionItem[];
}

export interface ResearchStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  timestamp: string;
  category: 'Documentation' | 'Authentication' | 'MCP Evaluation' | 'Buildability Synthesis';
  details: string;
  findings?: string;
  codeSnippet?: string;
  confidenceScore?: number;
}

export interface VerificationItem {
  id: string;
  applicationId: string;
  applicationName: string;
  category: Category;
  aspect: 'API Access Verification' | 'OAuth Flow Inspection' | 'MCP Server Compatibility' | 'Rate Limits & Blockers' | 'Tool Calling Schema';
  status: 'Verified' | 'Pending Review' | 'Flagged Discrepancy';
  evidenceUrl: string;
  findings: string;
  auditorNotes: string;
  verifiedDate: string;
  auditor?: string;
}

export interface AuditedClaimItem {
  claimId: string;
  dimension: string;
  originalClaim: string;
  independentVerificationResult: string;
  evidenceUrl: string;
  status: 'Verified' | 'Incorrect' | 'Partially Verified' | 'Unable to Verify';
  explanation: string;
  suggestedCorrection: string;
  humanReviewDecision?: 'Approved' | 'Rejected' | 'Pending';
  mcpDetails?: {
    implementationType: 'Server' | 'Toolkit' | 'SDK' | 'Integration' | 'None';
    ownership: 'Official First-Party' | 'Third-Party' | 'Community-Maintained' | 'None';
    repoName?: string;
    repoUrl?: string;
    maintenanceStatus?: string;
  };
}

export interface ApplicationAuditItem {
  applicationId: string;
  applicationName: string;
  category: Category;
  claimsChecked: number;
  verified: number;
  partiallyVerified: number;
  incorrect: number;
  unableToVerify: number;
  accuracy: number;
  claims: AuditedClaimItem[];
}

export interface VerificationDossier {
  auditDate: string;
  totalApplicationsAudited: number;
  totalClaimsChecked: number;
  claimsVerified: number;
  claimsPartiallyVerified: number;
  claimsIncorrect: number;
  claimsUnverifiable: number;
  rawAccuracyPercentage: number;
  strictRawAccuracy?: number;
  partiallyVerifiedRate?: number;
  incorrectRate?: number;
  unverifiableRate?: number;
  adjustedAccuracyPercentage: number;
  experimentalWeightedScore: number;
  experimentalScoreExplanation: string;
  accuracyFormula: string;
  methodology: string;
  applications: ApplicationAuditItem[];
}

export interface HumanClaimDecision {
  decision: 'Approved' | 'Rejected';
  timestamp: string;
  reviewer: string;
  notes?: string;
}

export type StoredClaimDecisions = Record<string, HumanClaimDecision>;

export interface IntegrationBlockerStat {
  blocker: string;
  count: number;
  impactLevel: 'High' | 'Medium' | 'Low';
  affectedCategories: string[];
}
