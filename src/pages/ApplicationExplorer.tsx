import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download, 
  ExternalLink, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  Server,
  Layers,
  CheckCircle,
  Eye,
  BookOpen,
  Info
} from 'lucide-react';
import { Application, Category, Buildability, ApiAccess, AuthMethod, McpStatus, ResearchStatus, VerificationStatus } from '../types';
import { correctedApplications } from '../data/mockData';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';

interface ApplicationExplorerProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
  initialSearchQuery?: string;
}

export const ApplicationExplorer: React.FC<ApplicationExplorerProps> = ({
  applications,
  onSelectApplication,
  initialSearchQuery = ''
}) => {
  // Dataset View Toggle: 'original' (100 first-pass research records) vs 'corrected' (10 audited & corrected records)
  const [datasetView, setDatasetView] = useState<'original' | 'corrected'>('original');

  const activeApps = useMemo(() => {
    return datasetView === 'corrected' ? correctedApplications : applications;
  }, [datasetView, applications]);

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBuildability, setSelectedBuildability] = useState<string>('All');
  const [selectedApiAccess, setSelectedApiAccess] = useState<string>('All');
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>('All');
  const [selectedResearchStatus, setSelectedResearchStatus] = useState<string>('All');
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'build_desc'>('id');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Extract distinct categories
  const categories = useMemo(() => {
    const list = Array.from(new Set(activeApps.map(a => a.category)));
    return ['All', ...list];
  }, [activeApps]);

  // Filter and Sort Applications
  const filteredApps = useMemo(() => {
    return activeApps
      .filter(app => {
        // Search Term match (by name, ID, category, or auth)
        if (searchTerm.trim() !== '') {
          const q = searchTerm.toLowerCase();
          const matchId = app.id.toLowerCase().includes(q);
          const matchName = app.name.toLowerCase().includes(q);
          const matchCategory = app.category.toLowerCase().includes(q);
          const matchAuth = app.authMethod.toLowerCase().includes(q);
          const matchApiType = app.apiType.toLowerCase().includes(q);

          if (!matchId && !matchName && !matchCategory && !matchAuth && !matchApiType) {
            return false;
          }
        }

        // 1. Category filter
        if (selectedCategory !== 'All' && app.category !== selectedCategory) return false;

        // 2. Buildability filter
        if (selectedBuildability !== 'All' && app.buildability !== selectedBuildability) return false;

        // 3. Self-serve / Gated access filter
        if (selectedApiAccess !== 'All' && app.apiAccess !== selectedApiAccess) return false;

        // 4. Authentication filter
        if (selectedAuthMethod !== 'All' && !app.authMethod.includes(selectedAuthMethod)) return false;

        // 5. Research status filter
        if (selectedResearchStatus !== 'All' && app.researchStatus !== selectedResearchStatus) return false;

        // 6. Verification status filter
        if (selectedVerificationStatus !== 'All' && app.verificationStatus !== selectedVerificationStatus) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'build_desc') {
          const rank: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1, 'Pending Research': 0 };
          return (rank[b.buildability] || 0) - (rank[a.buildability] || 0);
        }
        return a.id.localeCompare(b.id);
      });
  }, [
    activeApps,
    searchTerm,
    selectedCategory,
    selectedBuildability,
    selectedApiAccess,
    selectedAuthMethod,
    selectedResearchStatus,
    selectedVerificationStatus,
    sortBy
  ]);

  // Paginated Slice
  const totalPages = Math.ceil(filteredApps.length / pageSize) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredApps.slice(start, start + pageSize);
  }, [filteredApps, currentPage, pageSize]);

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredApps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ANVESH_AI_Evaluated_Applications_${datasetView}_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-heritage-parchment p-5 rounded-xl border border-heritage-border shadow-heritage-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-xl sm:text-2xl text-heritage-green-900">
              Application Explorer
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-heritage-green-50 text-heritage-green-800 border border-heritage-green-200">
              100 Applications
            </span>
          </div>
          <p className="text-xs text-heritage-muted mt-0.5">
            Full directory of 100 enterprise software applications evaluated for AI agent tool integration and MCP readiness.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Dataset View Mode Toggle */}
          <div className="bg-white/80 border border-heritage-border rounded-xl p-1 flex gap-1 text-xs font-medium shadow-xs">
            <button
              onClick={() => {
                setDatasetView('original');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                datasetView === 'original'
                  ? 'bg-heritage-green-900 text-heritage-gold font-bold shadow-xs'
                  : 'text-heritage-muted hover:text-heritage-green-900'
              }`}
            >
              <span>Original First-Pass (100)</span>
            </button>
            <button
              onClick={() => {
                setDatasetView('corrected');
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                datasetView === 'corrected'
                  ? 'bg-heritage-green-900 text-heritage-gold font-bold shadow-xs'
                  : 'text-heritage-muted hover:text-heritage-green-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Audited Corrections (10 Apps)</span>
            </button>
          </div>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-heritage-sandstone hover:bg-heritage-sandstoneDark/50 text-heritage-green-900 border border-heritage-border transition-all"
          >
            <Download className="w-3.5 h-3.5 text-heritage-terracotta" />
            <span>Export ({filteredApps.length})</span>
          </button>

          <div className="flex items-center bg-heritage-sandstone/70 rounded-xl p-1 border border-heritage-border">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'table' 
                  ? 'bg-heritage-green-900 text-white shadow-sm' 
                  : 'text-heritage-muted hover:text-heritage-green-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'cards' 
                  ? 'bg-heritage-green-900 text-white shadow-sm' 
                  : 'text-heritage-muted hover:text-heritage-green-900'
              }`}
              title="Card Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Audited View Banner */}
      {datasetView === 'corrected' && (
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Audited & Corrected View:</strong> Displaying independent verification ground truth for 10 representative applications across all 10 categories. 90 applications retain their original first-pass crawl findings. Original <code className="font-mono text-amber-900 bg-amber-100/70 px-1 py-0.5 rounded">applications.json</code> is strictly preserved.
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold bg-white px-2.5 py-1 rounded border border-amber-300 text-amber-900 shrink-0 self-start sm:self-auto">
            10 Audited Records
          </span>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="bg-heritage-parchment p-4 rounded-xl border border-heritage-border shadow-heritage-sm space-y-3">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
              placeholder="Search by application name (e.g. GitHub, Slack, Paygent Connect, NotebookLM), ID, or category..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-heritage-sandstone/40 border border-heritage-border focus:border-heritage-gold focus:bg-white focus:outline-none transition-all placeholder:text-heritage-muted"
            />
            {searchTerm && (
              <button 
                onClick={() => handleFilterChange(setSearchTerm, '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-heritage-muted hover:text-heritage-green-900"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-heritage-muted shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal focus:border-heritage-gold focus:outline-none"
            >
              <option value="id">Application ID</option>
              <option value="name">Name (A-Z)</option>
              <option value="build_desc">Buildability (High → Low)</option>
            </select>
          </div>
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-heritage-border/60 text-xs">
          {/* 1. Category */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleFilterChange(setSelectedCategory, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 2. Authentication */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">Authentication</label>
            <select
              value={selectedAuthMethod}
              onChange={(e) => handleFilterChange(setSelectedAuthMethod, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              <option value="All">All Auth Methods</option>
              <option value="OAuth2">OAuth2</option>
              <option value="API Key">API Key</option>
              <option value="Basic Auth">Basic Auth</option>
              <option value="Session / Cookie">Session / Cookie</option>
            </select>
          </div>

          {/* 3. Self-Serve / Gated */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">API Access</label>
            <select
              value={selectedApiAccess}
              onChange={(e) => handleFilterChange(setSelectedApiAccess, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              <option value="All">All Access Models</option>
              <option value="Self-Serve">Self-Serve</option>
              <option value="Gated / Enterprise Approval">Gated / Approval</option>
              <option value="Waitlist / Contact Sales">Waitlist / Contact Sales</option>
              <option value="No Public API">No Public API</option>
            </select>
          </div>

          {/* 4. Buildability */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">Buildability</label>
            <select
              value={selectedBuildability}
              onChange={(e) => handleFilterChange(setSelectedBuildability, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              <option value="All">All Buildability</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Pending Research">Pending Research</option>
            </select>
          </div>

          {/* 5. Research Status */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">Research Status</label>
            <select
              value={selectedResearchStatus}
              onChange={(e) => handleFilterChange(setSelectedResearchStatus, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              <option value="All">All Research Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* 6. Verification Status */}
          <div>
            <label className="block text-[10px] font-semibold text-heritage-muted uppercase mb-1">Verification Status</label>
            <select
              value={selectedVerificationStatus}
              onChange={(e) => handleFilterChange(setSelectedVerificationStatus, e.target.value)}
              className="w-full py-1.5 px-2 rounded-lg text-xs bg-heritage-sandstone/40 border border-heritage-border text-heritage-charcoal truncate"
            >
              <option value="All">All Verification</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Flagged Discrepancy">Flagged Discrepancy</option>
            </select>
          </div>
        </div>

        {/* Results summary pill */}
        <div className="flex items-center justify-between text-xs text-heritage-muted pt-1">
          <span>
            Showing <strong className="text-heritage-green-900">{filteredApps.length}</strong> of 100 applications
          </span>
          {(selectedCategory !== 'All' || selectedBuildability !== 'All' || selectedApiAccess !== 'All' || selectedAuthMethod !== 'All' || selectedResearchStatus !== 'All' || selectedVerificationStatus !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedBuildability('All');
                setSelectedApiAccess('All');
                setSelectedAuthMethod('All');
                setSelectedResearchStatus('All');
                setSelectedVerificationStatus('All');
                setSearchTerm('');
              }}
              className="text-heritage-terracotta hover:underline font-medium text-[11px]"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* View Mode: Table View */}
      {viewMode === 'table' ? (
        <div className="bg-heritage-parchment rounded-xl border border-heritage-border shadow-heritage-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-heritage-sandstone/80 border-b border-heritage-border text-heritage-muted uppercase font-serif tracking-wider sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-16">ID</th>
                  <th className="py-3 px-3.5">Application Name</th>
                  <th className="py-3 px-3.5">Category</th>
                  <th className="py-3 px-3.5">API Access</th>
                  <th className="py-3 px-3.5">Authentication</th>
                  <th className="py-3 px-3.5">Buildability</th>
                  <th className="py-3 px-3.5">Research Status</th>
                  <th className="py-3 px-3.5">Verification</th>
                  <th className="py-3 px-3.5 text-right">Documentation & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-heritage-border/60">
                {paginatedApps.map((app) => (
                  <tr 
                    key={app.id}
                    onClick={() => onSelectApplication(app)}
                    className="hover:bg-heritage-sandstone/40 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-3.5 font-mono font-bold text-heritage-green-800">
                      {app.id}
                    </td>

                    <td className="py-3 px-3.5">
                      <div className="font-semibold text-heritage-green-900 group-hover:text-heritage-gold-dark transition-colors flex items-center gap-1.5 flex-wrap">
                        <span>{app.name}</span>
                        {app.auditCorrection?.isAudited && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-semibold flex items-center gap-1" title="Independently audited in Phase 2">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
                            <span>Audited</span>
                          </span>
                        )}
                        {app.specialResearchNotes && (
                          <span className="p-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-mono" title={app.specialResearchNotes}>
                            NOTE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-heritage-muted font-normal font-mono truncate max-w-[170px]">
                        {app.url.replace('https://', '')}
                      </div>
                    </td>

                    <td className="py-3 px-3.5 text-heritage-charcoal font-medium">
                      {app.category}
                    </td>

                    <td className="py-3 px-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.apiAccess === 'Self-Serve'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {app.apiAccess}
                      </span>
                    </td>

                    <td className="py-3 px-3.5 font-mono text-[11px] text-heritage-charcoal">
                      {app.authMethod}
                    </td>

                    <td className="py-3 px-3.5">
                      <span className={`font-bold ${
                        app.buildability === 'High' 
                          ? 'text-emerald-700' 
                          : app.buildability === 'Medium' 
                          ? 'text-amber-700' 
                          : 'text-rose-700'
                      }`}>
                        {app.buildability}
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        app.researchStatus === 'Completed'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : app.researchStatus === 'In Progress'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-heritage-sandstone text-heritage-slate border border-heritage-border'
                      }`}>
                        {app.researchStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        app.verificationStatus === 'Verified'
                          ? 'text-emerald-700 font-semibold'
                          : app.verificationStatus === 'Flagged Discrepancy'
                          ? 'text-rose-700 font-semibold'
                          : 'text-heritage-muted'
                      }`}>
                        {app.verificationStatus === 'Verified' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ) : null}
                        <span>{app.verificationStatus}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={app.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 px-2 py-1 rounded text-heritage-green-900 hover:text-heritage-gold-dark hover:bg-heritage-sandstone border border-heritage-border text-[11px] font-medium"
                          title="View Official Developer Documentation"
                        >
                          <BookOpen className="w-3 h-3 text-heritage-green-800" />
                          <span>Docs</span>
                        </a>
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded text-heritage-muted hover:text-heritage-green-900 hover:bg-heritage-sandstone"
                          title="Visit Official Starting URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectApplication(app);
                          }}
                          className="p-1.5 rounded text-heritage-green-800 hover:text-heritage-gold-dark hover:bg-heritage-gold/20"
                          title="Inspect Agent Spec"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* View Mode: Card Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedApps.map((app) => (
            <HeritageCard 
              key={app.id} 
              onClick={() => onSelectApplication(app)}
              className="flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-heritage-green-800 px-2 py-0.5 rounded bg-heritage-green-50 border border-heritage-green-200">
                    {app.id}
                  </span>
                  <HeritageBadge variant={app.buildability === 'High' ? 'forest' : 'neutral'}>
                    {app.buildability} Buildability
                  </HeritageBadge>
                </div>

                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif font-bold text-base text-heritage-green-900 group-hover:text-heritage-gold-dark">
                      {app.name}
                    </h3>
                    {app.auditCorrection?.isAudited && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[9px] font-semibold flex items-center gap-1" title="Independently audited in Phase 2">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-700" />
                        <span>Audited</span>
                      </span>
                    )}
                  </div>
                  {app.specialResearchNotes && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-mono font-bold">
                      SPECIAL NOTE
                    </span>
                  )}
                </div>

                <div className="text-xs text-heritage-muted font-medium mt-0.5">
                  Category: <span className="text-heritage-charcoal">{app.category}</span>
                </div>

                <div className="mt-3 text-xs text-heritage-slate space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-heritage-muted">API Access:</span>
                    <span className="font-semibold text-heritage-charcoal">{app.apiAccess}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-heritage-muted">Auth Method:</span>
                    <span className="font-mono text-[11px]">{app.authMethod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-heritage-muted">Research:</span>
                    <span className="text-[11px] font-medium text-heritage-slate">{app.researchStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-heritage-muted">Verification:</span>
                    <span className="text-[11px] font-medium text-heritage-slate">{app.verificationStatus}</span>
                  </div>
                </div>

                {app.specialResearchNotes && (
                  <div className="mt-3 p-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[10px] text-amber-900 leading-relaxed">
                    {app.specialResearchNotes}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-heritage-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href={app.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-medium text-heritage-green-800 hover:text-heritage-gold-dark flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Docs</span>
                  </a>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] font-medium text-heritage-muted hover:text-heritage-green-900 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Website</span>
                  </a>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectApplication(app);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-heritage-green-900 text-heritage-ivory hover:bg-heritage-green-800 transition-all"
                >
                  Inspect
                </button>
              </div>
            </HeritageCard>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-heritage-parchment p-4 rounded-xl border border-heritage-border text-xs">
        <div className="flex items-center gap-2 text-heritage-muted">
          <span>Show per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="py-1 px-2 rounded-lg bg-heritage-sandstone/60 border border-heritage-border text-heritage-charcoal"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100 (All)</option>
          </select>
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-heritage-border bg-heritage-sandstone/40 text-heritage-green-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-heritage-sandstone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .map((page, idx, arr) => (
              <React.Fragment key={page}>
                {idx > 0 && arr[idx - 1] !== page - 1 && (
                  <span className="px-1 text-heritage-muted">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg font-medium text-xs transition-all ${
                    currentPage === page
                      ? 'bg-heritage-green-900 text-white font-bold'
                      : 'border border-heritage-border bg-heritage-sandstone/30 text-heritage-charcoal hover:bg-heritage-sandstone'
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-heritage-border bg-heritage-sandstone/40 text-heritage-green-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-heritage-sandstone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
