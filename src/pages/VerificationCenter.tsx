import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Download, 
  UserCheck, 
  Lock,
  ExternalLink,
  BookOpen,
  Filter,
  Check,
  X,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { VerificationItem, VerificationDossier, AuditedClaimItem, HumanClaimDecision, StoredClaimDecisions } from '../types';
import { verificationItems as defaultItems } from '../data/mockData';
import auditDossierRaw from '../data/verification_audit.json';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';

interface VerificationCenterProps {
  onVerifyApp?: (appId: string) => void;
}

export const VerificationCenter: React.FC<VerificationCenterProps> = ({ onVerifyApp }) => {
  // View toggle: 'claim_audit' (Phase 2 claim-level comparison) vs 'attestation_queue' (legacy application attestation desk)
  const [activeView, setActiveView] = useState<'claim_audit' | 'attestation_queue'>('claim_audit');
  
  // Claim-level Audit State with LocalStorage Persistence
  const initialAudit = auditDossierRaw as VerificationDossier;
  const [claimDecisions, setClaimDecisions] = useState<StoredClaimDecisions>(() => {
    try {
      const saved = localStorage.getItem('anvesh_claim_decisions');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Failed to read anvesh_claim_decisions from localStorage', e);
      return {};
    }
  });
  const [claimCategoryFilter, setClaimCategoryFilter] = useState<string>('All');
  const [claimStatusFilter, setClaimStatusFilter] = useState<string>('All');

  // Application-level Attestation Queue State
  const [items, setItems] = useState<VerificationItem[]>(defaultItems);
  const [selectedAspect, setSelectedAspect] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(defaultItems[0]);
  const [attestationSuccess, setAttestationSuccess] = useState<string | null>(null);

  // Flatten claims across the 10 audited applications
  const allAuditedClaims: (AuditedClaimItem & { appName: string; appId: string; category: string })[] = [];
  initialAudit.applications.forEach(app => {
    app.claims.forEach(c => {
      allAuditedClaims.push({
        ...c,
        appName: app.applicationName,
        appId: app.applicationId,
        category: app.category
      });
    });
  });

  const filteredClaims = allAuditedClaims.filter(c => {
    if (claimCategoryFilter !== 'All' && c.category !== claimCategoryFilter) return false;
    if (claimStatusFilter !== 'All' && c.status !== claimStatusFilter) return false;
    return true;
  });

  const handleClaimReview = (claimId: string, decision: 'Approved' | 'Rejected') => {
    const record: HumanClaimDecision = {
      decision,
      timestamp: new Date().toISOString(),
      reviewer: 'Human Auditor'
    };
    const updated = { ...claimDecisions, [claimId]: record };
    setClaimDecisions(updated);
    try {
      localStorage.setItem('anvesh_claim_decisions', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save claim decision to localStorage', e);
    }
    setAttestationSuccess(`Human reviewer ${decision === 'Approved' ? 'approved' : 'flagged/rejected'} claim ${claimId} (saved to localStorage).`);
    setTimeout(() => setAttestationSuccess(null), 3500);
  };

  const handleRevertClaimReview = (claimId: string) => {
    const updated = { ...claimDecisions };
    delete updated[claimId];
    setClaimDecisions(updated);
    try {
      localStorage.setItem('anvesh_claim_decisions', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update localStorage', e);
    }
    setAttestationSuccess(`Reverted decision for claim ${claimId}.`);
    setTimeout(() => setAttestationSuccess(null), 3000);
  };

  const handleResetAllDecisions = () => {
    if (window.confirm('Reset all human reviewer decisions stored in localStorage? This will return all 50 claims to pending human sign-off.')) {
      setClaimDecisions({});
      try {
        localStorage.removeItem('anvesh_claim_decisions');
      } catch (e) {
        console.error('Failed to clear localStorage', e);
      }
      setAttestationSuccess('All human reviewer decisions cleared from localStorage.');
      setTimeout(() => setAttestationSuccess(null), 3000);
    }
  };

  const handleAttest = (item: VerificationItem) => {
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: 'Verified', auditor: 'Lead Agent Auditor' } : i));
    setSelectedItem(prev => prev && prev.id === item.id ? { ...prev, status: 'Verified', auditor: 'Lead Agent Auditor' } : prev);
    if (onVerifyApp) {
      onVerifyApp(item.applicationId);
    }
    setAttestationSuccess(`Verified and approved integration assessment for ${item.applicationName}.`);
    setTimeout(() => setAttestationSuccess(null), 4000);
  };

  const filteredItems = items.filter(item => {
    if (selectedAspect !== 'All' && item.aspect !== selectedAspect) return false;
    if (selectedStatus !== 'All' && item.status !== selectedStatus) return false;
    return true;
  });

  const verifiedCount = items.filter(i => i.status === 'Verified').length;
  const pendingCount = items.filter(i => i.status === 'Pending Review').length;
  const flaggedCount = items.filter(i => i.status === 'Flagged Discrepancy').length;

  const totalDecisionsCount = Object.keys(claimDecisions).length;
  const approvedClaimsCount = Object.values(claimDecisions).filter(d => d.decision === 'Approved').length;
  const rejectedClaimsCount = Object.values(claimDecisions).filter(d => d.decision === 'Rejected').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Banner */}
      <div className="bg-heritage-parchment p-6 rounded-2xl border border-heritage-border shadow-heritage-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-heritage-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <JaaliMotif size={14} className="text-emerald-700" />
              <span>Independent Verification & Governance Center</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-heritage-green-900">
              Verification Center
            </h1>
            <p className="text-xs text-heritage-slate max-w-2xl leading-relaxed">
              Phase 2 claim-level independent verification audit across all 10 categories, human attestation controls, and accuracy analysis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white/80 border border-heritage-border rounded-xl p-1.5 flex gap-1 text-xs font-medium shadow-xs">
              <button
                onClick={() => setActiveView('claim_audit')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'claim_audit'
                    ? 'bg-heritage-green-900 text-heritage-gold font-bold shadow-xs'
                    : 'text-heritage-muted hover:text-heritage-green-900'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Claim-Level Audit (50 Claims)</span>
              </button>

              <button
                onClick={() => setActiveView('attestation_queue')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeView === 'attestation_queue'
                    ? 'bg-heritage-green-900 text-heritage-gold font-bold shadow-xs'
                    : 'text-heritage-muted hover:text-heritage-green-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Attestation Queue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {attestationSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{attestationSuccess}</span>
        </div>
      )}

      {/* VIEW 1: PHASE 2 CLAIM-LEVEL AUDIT */}
      {activeView === 'claim_audit' && (
        <div className="space-y-6">
          {/* Accuracy Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
              <span className="text-[10px] text-heritage-muted uppercase font-serif block">Audited Sample</span>
              <div className="text-xl font-bold font-serif text-heritage-green-900 mt-1">10 Apps</div>
              <span className="text-[11px] text-heritage-slate">1 per category</span>
            </div>

            <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
              <span className="text-[10px] text-heritage-muted uppercase font-serif block">Claims Audited</span>
              <div className="text-xl font-bold font-serif text-heritage-green-900 mt-1">{initialAudit.totalClaimsChecked}</div>
              <span className="text-[11px] text-heritage-slate">5 claims per app</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-heritage-sm">
              <span className="text-[10px] text-emerald-800 uppercase font-serif block">Strict Standard Accuracy</span>
              <div className="text-xl font-bold font-serif text-emerald-800 mt-1">76.0%</div>
              <span className="text-[11px] text-emerald-700">38/50 strict match</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-heritage-sm">
              <span className="text-[10px] text-amber-800 uppercase font-serif block">Partially Verified</span>
              <div className="text-xl font-bold font-serif text-amber-800 mt-1">18.0%</div>
              <span className="text-[11px] text-amber-700">9/50 nuanced / deprecation</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 shadow-heritage-sm">
              <span className="text-[10px] text-rose-800 uppercase font-serif block">Incorrect</span>
              <div className="text-xl font-bold font-serif text-rose-800 mt-1">6.0%</div>
              <span className="text-[11px] text-rose-700">3/50 access gating</span>
            </div>

            <div className="p-4 rounded-xl bg-heritage-green-900 border border-heritage-gold/50 shadow-heritage-sm text-heritage-ivory">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-heritage-gold uppercase font-serif block">Experimental Weighted</span>
                <span className="text-[9px] px-1 rounded bg-heritage-gold/20 text-heritage-gold font-mono">0.5 credit</span>
              </div>
              <div className="text-xl font-bold font-serif text-heritage-gold mt-1">85.0%</div>
              <span className="text-[11px] text-heritage-ivory/80">((38 + 0.5×9) / 50)</span>
            </div>
          </div>

          {/* Methodology Banner */}
          <div className="p-4 rounded-xl bg-heritage-sandstone/50 border border-heritage-border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="text-heritage-green-900 block font-serif">Independent Verification Methodology:</strong>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  Strict Standard Accuracy: 76.0%
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                  Experimental Weighted: 85.0%
                </span>
              </div>
              <p className="text-heritage-slate leading-relaxed text-[11px]">
                {initialAudit.methodology}
              </p>
              <p className="text-[10px] text-heritage-muted italic">
                Note on Accuracy Scoring: Strict standard accuracy is 76.0% (38/50 claims strictly verified against primary documentation). The experimental 85.0% score grants 0.5 partial credit for 9 claims with valid architecture but requiring provider-specific terminology updates (e.g., HubSpot Private App Tokens vs legacy API keys, Slack bot tokens vs generic PATs). 3 claims (6.0%) were incorrect due to marketing copy collisions.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <div className="text-right sm:text-left">
                <span className="text-[11px] font-mono bg-white px-2.5 py-1 rounded border border-heritage-border text-heritage-green-900 font-semibold block">
                  Human Sign-offs: {totalDecisionsCount} / 50 ({approvedClaimsCount} Approved, {rejectedClaimsCount} Flagged)
                </span>
                <span className="text-[9px] text-heritage-muted block mt-0.5">
                  Persisted in LocalStorage (<code className="font-mono">anvesh_claim_decisions</code>)
                </span>
              </div>
              {totalDecisionsCount > 0 && (
                <button
                  onClick={handleResetAllDecisions}
                  className="px-2.5 py-1 rounded-lg text-[10px] text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors font-medium shadow-xs"
                >
                  Reset All Decisions
                </button>
              )}
            </div>
          </div>

          {/* Claims Filter & List */}
          <div className="bg-heritage-parchment rounded-xl border border-heritage-border shadow-heritage-sm overflow-hidden">
            <div className="p-4 border-b border-heritage-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="font-serif font-bold text-sm text-heritage-green-900">
                Claim-Level Comparison Table ({filteredClaims.length} Claims)
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={claimCategoryFilter}
                  onChange={(e) => setClaimCategoryFilter(e.target.value)}
                  className="py-1 px-2.5 rounded-lg bg-heritage-sandstone/70 border border-heritage-border text-heritage-charcoal text-xs"
                >
                  <option value="All">All Categories (10)</option>
                  {initialAudit.applications.map(a => (
                    <option key={a.category} value={a.category}>{a.category}</option>
                  ))}
                </select>

                <select
                  value={claimStatusFilter}
                  onChange={(e) => setClaimStatusFilter(e.target.value)}
                  className="py-1 px-2.5 rounded-lg bg-heritage-sandstone/70 border border-heritage-border text-heritage-charcoal text-xs"
                >
                  <option value="All">All Statuses</option>
                  <option value="Verified">Verified (38)</option>
                  <option value="Partially Verified">Partially Verified (9)</option>
                  <option value="Incorrect">Incorrect (3)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-heritage-sandstone/70 text-[10px] text-heritage-green-900 font-serif uppercase tracking-wider border-b border-heritage-border">
                    <th className="py-2.5 px-3">Application</th>
                    <th className="py-2.5 px-3">Dimension & First-Pass Claim</th>
                    <th className="py-2.5 px-3">Independent Verification Finding</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Human Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-heritage-border/70 text-[11px]">
                  {filteredClaims.map(claim => {
                    const decision = claimDecisions[claim.claimId];
                    return (
                      <tr key={claim.claimId} className="hover:bg-heritage-sandstone/20 transition-colors">
                        <td className="py-3 px-3 align-top font-mono text-[10px]">
                          <strong className="text-heritage-green-950 font-sans block text-xs">{claim.appName}</strong>
                          <span className="text-heritage-muted">{claim.appId}</span>
                          <span className="block text-[10px] text-heritage-slate font-sans mt-0.5">{claim.category}</span>
                        </td>

                        <td className="py-3 px-3 align-top max-w-xs">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-heritage-sandstone border border-heritage-border mb-1">
                            {claim.dimension}
                          </span>
                          <div className="text-heritage-charcoal font-medium">{claim.originalClaim}</div>
                        </td>

                        <td className="py-3 px-3 align-top max-w-md">
                          <div className="text-heritage-green-950 font-semibold">{claim.independentVerificationResult}</div>
                          <div className="text-heritage-slate text-[10px] mt-1">{claim.explanation}</div>
                          {claim.suggestedCorrection !== "None" && (
                            <div className="mt-1 text-amber-900 bg-amber-50/80 p-1.5 rounded border border-amber-200 text-[10px]">
                              <strong>Correction:</strong> {claim.suggestedCorrection}
                            </div>
                          )}
                          {claim.mcpDetails && (
                            <div className="mt-2 p-2 rounded-lg bg-heritage-sandstone/60 border border-heritage-border text-[10px] space-y-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-semibold text-heritage-green-950 font-serif">MCP Specification:</span>
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  claim.mcpDetails.ownership === 'Official First-Party'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : claim.mcpDetails.ownership === 'Third-Party'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                    : claim.mcpDetails.ownership === 'Community-Maintained'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                                }`}>
                                  {claim.mcpDetails.ownership} ({claim.mcpDetails.implementationType})
                                </span>
                              </div>
                              <div className="text-heritage-charcoal text-[10px] leading-tight">
                                {claim.mcpDetails.maintenanceStatus}
                              </div>
                              {claim.mcpDetails.repoUrl && claim.mcpDetails.repoUrl !== 'None' && (
                                <div className="pt-0.5">
                                  <a 
                                    href={claim.mcpDetails.repoUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="font-mono text-[9px] text-heritage-green-800 hover:text-heritage-gold underline inline-flex items-center gap-1"
                                  >
                                    <span>Repo: {claim.mcpDetails.repoName}</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          )}
                          <a
                            href={claim.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[10px] text-heritage-green-800 underline block mt-1.5 truncate max-w-sm hover:text-heritage-gold"
                          >
                            {claim.evidenceUrl}
                          </a>
                        </td>

                        <td className="py-3 px-3 align-top">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            claim.status === 'Verified'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : claim.status === 'Partially Verified'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {claim.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 align-top text-right">
                          <div className="flex flex-col items-end gap-1">
                            {decision ? (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                                    decision.decision === 'Approved'
                                      ? 'bg-emerald-900 text-emerald-100 border border-emerald-700'
                                      : 'bg-rose-900 text-rose-100 border border-rose-700'
                                  }`}>
                                    {decision.decision === 'Approved' ? <Check className="w-3 h-3 text-emerald-300" /> : <X className="w-3 h-3 text-rose-300" />}
                                    {decision.decision}
                                  </span>
                                  <button
                                    onClick={() => handleRevertClaimReview(claim.claimId)}
                                    title="Revert human review decision"
                                    className="p-1 rounded text-heritage-muted hover:text-heritage-charcoal hover:bg-heritage-sandstone text-[10px] underline"
                                  >
                                    Revert
                                  </button>
                                </div>
                                <div className="text-[9px] text-heritage-slate font-mono">
                                  {new Date(decision.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {decision.reviewer}
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleClaimReview(claim.claimId, 'Approved')}
                                  title="Approve verification finding"
                                  className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all flex items-center gap-1 text-[10px] font-semibold"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                                <button
                                  onClick={() => handleClaimReview(claim.claimId, 'Rejected')}
                                  title="Reject finding or flag for re-audit"
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 transition-all flex items-center gap-1 text-[10px] font-semibold"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Flag</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: APPLICATION ATTESTATION QUEUE */}
      {activeView === 'attestation_queue' && (
        <div className="space-y-6">
          {/* Audit Stats Metric Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
              <div className="flex items-center justify-between text-xs text-heritage-muted uppercase font-serif">
                <span>Verified Applications</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-emerald-800">{verifiedCount}</div>
              <p className="text-[11px] text-heritage-slate mt-1">Confirmed agent tool-calling schemas</p>
            </div>

            <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
              <div className="flex items-center justify-between text-xs text-heritage-muted uppercase font-serif">
                <span>Pending Review</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-amber-700">{pendingCount}</div>
              <p className="text-[11px] text-heritage-slate mt-1">Awaiting human sign-off</p>
            </div>

            <div className="p-4 rounded-xl bg-heritage-parchment border border-heritage-border shadow-heritage-sm">
              <div className="flex items-center justify-between text-xs text-heritage-muted uppercase font-serif">
                <span>Flagged Discrepancies</span>
                <AlertTriangle className="w-4 h-4 text-heritage-terracotta" />
              </div>
              <div className="mt-2 text-2xl font-bold font-serif text-heritage-terracotta">{flaggedCount}</div>
              <p className="text-[11px] text-heritage-slate mt-1">Missing public API or paywall gating</p>
            </div>
          </div>

          {/* Main Verification Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Queue (5 cols) */}
            <div className="lg:col-span-5 bg-heritage-parchment rounded-xl border border-heritage-border p-4 shadow-heritage-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-heritage-green-900">
                  Audit Verification Queue ({filteredItems.length})
                </h3>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-heritage-border">
                <select
                  value={selectedAspect}
                  onChange={(e) => setSelectedAspect(e.target.value)}
                  className="py-1.5 px-2 rounded-lg bg-heritage-sandstone/60 border border-heritage-border text-heritage-charcoal truncate"
                >
                  <option value="All">All Evaluation Aspects</option>
                  <option value="API Access Verification">API Access</option>
                  <option value="OAuth Flow Inspection">OAuth Flows</option>
                  <option value="MCP Server Compatibility">MCP Compatibility</option>
                  <option value="Rate Limits & Blockers">Rate Limits</option>
                  <option value="Tool Calling Schema">Tool Calling Schema</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="py-1.5 px-2 rounded-lg bg-heritage-sandstone/60 border border-heritage-border text-heritage-charcoal truncate"
                >
                  <option value="All">All Statuses</option>
                  <option value="Verified">Verified</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Flagged Discrepancy">Flagged Discrepancy</option>
                </select>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {filteredItems.map(item => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-heritage-sandstone border-heritage-gold shadow-sm'
                          : 'bg-heritage-parchment border-heritage-border/80 hover:bg-heritage-sandstone/50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-mono text-heritage-muted">{item.id} • {item.applicationId}</span>
                        <span className={`font-semibold px-2 py-0.5 rounded-full ${
                          item.status === 'Verified' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : item.status === 'Pending Review' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="font-semibold text-xs text-heritage-green-900 line-clamp-1">
                        {item.applicationName}
                      </div>
                      <div className="text-[11px] text-heritage-slate mt-0.5 truncate">
                        {item.aspect}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Evidence Inspector (7 cols) */}
            <div className="lg:col-span-7 bg-heritage-parchment rounded-xl border border-heritage-border p-6 shadow-heritage-sm space-y-5">
              {selectedItem ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-heritage-border pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-heritage-green-800 bg-heritage-green-50 px-2 py-0.5 rounded border border-heritage-green-200">
                          {selectedItem.id}
                        </span>
                        <HeritageBadge variant="gold">{selectedItem.category}</HeritageBadge>
                      </div>
                      <h2 className="font-serif font-bold text-lg text-heritage-green-900 mt-1">
                        {selectedItem.applicationName}: {selectedItem.aspect}
                      </h2>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        selectedItem.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : selectedItem.status === 'Pending Review'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>

                  {/* Documentation / Evidence Link */}
                  <div className="p-3.5 rounded-xl bg-heritage-sandstone/60 border border-heritage-border flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-heritage-muted uppercase font-serif block">Audited Reference Endpoint</span>
                      <a href={selectedItem.evidenceUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-heritage-green-900 underline truncate max-w-md block mt-0.5">
                        {selectedItem.evidenceUrl}
                      </a>
                    </div>
                    <ExternalLink className="w-4 h-4 text-heritage-green-800 shrink-0" />
                  </div>

                  {/* Research Findings */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-serif font-bold text-heritage-green-900 block">
                      Agent Research Observation:
                    </span>
                    <p className="text-heritage-charcoal leading-relaxed p-3.5 rounded-xl bg-heritage-sandstone/40 border border-heritage-border">
                      {selectedItem.findings}
                    </p>
                  </div>

                  {/* Auditor Assessment Notes */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-serif font-bold text-heritage-green-900 block">
                      Human-in-the-Loop Auditor Assessment:
                    </span>
                    <p className="text-heritage-slate leading-relaxed p-3.5 rounded-xl bg-heritage-sandstone/40 border border-heritage-border">
                      {selectedItem.auditorNotes}
                    </p>
                  </div>

                  {/* Sign-off Details */}
                  <div className="pt-2 text-xs text-heritage-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-heritage-border">
                    <div>
                      Audit Date: <strong className="text-heritage-charcoal">{selectedItem.verifiedDate}</strong>
                    </div>
                    <div>
                      Auditor: <strong className="text-heritage-green-900">{selectedItem.auditor || "Pending Sign-off"}</strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-2.5">
                    {selectedItem.status !== 'Verified' && (
                      <button
                        onClick={() => handleAttest(selectedItem)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-sm transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Attest & Verify Assessment</span>
                      </button>
                    )}

                    <button
                      onClick={() => alert(`Exported verification dossier for ${selectedItem.applicationName}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-heritage-sandstone hover:bg-heritage-sandstoneDark text-heritage-green-900 font-medium text-xs border border-heritage-border transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-heritage-terracotta" />
                      <span>Export Attestation Dossier</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-heritage-muted text-xs">
                  Select an assessment dossier from the queue to inspect findings.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
