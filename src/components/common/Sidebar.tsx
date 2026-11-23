import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Compass, 
  ChevronRight,
  Database
} from 'lucide-react';
import { JaaliMotif } from './JaaliDecorations';

export type PageId = 
  | 'overview' 
  | 'explorer' 
  | 'details' 
  | 'agent' 
  | 'verification' 
  | 'integration' 
  | 'recommendations';

interface NavItem {
  id: PageId;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

interface SidebarProps {
  activePage: PageId;
  onSelectPage: (page: PageId) => void;
  isOpen: boolean;
  onCloseMobile?: () => void;
  totalAppsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  isOpen,
  onCloseMobile,
  totalAppsCount = 100
}) => {
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview Dashboard',
      subtitle: 'Executive Metrics & Charts',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'explorer',
      label: 'Application Explorer',
      subtitle: 'Catalog & Filter 100 Apps',
      icon: <Layers className="w-4 h-4" />,
      badge: `${totalAppsCount}`,
      badgeColor: 'bg-heritage-gold/20 text-heritage-gold-dark border-heritage-gold/40'
    },
    {
      id: 'details',
      label: 'Application Details',
      subtitle: 'Agent Readiness & Auth Profile',
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 'agent',
      label: 'AI Research Agent',
      subtitle: 'Autonomous Documentation Auditor',
      icon: <Cpu className="w-4 h-4" />,
      badge: 'Active',
      badgeColor: 'bg-heritage-terracotta/20 text-heritage-terracotta border-heritage-terracotta/40'
    },
    {
      id: 'verification',
      label: 'Verification Center',
      subtitle: 'Human-in-the-Loop Review',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: 'Audit',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      id: 'integration',
      label: 'Integration Insights',
      subtitle: 'Auth & MCP Ecosystem Matrix',
      icon: <Network className="w-4 h-4" />
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      subtitle: 'Agent Buildability Playbook',
      icon: <Compass className="w-4 h-4" />
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-heritage-green-950/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-heritage-parchment border-r border-heritage-border shadow-heritage-md
        flex flex-col transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Banner */}
        <div className="p-5 border-b border-heritage-border/90 bg-gradient-to-b from-heritage-sandstone/70 to-heritage-parchment">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-heritage-green-900 border border-heritage-gold/60 text-heritage-gold shadow-sm">
              <JaaliMotif size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base text-heritage-green-900 tracking-wide">
                  ANVESH AI
                </span>
              </div>
              <p className="text-[11px] text-heritage-slate/80 font-medium">
                AI Agent Readiness Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-serif font-bold uppercase tracking-widest text-heritage-muted">
            Modules & Navigation
          </div>

          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPage(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all group
                  ${isActive 
                    ? 'bg-heritage-green-900 text-white shadow-md border border-heritage-gold/50' 
                    : 'text-heritage-charcoal hover:bg-heritage-sandstone/70 hover:text-heritage-green-900 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`
                    shrink-0 p-1.5 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-heritage-green-800 text-heritage-gold' 
                      : 'bg-heritage-sandstone/80 text-heritage-green-800 group-hover:bg-heritage-gold/20 group-hover:text-heritage-gold-dark'
                    }
                  `}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{item.label}</div>
                    <div className={`text-[10px] font-normal transition-opacity ${isActive ? 'text-heritage-gold-light opacity-90' : 'text-heritage-muted'}`}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-heritage-sandstone text-heritage-slate'}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-heritage-gold" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Evaluation Box */}
        <div className="p-4 border-t border-heritage-border/90 bg-heritage-sandstone/50 m-3 rounded-xl border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-heritage-green-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-heritage-gold" />
              Target Evaluation Scope
            </span>
            <span className="text-[10px] font-mono font-bold text-heritage-terracotta">
              100 Applications
            </span>
          </div>
          <p className="text-[11px] text-heritage-slate leading-relaxed">
            Evaluating developer APIs, OAuth authentication, and Model Context Protocol (MCP) tool readiness.
          </p>
          <div className="mt-3 pt-2.5 border-t border-heritage-border/70 flex items-center justify-between text-[10px] text-heritage-muted">
            <span>Agent Readiness Benchmark</span>
            <span className="font-mono text-heritage-green-800 font-semibold">10 Categories</span>
          </div>
        </div>
      </aside>
    </>
  );
};
