import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, PageId } from './components/common/Sidebar';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { ApplicationExplorer } from './pages/ApplicationExplorer';
import { ApplicationDetails } from './pages/ApplicationDetails';
import { AIResearchAgent } from './pages/AIResearchAgent';
import { VerificationCenter } from './pages/VerificationCenter';
import { IntegrationInsights } from './pages/IntegrationInsights';
import { Recommendations } from './pages/Recommendations';
import { applications as initialApplications } from './data/mockData';
import { Application } from './types';
import { JaaliMotif } from './components/common/JaaliDecorations';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('overview');
  const [appsList, setAppsList] = useState<Application[]>(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application>(initialApplications[60]); // Default GitHub (APP-061)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (activePage !== 'explorer') {
      setActivePage('explorer');
    }
  };

  const handleSelectApplication = (app: Application) => {
    setSelectedApplication(app);
    setActivePage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAgentWithApp = (app: Application) => {
    setSelectedApplication(app);
    setActivePage('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAppResearch = (appId: string) => {
    setAppsList(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          researchStatus: 'Completed',
          confidence: 0.98,
          lastResearched: new Date().toISOString().slice(0, 10)
        };
      }
      return a;
    }));
  };

  const handleVerifyApp = (appId: string) => {
    setAppsList(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          verificationStatus: 'Verified',
          verifiedBy: 'Lead Agent Auditor'
        };
      }
      return a;
    }));
  };

  const researchedCount = appsList.filter(a => a.researchStatus === 'Completed').length;
  const verifiedCount = appsList.filter(a => a.verificationStatus === 'Verified').length;

  return (
    <div className="min-h-screen bg-heritage-ivory text-heritage-charcoal flex flex-col font-sans selection:bg-heritage-gold/20 selection:text-heritage-green-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-heritage-green-900 text-heritage-ivory border border-heritage-gold shadow-heritage-lg text-xs font-semibold flex items-center gap-2">
          <JaaliMotif size={16} className="text-heritage-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          onSelectPage={(page) => {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          totalAppsCount={appsList.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
            onNavigateToAgent={() => setActivePage('agent')}
            onExportDossier={() => showToast('Full 100-Application Portfolio Evaluation Dossier Exported (JSON).')}
            researchedCount={researchedCount}
            verifiedCount={verifiedCount}
          />

          {/* Page Body */}
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
            {activePage === 'overview' && (
              <OverviewDashboard
                applications={appsList}
                onSelectApplication={handleSelectApplication}
                onNavigatePage={(p) => setActivePage(p)}
              />
            )}

            {activePage === 'explorer' && (
              <ApplicationExplorer
                applications={appsList}
                onSelectApplication={handleSelectApplication}
                initialSearchQuery={searchQuery}
              />
            )}

            {activePage === 'details' && (
              <ApplicationDetails
                application={selectedApplication}
                allApplications={appsList}
                onSelectApplication={(app) => setSelectedApplication(app)}
                onNavigateToAgentWithApp={handleNavigateToAgentWithApp}
              />
            )}

            {activePage === 'agent' && (
              <AIResearchAgent
                applications={appsList}
                selectedApp={selectedApplication}
                onNavigateToVerification={() => setActivePage('verification')}
                onUpdateAppResearch={handleUpdateAppResearch}
              />
            )}

            {activePage === 'verification' && (
              <VerificationCenter onVerifyApp={handleVerifyApp} />
            )}

            {activePage === 'integration' && (
              <IntegrationInsights />
            )}

            {activePage === 'recommendations' && (
              <Recommendations
                applications={appsList}
                onSelectApplication={handleSelectApplication}
              />
            )}
          </main>

          {/* Clean English Heritage Footer */}
          <footer className="mt-auto border-t border-heritage-border bg-heritage-parchment/80 p-5 text-xs text-heritage-slate">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <JaaliMotif size={16} className="text-heritage-gold" />
                <span className="font-serif font-bold text-heritage-green-900">ANVESH AI</span>
                <span className="text-heritage-muted">• AI Application Research & Agent Readiness Platform</span>
              </div>
              <div className="text-[11px] text-heritage-muted flex items-center gap-4">
                <span>Composio 100 Application Integration Benchmark</span>
                <span>Model Context Protocol (MCP) Compatible</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
