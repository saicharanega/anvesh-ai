import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Server, 
  Activity,
  Cpu,
  Key,
  ShieldCheck,
  Lock,
  Unlock
} from 'lucide-react';
import { applications } from '../data/mockData';
import { Application, Category } from '../types';
import { JaaliMotif, HeritageBadge, HeritageCard } from '../components/common/JaaliDecorations';

export const IntegrationInsights: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Compute category-level insights
  const categories: Category[] = [
    'CRM and Sales',
    'Support and Helpdesk',
    'Communications and Messaging',
    'Marketing, Ads, Email and Social',
    'Ecommerce',
    'Data, SEO and Scraping',
    'Developer, Infra and Data Platforms',
    'Productivity and Project Management',
    'Finance and Fintech',
    'AI, Research and Media-native'
  ];

  const categoryStats = categories.map(cat => {
    const apps = applications.filter(a => a.category === cat);
    const selfServe = apps.filter(a => a.apiAccess === 'Self-Serve').length;
    const highBuild = apps.filter(a => a.buildability === 'High').length;
    const mcpReady = apps.filter(a => a.mcpStatus === 'Native MCP Server' || a.mcpStatus === 'Community MCP Available').length;
    const webhooks = apps.filter(a => a.webhooksSupport).length;

    return {
      category: cat,
      total: apps.length,
      selfServe,
      highBuild,
      mcpReady,
      webhooks,
      readinessScore: Math.round(((selfServe * 1.5 + highBuild * 2 + mcpReady * 1.5) / (apps.length * 5)) * 100)
    };
  });

  const filteredApps = applications.filter(a => {
    if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-heritage-parchment p-6 rounded-2xl border border-heritage-border shadow-heritage-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-heritage-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-heritage-sandstoneDark/60 border border-heritage-gold/40 text-heritage-green-900 text-xs font-semibold">
              <JaaliMotif size={14} className="text-heritage-gold" />
              <span>Authentication & Protocol Ecosystem Matrix</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-heritage-green-900">
              Integration & Ecosystem Insights
            </h1>
            <p className="text-xs text-heritage-slate max-w-2xl leading-relaxed">
              Comparative landscape of developer accessibility, Model Context Protocol (MCP) tool support, and API gating across all 10 target categories.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <HeritageBadge variant="forest">
              100 Applications Evaluated
            </HeritageBadge>
            <HeritageBadge variant="gold">
              10 Categories
            </HeritageBadge>
          </div>
        </div>
      </div>

      {/* Top Category Readiness Leaderboard */}
      <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-4">
        <h3 className="font-serif font-bold text-base text-heritage-green-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-heritage-gold" />
          Category Agent Integration Readiness Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-heritage-sandstone/70 border-b border-heritage-border text-heritage-muted uppercase font-serif tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Applications</th>
                <th className="py-2.5 px-3 text-center">Self-Serve APIs</th>
                <th className="py-2.5 px-3 text-center">High Buildability</th>
                <th className="py-2.5 px-3 text-center">MCP Ready</th>
                <th className="py-2.5 px-3 text-center">Webhooks Support</th>
                <th className="py-2.5 px-3 text-right">Readiness Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-border/60">
              {categoryStats.map(stat => (
                <tr 
                  key={stat.category}
                  onClick={() => setSelectedCategory(stat.category === selectedCategory ? 'All' : stat.category)}
                  className={`hover:bg-heritage-sandstone/40 cursor-pointer transition-colors ${
                    selectedCategory === stat.category ? 'bg-heritage-sandstone/60 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-heritage-green-900">
                    {stat.category}
                  </td>
                  <td className="py-3 px-3 text-center font-mono">{stat.total}</td>
                  <td className="py-3 px-3 text-center font-mono text-emerald-800">{stat.selfServe} / {stat.total}</td>
                  <td className="py-3 px-3 text-center font-mono text-heritage-green-900 font-bold">{stat.highBuild} / {stat.total}</td>
                  <td className="py-3 px-3 text-center font-mono text-heritage-gold-dark font-bold">{stat.mcpReady} / {stat.total}</td>
                  <td className="py-3 px-3 text-center font-mono">{stat.webhooks} / {stat.total}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      stat.readinessScore >= 70 ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {stat.readinessScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filtered Application Detail List */}
      <div className="bg-heritage-parchment rounded-xl border border-heritage-border p-5 shadow-heritage-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-heritage-green-900">
              Application Tool-Calling Registry {selectedCategory !== 'All' ? `(${selectedCategory})` : '(All Categories)'}
            </h3>
            <p className="text-xs text-heritage-muted">
              Showing {filteredApps.length} applications
            </p>
          </div>

          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-heritage-terracotta hover:underline font-medium"
            >
              Reset to All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {filteredApps.map(app => (
            <div key={app.id} className="p-3.5 rounded-xl bg-heritage-sandstone/40 border border-heritage-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-mono text-heritage-muted">{app.id}</span>
                  <HeritageBadge variant={app.buildability === 'High' ? 'forest' : 'neutral'}>
                    {app.buildability} Build
                  </HeritageBadge>
                </div>
                <div className="font-bold text-heritage-green-900 text-sm">{app.name}</div>
                <div className="text-[11px] text-heritage-muted">{app.category}</div>

                <div className="mt-2.5 pt-2 border-t border-heritage-border/70 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-heritage-muted">API Access:</span>
                    <span className="font-medium">{app.apiAccess}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-heritage-muted">Auth:</span>
                    <span className="font-mono">{app.authMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-heritage-muted">MCP:</span>
                    <span className="text-heritage-green-900 font-medium truncate max-w-[140px]">{app.mcpStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
