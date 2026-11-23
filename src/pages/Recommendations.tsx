import React, { useState } from 'react';
import {
  Compass,
  TrendingUp,
  Zap,
  Layers,
  CheckCircle2,
  Sparkles,
  Download,
  Clock,
  DollarSign,
  BarChart3,
  Calendar,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { applications } from '../data/mockData';
import { Application } from '../types';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';

interface RecommendationsProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  applications,
  onSelectApplication
}) => {
  const [reportExported, setReportExported] = useState(false);

  // Categorize applications into 3 integration waves
  const wave1Apps = applications.filter(a => a.buildability === 'High' && a.apiAccess === 'Self-Serve');
  const wave2Apps = applications.filter(a => a.buildability === 'Medium' || (a.buildability === 'High' && a.apiAccess !== 'Self-Serve'));
  const wave3Apps = applications.filter(a => a.buildability === 'Low');

  const handleExportReport = () => {
    setReportExported(true);
    setTimeout(() => setReportExported(false), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-heritage-parchment p-6 rounded-2xl border border-heritage-border shadow-heritage-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-heritage-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-heritage-sandstoneDark/60 border border-heritage-gold/40 text-heritage-green-900 text-xs font-semibold">
              <JaaliMotif size={14} className="text-heritage-gold" />
              <span>AI Agent Buildability & Integration Playbook</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-heritage-green-900">
              Recommendations & Deployment Waves
            </h1>
            <p className="text-xs text-heritage-slate max-w-2xl leading-relaxed">
              Prioritized execution roadmap sequencing 100 applications by developer accessibility, Model Context Protocol (MCP) tool support, and blocker remediation strategies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-heritage-green-800 hover:bg-heritage-green-900 text-white font-semibold text-xs shadow-sm border border-heritage-gold/30 transition-all hover:shadow-green-glow"
            >
              <Download className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Export Integration Strategy</span>
            </button>
          </div>
        </div>
      </div>

      {reportExported && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Strategic AI Agent Integration Playbook generated and exported successfully.</span>
        </div>
      )}
      {/* 3 Integration Deployment Waves */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wave 1 */}
        <div className="bg-heritage-parchment rounded-xl border border-heritage-gold/60 p-5 shadow-heritage-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-base text-heritage-green-900">Wave 1: Immediate Wins</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
              {wave1Apps.length} Apps
            </span>
          </div>

          <p className="text-xs text-heritage-slate leading-relaxed">
            Self-serve API access, instant API keys or straightforward OAuth2, and native or community MCP server availability.
          </p>

          <div className="space-y-2 pt-2 border-t border-heritage-border text-xs">
            <span className="text-[10px] text-heritage-muted uppercase font-serif font-bold block">Prime Candidates:</span>
            <div className="flex flex-wrap gap-1.5">
              {wave1Apps.slice(0, 10).map(app => (
                <span
                  key={app.id}
                  onClick={() => onSelectApplication(app)}
                  className="px-2 py-1 rounded-lg bg-heritage-sandstone/70 border border-heritage-border text-heritage-green-900 hover:bg-heritage-gold/20 cursor-pointer text-[11px] font-medium"
                >
                  {app.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave 2 */}
        <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-base text-heritage-green-900">Wave 2: OAuth Wrappers</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {wave2Apps.length} Apps
            </span>
          </div>

          <p className="text-xs text-heritage-slate leading-relaxed">
            High-value business systems requiring OAuth2 refresh token daemons, OpenAPI converter scripts, or tenant-scoped routing.
          </p>

          <div className="space-y-2 pt-2 border-t border-heritage-border text-xs">
            <span className="text-[10px] text-heritage-muted uppercase font-serif font-bold block">Key Systems:</span>
            <div className="flex flex-wrap gap-1.5">
              {wave2Apps.slice(0, 10).map(app => (
                <span
                  key={app.id}
                  onClick={() => onSelectApplication(app)}
                  className="px-2 py-1 rounded-lg bg-heritage-sandstone/70 border border-heritage-border text-heritage-green-900 hover:bg-heritage-gold/20 cursor-pointer text-[11px] font-medium"
                >
                  {app.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave 3 */}
        <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-base text-heritage-green-900">Wave 3: Gated & Custom</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
              {wave3Apps.length} Apps
            </span>
          </div>

          <p className="text-xs text-heritage-slate leading-relaxed">
            Gated behind enterprise sales contracts, manual partner app review, or lacking official public APIs.
          </p>

          <div className="space-y-2 pt-2 border-t border-heritage-border text-xs">
            <span className="text-[10px] text-heritage-muted uppercase font-serif font-bold block">Gated Systems:</span>
            <div className="flex flex-wrap gap-1.5">
              {wave3Apps.slice(0, 10).map(app => (
                <span
                  key={app.id}
                  onClick={() => onSelectApplication(app)}
                  className="px-2 py-1 rounded-lg bg-heritage-sandstone/70 border border-heritage-border text-rose-900 hover:bg-rose-50 cursor-pointer text-[11px] font-medium"
                >
                  {app.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Blockers Mitigation Guide */}
      <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-6 shadow-heritage-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-heritage-green-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-heritage-gold" />
          Technical Mitigation Patterns for Common Agent Blockers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-heritage-sandstone/50 border border-heritage-border space-y-2">
            <div className="font-bold text-heritage-green-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Missing Webhooks Pattern
            </div>
            <p className="text-heritage-slate leading-relaxed text-[11px]">
              Deploy lightweight asynchronous worker with jittered exponential backoff to poll target REST endpoints and dispatch synthetic webhooks into agent execution loops.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-heritage-sandstone/50 border border-heritage-border space-y-2">
            <div className="font-bold text-heritage-green-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Token Expiration & Refresh
            </div>
            <p className="text-heritage-slate leading-relaxed text-[11px]">
              Implement centralized Redis token storage with automated background refresh triggers fired 5 minutes prior to OAuth token expiration to prevent mid-workflow agent failures.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-heritage-sandstone/50 border border-heritage-border space-y-2">
            <div className="font-bold text-heritage-green-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Rate Limit Throttling
            </div>
            <p className="text-heritage-slate leading-relaxed text-[11px]">
              Wrap client SDK calls with a token-bucket rate limiter that reads HTTP 429 headers and automatically pauses queue execution until the retry-after window elapses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};