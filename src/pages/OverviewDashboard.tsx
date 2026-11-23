import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  Ban,
  Activity,
  FileCode,
  Zap,
  ChevronRight,
  Eye,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { Application } from '../types';
import { sampleBenchmarkStats, commonBlockersList } from '../data/mockData';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';
import { PageId } from '../components/common/Sidebar';

interface OverviewDashboardProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
  onNavigatePage: (page: PageId) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  applications,
  onSelectApplication,
  onNavigatePage
}) => {
  // Mode toggle: 'actual' (ground truth initially 0) vs 'demo' (clearly labelled sample benchmark preview)
  const [dataMode, setDataMode] = useState<'actual' | 'demo'>('actual');

  // Actual Ground-Truth Metrics
  const totalApps = applications.length; // Always 100
  const actualResearched = applications.filter(a => a.researchStatus === 'Completed').length;
  const actualVerified = applications.filter(a => a.verificationStatus === 'Verified').length;
  const actualSelfServe = applications.filter(a => a.researchStatus === 'Completed' && a.apiAccess === 'Self-Serve').length;
  const actualGated = applications.filter(a => a.researchStatus === 'Completed' && (a.apiAccess === 'Gated / Enterprise Approval' || a.apiAccess === 'Waitlist / Contact Sales')).length;
  const actualHighBuild = applications.filter(a => a.researchStatus === 'Completed' && a.buildability === 'High').length;
  const actualMediumBuild = applications.filter(a => a.researchStatus === 'Completed' && a.buildability === 'Medium').length;
  const actualLowBuild = applications.filter(a => a.researchStatus === 'Completed' && a.buildability === 'Low').length;

  // Selected display metrics based on mode
  const isDemo = dataMode === 'demo';
  const displayResearched = isDemo ? sampleBenchmarkStats.researchedCount : actualResearched;
  const displayVerified = isDemo ? sampleBenchmarkStats.verifiedCount : actualVerified;
  const displaySelfServe = isDemo ? sampleBenchmarkStats.selfServeCount : actualSelfServe;
  const displayGated = isDemo ? sampleBenchmarkStats.gatedCount : actualGated;
  const displayHighBuild = isDemo ? sampleBenchmarkStats.highBuildability : actualHighBuild;
  const displayMedBuild = isDemo ? sampleBenchmarkStats.mediumBuildability : actualMediumBuild;
  const displayLowBuild = isDemo ? sampleBenchmarkStats.lowBuildability : actualLowBuild;

  // CHART 1: Applications by the original 10 categories (Always factual from 100 apps)
  const categoryCounts: { [key: string]: number } = {};
  applications.forEach(a => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });
  const categoryChartData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat.length > 20 ? cat.substring(0, 18) + '...' : cat,
    fullName: cat,
    count
  }));

  // CHART 2: Authentication method distribution
  const authChartData = isDemo 
    ? sampleBenchmarkStats.authDistribution 
    : (actualResearched > 0 
        ? [
            { name: 'OAuth2', value: applications.filter(a => a.researchStatus === 'Completed' && a.authMethod === 'OAuth2').length, color: '#143826' },
            { name: 'API Key', value: applications.filter(a => a.researchStatus === 'Completed' && a.authMethod === 'API Key').length, color: '#C59A27' },
            { name: 'OAuth2 & API Key', value: applications.filter(a => a.researchStatus === 'Completed' && a.authMethod === 'OAuth2 & API Key').length, color: '#2D6A4F' },
            { name: 'Basic Auth', value: applications.filter(a => a.researchStatus === 'Completed' && a.authMethod === 'Basic Auth').length, color: '#C85A32' },
          ].filter(d => d.value > 0)
        : [{ name: 'Pending Research', value: 100, color: '#718079' }]
      );

  // CHART 3: Self-serve vs gated API access
  const accessChartData = isDemo
    ? sampleBenchmarkStats.accessDistribution
    : (actualResearched > 0
        ? [
            { name: 'Self-Serve', value: actualSelfServe, color: '#143826' },
            { name: 'Gated / Approval', value: actualGated, color: '#C85A32' },
            { name: 'No Public API', value: applications.filter(a => a.researchStatus === 'Completed' && a.apiAccess === 'No Public API').length, color: '#718079' }
          ].filter(d => d.value > 0)
        : [{ name: 'Pending Research', value: 100, color: '#718079' }]
      );

  // CHART 4: API availability and type
  const apiTypeChartData = isDemo
    ? sampleBenchmarkStats.apiTypeDistribution
    : (actualResearched > 0
        ? [
            { name: 'REST + Webhooks', count: applications.filter(a => a.researchStatus === 'Completed' && a.apiType === 'REST + Webhooks').length, fill: '#143826' },
            { name: 'REST', count: applications.filter(a => a.researchStatus === 'Completed' && a.apiType === 'REST').length, fill: '#2D6A4F' },
            { name: 'GraphQL', count: applications.filter(a => a.researchStatus === 'Completed' && a.apiType === 'GraphQL').length, fill: '#C59A27' },
            { name: 'No Public API', count: applications.filter(a => a.researchStatus === 'Completed' && a.apiType === 'None').length, fill: '#718079' }
          ].filter(d => d.count > 0)
        : [{ name: 'Pending Research', count: 100, fill: '#718079' }]
      );

  // CHART 5: MCP availability
  const mcpChartData = isDemo
    ? sampleBenchmarkStats.mcpDistribution
    : (actualResearched > 0
        ? [
            { name: 'Native MCP Server', count: applications.filter(a => a.researchStatus === 'Completed' && a.mcpStatus === 'Native MCP Server').length, fill: '#143826' },
            { name: 'Community MCP', count: applications.filter(a => a.researchStatus === 'Completed' && a.mcpStatus === 'Community MCP Available').length, fill: '#C59A27' },
            { name: 'OpenAPI Spec', count: applications.filter(a => a.researchStatus === 'Completed' && a.mcpStatus === 'OpenAPI Spec Available').length, fill: '#2D6A4F' },
            { name: 'No MCP Support', count: applications.filter(a => a.researchStatus === 'Completed' && a.mcpStatus === 'No MCP Support').length, fill: '#C85A32' }
          ].filter(d => d.count > 0)
        : [{ name: 'Pending Research', count: 100, fill: '#718079' }]
      );

  // CHART 6: Buildability distribution
  const buildabilityChartData = isDemo
    ? sampleBenchmarkStats.buildabilityDistribution
    : (actualResearched > 0
        ? [
            { name: 'High Buildability', count: actualHighBuild, fill: '#143826' },
            { name: 'Medium Buildability', count: actualMediumBuild, fill: '#C59A27' },
            { name: 'Low Buildability', count: actualLowBuild, fill: '#C85A32' },
          ]
        : [{ name: 'Pending Research', count: 100, fill: '#718079' }]
      );

  // CHART 7: Common integration blockers
  const blockersChartData = isDemo
    ? commonBlockersList.map(b => ({
        name: b.blocker.length > 28 ? b.blocker.substring(0, 26) + '...' : b.blocker,
        fullName: b.blocker,
        count: b.count,
        impact: b.impactLevel
      }))
    : (actualResearched > 0
        ? commonBlockersList.slice(0, 3).map(b => ({
            name: b.blocker.length > 28 ? b.blocker.substring(0, 26) + '...' : b.blocker,
            fullName: b.blocker,
            count: Math.min(b.count, actualResearched),
            impact: b.impactLevel
          }))
        : [{ name: 'Pending Research', fullName: 'Awaiting Completed Research', count: 0, impact: 'Low' }]
      );

  return (
    <div className="space-y-6 pb-12">
      {/* Heritage Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-heritage-green-900 via-heritage-green-800 to-heritage-green-900 text-white p-6 md:p-8 shadow-heritage-lg border border-heritage-gold/40 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C59A27_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-heritage-green-950/60 border border-heritage-gold/40 text-heritage-gold text-xs font-semibold">
              <JaaliMotif size={16} />
              <span>AI Application Research & Agent Readiness Platform</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide text-heritage-ivory">
              Application Research Dashboard
            </h1>
            <p className="text-sm text-heritage-green-100 leading-relaxed font-sans">
              Investigating 100 software applications across 10 categories to evaluate readiness for AI agent tool integration, OAuth authentication, and Model Context Protocol (MCP) server support.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigatePage('agent')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-heritage-gold text-heritage-green-950 hover:bg-heritage-gold-light font-semibold text-xs shadow-gold-glow transition-all"
            >
              <Sparkles className="w-4 h-4 text-heritage-green-900" />
              <span>Launch Research Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigatePage('explorer')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-heritage-green-950/70 hover:bg-heritage-green-950 text-heritage-ivory border border-heritage-gold/30 font-medium text-xs transition-all"
            >
              <Layers className="w-4 h-4 text-heritage-gold" />
              <span>Explore All 100 Applications</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Actual Findings vs Demonstration Benchmark Preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-heritage-gold shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-heritage-green-900">Data View Mode: </span>
            {isDemo ? (
              <span className="text-amber-800 font-medium">
                Demonstration Benchmark Preview (Clearly Labelled Sample Data — Not Actual Findings)
              </span>
            ) : (
              <span className="text-emerald-800 font-medium">
                Live Actual Research Findings (Ground Truth: {actualResearched} Researched, {actualVerified} Verified)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-heritage-sandstone/70 p-1 rounded-xl border border-heritage-border text-xs">
          <button
            onClick={() => setDataMode('actual')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              !isDemo 
                ? 'bg-heritage-green-900 text-white shadow-sm' 
                : 'text-heritage-muted hover:text-heritage-green-900'
            }`}
          >
            Actual Research ({actualResearched})
          </button>
          <button
            onClick={() => setDataMode('demo')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              isDemo 
                ? 'bg-amber-600 text-white shadow-sm' 
                : 'text-heritage-muted hover:text-heritage-green-900'
            }`}
          >
            Sample Demo Preview
          </button>
        </div>
      </div>

      {!isDemo && actualResearched === 0 && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Zero Research Completed:</strong> All 100 applications are currently in <em>Pending Research</em> status. No sample data is displayed as actual findings. Launch the <strong>AI Research Agent</strong> to begin live evaluation, or toggle to <strong>Sample Demo Preview</strong> above to preview analytical charts.
            </span>
          </div>
          <button
            onClick={() => onNavigatePage('agent')}
            className="px-3 py-1.5 rounded-lg bg-heritage-green-900 text-white font-semibold shrink-0 text-xs hover:bg-heritage-green-800"
          >
            Run Research Agent
          </button>
        </div>
      )}

      {isDemo && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Demonstration Preview Mode Active:</strong> Charts and metrics below display analytical sample benchmark data for UI inspection. Switch to "Actual Research" to view live unresearched ground truth.
          </span>
        </div>
      )}

      {/* 8 Required Dashboard Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-serif font-bold text-base text-heritage-green-900">
            Portfolio Research & Readiness Metrics
          </h2>
          <span className="text-xs text-heritage-muted">
            {isDemo ? 'Sample Demo Baseline' : 'Live Research Ground Truth'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* Metric 1: Total Applications */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-heritage-green-800 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              1. Total Apps
            </div>
            <div className="text-2xl font-serif font-bold text-heritage-green-900 mt-1">
              {totalApps}
            </div>
            <div className="text-[10px] text-heritage-slate mt-0.5 truncate">
              10 Categories
            </div>
          </HeritageCard>

          {/* Metric 2: Research Completed */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-heritage-gold p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              2. Researched
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-amber-800' : (displayResearched > 0 ? 'text-emerald-800' : 'text-heritage-muted')}`}>
              {displayResearched}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : (displayResearched > 0 ? 'Actual Completed' : 'Pending (0)')}
            </div>
          </HeritageCard>

          {/* Metric 3: Verified Applications */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-emerald-700 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              3. Verified
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-amber-800' : (displayVerified > 0 ? 'text-emerald-800' : 'text-heritage-muted')}`}>
              {displayVerified}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : (displayVerified > 0 ? 'Human Attested' : 'Pending (0)')}
            </div>
          </HeritageCard>

          {/* Metric 4: Self-Serve API Access */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-heritage-green-700 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              4. Self-Serve
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-heritage-green-900' : (displaySelfServe > 0 ? 'text-heritage-green-900' : 'text-heritage-muted')}`}>
              {displaySelfServe}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : 'Researched Count'}
            </div>
          </HeritageCard>

          {/* Metric 5: Gated API Access */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-heritage-terracotta p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              5. Gated API
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-heritage-terracotta' : (displayGated > 0 ? 'text-heritage-terracotta' : 'text-heritage-muted')}`}>
              {displayGated}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : 'Researched Count'}
            </div>
          </HeritageCard>

          {/* Metric 6: High Buildability */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-emerald-800 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              6. High Build
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-emerald-800' : (displayHighBuild > 0 ? 'text-emerald-800' : 'text-heritage-muted')}`}>
              {displayHighBuild}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : 'Researched Count'}
            </div>
          </HeritageCard>

          {/* Metric 7: Medium Buildability */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-amber-600 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              7. Med Build
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-amber-700' : (displayMedBuild > 0 ? 'text-amber-700' : 'text-heritage-muted')}`}>
              {displayMedBuild}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : 'Researched Count'}
            </div>
          </HeritageCard>

          {/* Metric 8: Low Buildability */}
          <HeritageCard hoverEffect={false} className="border-t-3 border-t-rose-700 p-3">
            <div className="text-[10px] text-heritage-muted uppercase font-serif font-semibold truncate">
              8. Low Build
            </div>
            <div className={`text-2xl font-serif font-bold mt-1 ${isDemo ? 'text-rose-700' : (displayLowBuild > 0 ? 'text-rose-700' : 'text-heritage-muted')}`}>
              {displayLowBuild}
            </div>
            <div className="text-[10px] text-heritage-muted mt-0.5 truncate">
              {isDemo ? 'Demo Count' : 'Researched Count'}
            </div>
          </HeritageCard>
        </div>
      </div>

      {/* 7 Required Visual Analytics Charts */}

      {/* Row 1: Chart 1 (Category Breakdown) & Chart 2 (Auth Methods) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 1: Applications by the original 10 categories (7 cols) */}
        <div className="lg:col-span-7 bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                1. Applications by the Original 10 Categories
              </h3>
              <p className="text-xs text-heritage-muted">
                100 applications cataloged across the required Composio ecosystem categories (10 each)
              </p>
            </div>
            <HeritageBadge variant="forest">10 per Category</HeritageBadge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
                <XAxis 
                  dataKey="name" 
                  angle={-35} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{ fontSize: 10, fill: '#718079' }} 
                />
                <YAxis tick={{ fontSize: 10, fill: '#718079' }} domain={[0, 12]} allowDecimals={false} />
                <Tooltip 
                  formatter={(val: any, name: any, props: any) => [`${val} Applications`, props.payload.fullName]}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#143826" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Authentication method distribution (5 cols) */}
        <div className="lg:col-span-5 bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                2. Authentication Method Distribution
              </h3>
              <p className="text-xs text-heritage-muted">
                OAuth2 vs API Key vs Basic Auth token requirements
              </p>
            </div>
            {isDemo && <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge>}
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={authChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {authChartData.map((entry, idx) => (
                    <Cell key={`auth-cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Count']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-heritage-border text-[11px]">
            {authChartData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-heritage-charcoal truncate">{d.name}:</span>
                <span className="font-bold text-heritage-green-900 ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Chart 3 (Self-Serve vs Gated Access) & Chart 4 (API Availability and Type) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 3: Self-serve vs gated API access (5 cols) */}
        <div className="lg:col-span-5 bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                3. Self-Serve vs Gated API Access
              </h3>
              <p className="text-xs text-heritage-muted">
                Developer self-onboarding vs enterprise manual approval gate
              </p>
            </div>
            {isDemo && <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge>}
          </div>

          <div className="h-48 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accessChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {accessChartData.map((entry, idx) => (
                    <Cell key={`access-cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Access Type']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-heritage-border text-[11px]">
            {accessChartData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-heritage-charcoal truncate">{d.name}:</span>
                <span className="font-bold text-heritage-green-900 ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CHART 4: API availability and type (7 cols) */}
        <div className="lg:col-span-7 bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                4. API Availability and Architecture Type
              </h3>
              <p className="text-xs text-heritage-muted">
                REST + Webhooks, pure REST, GraphQL schemas, and gRPC endpoints
              </p>
            </div>
            {isDemo ? <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge> : <HeritageBadge variant="gold">Protocol Spread</HeritageBadge>}
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={apiTypeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#718079' }} />
                <YAxis tick={{ fontSize: 10, fill: '#718079' }} allowDecimals={false} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Count']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {apiTypeChartData.map((entry, index) => (
                    <Cell key={`api-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Chart 5 (MCP Availability) & Chart 6 (Buildability Distribution) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHART 5: MCP availability */}
        <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                5. Model Context Protocol (MCP) Availability
              </h3>
              <p className="text-xs text-heritage-muted">
                Native MCP servers, community-authored servers, and OpenAPI specs
              </p>
            </div>
            {isDemo ? <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge> : <HeritageBadge variant="forest">Agent Ecosystem</HeritageBadge>}
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mcpChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#718079' }} />
                <YAxis tick={{ fontSize: 10, fill: '#718079' }} allowDecimals={false} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Count']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {mcpChartData.map((entry, index) => (
                    <Cell key={`mcp-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 6: Buildability distribution */}
        <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
                6. Buildability Distribution for AI Agents
              </h3>
              <p className="text-xs text-heritage-muted">
                Readiness tier determining effort to build autonomous agent tool integration
              </p>
            </div>
            {isDemo ? <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge> : <HeritageBadge variant="neutral">Integration Effort</HeritageBadge>}
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={buildabilityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#718079' }} />
                <YAxis tick={{ fontSize: 10, fill: '#718079' }} allowDecimals={false} />
                <Tooltip 
                  formatter={(val: any) => [`${val} Applications`, 'Count']}
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {buildabilityChartData.map((entry, index) => (
                    <Cell key={`build-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 4: Chart 7 (Common Integration Blockers) */}
      <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-heritage-green-900">
              7. Common Integration Blockers Across Applications
            </h3>
            <p className="text-xs text-heritage-muted">
              Frequency of key obstacles preventing seamless agent tool-calling execution
            </p>
          </div>
          {isDemo ? <HeritageBadge variant="terracotta">DEMO PREVIEW</HeritageBadge> : <HeritageBadge variant="neutral">Friction Points</HeritageBadge>}
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical" 
              data={blockersChartData} 
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <XAxis type="number" tick={{ fontSize: 10, fill: '#718079' }} />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 10, fill: '#143826', width: 140 }} 
                width={150} 
              />
              <Tooltip 
                formatter={(val: any, name: any, props: any) => [`${val} Applications affected`, props.payload.fullName]}
                contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#C59A27', borderRadius: '8px', fontSize: '12px' }}
              />
              <Bar dataKey="count" fill="#C85A32" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
