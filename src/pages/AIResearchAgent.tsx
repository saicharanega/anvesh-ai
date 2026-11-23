import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  Clock, 
  Code2, 
  ShieldCheck, 
  FileText, 
  Download, 
  Layers, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { Application, ResearchStep } from '../types';
import { initialResearchSteps } from '../data/mockData';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';

interface AIResearchAgentProps {
  applications: Application[];
  selectedApp?: Application;
  onNavigateToVerification?: () => void;
  onUpdateAppResearch?: (appId: string) => void;
}

export const AIResearchAgent: React.FC<AIResearchAgentProps> = ({
  applications,
  selectedApp,
  onNavigateToVerification,
  onUpdateAppResearch
}) => {
  const [currentAppId, setCurrentAppId] = useState<string>(selectedApp ? selectedApp.id : 'APP-061'); // GitHub default
  const [researchGoal, setResearchGoal] = useState<string>(
    "Inspect official documentation, analyze OAuth2 scopes and rate limits, and evaluate Model Context Protocol (MCP) tool-calling readiness."
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState<ResearchStep[]>(initialResearchSteps);
  const [expandedStep, setExpandedStep] = useState<string | null>('step-2');
  const [researchCompleteMessage, setResearchCompleteMessage] = useState<string | null>(null);

  const currentApp = applications.find(a => a.id === currentAppId) || applications[0];

  const presets = [
    {
      appId: "APP-061",
      title: "GitHub API & MCP Analysis",
      goal: "Analyze GitHub REST and GraphQL API, Personal Access Token permissions, rate limits, and official GitHub MCP server."
    },
    {
      appId: "APP-021",
      title: "Slack Bot Token & Scopes",
      goal: "Evaluate Slack Web API, bot versus user OAuth scopes, Socket Mode vs Webhooks, and native Slack MCP server compatibility."
    },
    {
      appId: "APP-081",
      title: "Stripe Agent Toolkit & Webhooks",
      goal: "Investigate Stripe API key model, idempotency key enforcement, webhook signing verification, and official Stripe Agent Toolkit."
    },
    {
      appId: "APP-001",
      title: "Salesforce Connected App Gating",
      goal: "Inspect Salesforce REST API, Connected App authorization prerequisites, permission set gating, and community MCP servers."
    }
  ];

  const handleRunAgent = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setResearchCompleteMessage(`Research successfully completed for ${currentApp.name}. Evaluated API endpoints, auth mechanisms, and MCP readiness.`);
      if (onUpdateAppResearch) {
        onUpdateAppResearch(currentApp.id);
      }
      setTimeout(() => setResearchCompleteMessage(null), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="bg-heritage-parchment p-6 rounded-2xl border border-heritage-border shadow-heritage-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-heritage-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-heritage-green-50 border border-heritage-green-200 text-heritage-green-800 text-xs font-semibold">
              <JaaliMotif size={14} className="text-heritage-gold" />
              <span>Autonomous Documentation & API Auditor</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-heritage-green-900">
              AI Research Agent Console
            </h1>
            <p className="text-xs text-heritage-slate max-w-2xl leading-relaxed">
              Autonomous inquiry engine for inspecting developer portals, OpenAPI specifications, authentication schemes, and Model Context Protocol (MCP) server support for AI agent integration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 font-mono">Agent Engine Ready</span>
          </div>
        </div>
      </div>

      {researchCompleteMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{researchCompleteMessage}</span>
        </div>
      )}

      {/* Preset Scenarios Ribbon */}
      <div className="space-y-2">
        <span className="text-[11px] font-serif font-semibold text-heritage-muted uppercase tracking-wider block">
          Preset Integration Inquiries:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((preset) => (
            <button
              key={preset.appId}
              onClick={() => {
                setCurrentAppId(preset.appId);
                setResearchGoal(preset.goal);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                currentAppId === preset.appId
                  ? 'bg-heritage-sandstone border-heritage-gold shadow-sm'
                  : 'bg-heritage-parchment border-heritage-border hover:bg-heritage-sandstone/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-heritage-muted font-mono mb-1">
                <span>{preset.appId}</span>
                <span className="text-heritage-green-800 font-semibold">Select</span>
              </div>
              <div className="font-semibold text-xs text-heritage-green-900 line-clamp-1">
                {preset.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Agent Control Panel */}
      <div className="bg-heritage-parchment p-5 rounded-xl border border-heritage-border shadow-heritage-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Target App */}
          <div>
            <label className="block text-[11px] font-semibold text-heritage-muted uppercase mb-1">Target Application</label>
            <select
              value={currentAppId}
              onChange={(e) => setCurrentAppId(e.target.value)}
              className="w-full py-2 px-3 rounded-xl text-xs bg-heritage-sandstone/50 border border-heritage-border text-heritage-charcoal font-medium focus:outline-none focus:border-heritage-gold"
            >
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.id} - {app.name} ({app.category})
                </option>
              ))}
            </select>
          </div>

          {/* Research Depth */}
          <div>
            <label className="block text-[11px] font-semibold text-heritage-muted uppercase mb-1">Evaluation Scope</label>
            <select
              defaultValue="Full"
              className="w-full py-2 px-3 rounded-xl text-xs bg-heritage-sandstone/50 border border-heritage-border text-heritage-charcoal font-medium focus:outline-none focus:border-heritage-gold"
            >
              <option value="Full">Full (Docs, Auth, MCP, Rate Limits, Tool Calling)</option>
              <option value="MCP">MCP Server Focus (JSON-RPC 2.0 & OpenAPI)</option>
              <option value="Auth">Authentication & Access Gating Focus</option>
            </select>
          </div>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block text-[11px] font-semibold text-heritage-muted uppercase mb-1">Research Directives</label>
          <textarea
            rows={2}
            value={researchGoal}
            onChange={(e) => setResearchGoal(e.target.value)}
            placeholder="Direct the research agent on specific endpoints or auth schemas..."
            className="w-full p-3 rounded-xl text-xs bg-heritage-sandstone/30 border border-heritage-border focus:outline-none focus:border-heritage-gold focus:bg-white text-heritage-charcoal"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-1">
          <div className="text-xs text-heritage-muted">
            Targeting: <strong className="text-heritage-green-900">{currentApp.name}</strong> ({currentApp.category})
          </div>

          <button
            onClick={handleRunAgent}
            disabled={isExecuting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-heritage-green-900 hover:bg-heritage-green-950 text-heritage-ivory text-xs font-semibold shadow-sm border border-heritage-gold/40 transition-all hover:shadow-green-glow disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-heritage-gold" />
                <span>Auditing Developer Documentation...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-heritage-gold fill-heritage-gold" />
                <span>Run Autonomous Research</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Execution Trace Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-heritage-green-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-heritage-gold" />
            Agent Execution & Reasoning Trace (4 Phases Completed)
          </h3>
          <span className="text-xs text-heritage-muted font-mono">Execution Time: 1.28s</span>
        </div>

        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isExpanded = expandedStep === step.id;
            return (
              <div 
                key={step.id} 
                className="bg-heritage-parchment rounded-xl border border-heritage-border shadow-heritage-sm overflow-hidden"
              >
                <div 
                  onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-heritage-sandstone/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-heritage-green-900">{step.title}</span>
                        <HeritageBadge variant="forest">{step.category}</HeritageBadge>
                      </div>
                      <p className="text-[11px] text-heritage-slate mt-0.5">{step.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {Math.round((step.confidenceScore || 0.95) * 100)}% Confidence
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-heritage-muted" /> : <ChevronDown className="w-4 h-4 text-heritage-muted" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-heritage-border/60 bg-heritage-sandstone/30 space-y-3 text-xs">
                    {step.findings && (
                      <div className="p-3 rounded-lg bg-heritage-parchment border border-heritage-border/80">
                        <span className="text-[10px] text-heritage-muted uppercase font-serif block mb-1">
                          Key Evaluation Finding
                        </span>
                        <p className="text-heritage-charcoal leading-relaxed text-[11px]">
                          {step.findings}
                        </p>
                      </div>
                    )}

                    {step.codeSnippet && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-heritage-muted uppercase font-serif">
                          <span>Payload & Header Verification</span>
                          <span className="font-mono text-heritage-terracotta">HTTP Schema</span>
                        </div>
                        <pre className="p-3 rounded-lg bg-heritage-green-950 text-heritage-gold-light font-mono text-[11px] overflow-x-auto leading-relaxed border border-heritage-gold/30">
                          {step.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Synthesis Output Dossier Card */}
      <div className="p-5 rounded-2xl bg-heritage-sandstone/70 border border-heritage-gold/50 shadow-heritage-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-serif font-bold text-base text-heritage-green-900">
              Agent Readiness Evaluation Dossier: {currentApp.name}
            </h4>
            <p className="text-xs text-heritage-muted">
              Evaluated and formatted for human-in-the-loop verification
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToVerification}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-heritage-green-800 hover:bg-heritage-green-900 text-white font-semibold text-xs shadow-sm border border-heritage-gold/30 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Verify Findings in Verification Center</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border text-xs space-y-2">
          <div className="font-semibold text-heritage-green-900">Synthesis Summary:</div>
          <p className="text-heritage-slate leading-relaxed">
            <strong className="text-heritage-charcoal">{currentApp.name}</strong> displays <strong>{currentApp.buildability} Buildability</strong> for AI agent integration. API access model is <strong>{currentApp.apiAccess}</strong> with <strong>{currentApp.authMethod}</strong> authentication. MCP server availability is currently <strong>{currentApp.mcpStatus}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
