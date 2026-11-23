import React from 'react';
import { Search, ShieldCheck, Sparkles, Menu, Download, Cpu } from 'lucide-react';
import { JaaliMotif, HeritageBadge } from './JaaliDecorations';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onToggleSidebar?: () => void;
  onNavigateToAgent?: () => void;
  onExportDossier?: () => void;
  researchedCount?: number;
  verifiedCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery = '',
  onToggleSidebar,
  onNavigateToAgent,
  onExportDossier,
  researchedCount = 0,
  verifiedCount = 0
}) => {
  return (
    <header className="sticky top-0 z-30 bg-heritage-parchment/90 backdrop-blur-md border-b border-heritage-border/90 shadow-heritage-sm px-4 lg:px-8 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Hamburger & Brand Name */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleSidebar} 
            className="lg:hidden p-2 rounded-lg text-heritage-green-800 hover:bg-heritage-sandstone focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-heritage-green-900 border border-heritage-gold/50 shadow-md">
              <JaaliMotif size={22} className="text-heritage-gold" />
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heritage-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-heritage-gold"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg lg:text-xl text-heritage-green-900 tracking-wide">
                  ANVESH AI
                </h1>
                <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-heritage-green-50 text-heritage-green-800 font-medium border border-heritage-green-200">
                  Agent Integration Research
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-heritage-muted tracking-tight font-medium">
                AI Application Research & Agent Readiness Evaluation Platform
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Universal Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-heritage-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              placeholder="Search 100 applications, categories, auth methods, or API types..."
              className="w-full pl-10 pr-12 py-2 rounded-xl text-xs bg-heritage-sandstone/40 border border-heritage-border focus:border-heritage-gold focus:bg-white focus:outline-none transition-all placeholder:text-heritage-muted/70 text-heritage-charcoal"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-heritage-sandstoneDark/50 text-heritage-slate border border-heritage-border">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Status Indicators & Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden xl:flex items-center gap-2">
            <HeritageBadge variant="forest" icon={<Cpu className="w-3.5 h-3.5 text-emerald-700" />}>
              100 Applications
            </HeritageBadge>
            <HeritageBadge variant="gold" icon={<ShieldCheck className="w-3.5 h-3.5 text-amber-600" />}>
              {verifiedCount} Verified
            </HeritageBadge>
          </div>

          <button
            onClick={onNavigateToAgent}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-heritage-green-800 hover:bg-heritage-green-900 text-white shadow-sm border border-heritage-gold/40 transition-all hover:shadow-green-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
            <span className="hidden sm:inline">Research Agent</span>
            <span className="sm:hidden">Agent</span>
          </button>

          <button
            onClick={onExportDossier}
            className="p-2 rounded-xl text-heritage-green-800 bg-heritage-sandstone/80 hover:bg-heritage-sandstone border border-heritage-border transition-all"
            title="Export Evaluation Dossier"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
