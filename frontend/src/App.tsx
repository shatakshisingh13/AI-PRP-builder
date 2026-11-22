import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Loader2, 
  Copy, 
  Download, 
  FileJson, 
  ListTodo, 
  Briefcase, 
  User, 
  Layers, 
  SlidersHorizontal, 
  Printer, 
  Globe, 
  Link2,
  Edit3,
  X,
  Check,
  MessageSquare,
  History
} from 'lucide-react';
import { PRDDashboard } from './components/PRDDashboard';
import { PeerReviewModal } from './components/PeerReviewModal';
import { PRDResponse } from './types';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface PresetIdea {
  label: string;
  category: string;
  stage: string;
  cadence: string;
  idea: string;
}

const PRESET_IDEAS: PresetIdea[] = [
  {
    label: "📚 NearBooks (P2P Book Marketplace)",
    category: "Consumer Marketplace",
    stage: "0 to 1 MVP",
    cadence: "4-Week Milestone Phases",
    idea: "Build a hyper-local mobile app called nearbooks for selling and trading pre-owned books to nearby buyers within walking or short driving distance."
  },
  {
    label: "🐾 FetchPup (On-Demand Pet Care)",
    category: "On-Demand Service App",
    stage: "0 to 1 MVP",
    cadence: "2-Week Agile Sprints",
    idea: "Build an on-demand marketplace for vetted, background-checked dog walkers featuring live GPS tracking and digital lockbox key management."
  },
  {
    label: "🩺 ClinicScribe (AI Doctor Assistant)",
    category: "B2B Healthcare SaaS",
    stage: "Beta Launch",
    cadence: "2-Week Agile Sprints",
    idea: "An ambient AI clinical assistant that listens to patient doctor visits and auto-generates structured EHR medical notes with ICD-10 billing codes."
  },
  {
    label: "⚡ DevPulse (Engineering Analytics)",
    category: "Developer Tooling",
    stage: "Feature Expansion",
    cadence: "Quarterly Roadmap",
    idea: "A developer analytics tool that integrates with GitHub, Linear, and Slack to track DORA metrics and identify code review bottlenecks."
  }
];

function App() {
  const [idea, setIdea] = useState('');
  const [productType, setProductType] = useState('Consumer Marketplace');
  const [lifecycleStage, setLifecycleStage] = useState('0 to 1 MVP');
  const [sprintCadence, setSprintCadence] = useState('2-Week Agile Sprints');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [prdData, setPrdData] = useState<PRDResponse | null>(null);
  const [versionHistory, setVersionHistory] = useState<PRDResponse[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);

  // Author Personalization
  const [authorName, setAuthorName] = useState(() => localStorage.getItem('pm_author_name') || 'Lead Product Manager');
  const [authorTitle, setAuthorTitle] = useState(() => localStorage.getItem('pm_author_title') || 'Product Manager');
  const [authorLinkedIn, setAuthorLinkedIn] = useState(() => localStorage.getItem('pm_author_linkedin') || 'https://linkedin.com');
  const [authorGithub, setAuthorGithub] = useState(() => localStorage.getItem('pm_author_github') || 'https://github.com');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('pm_author_name', authorName);
    localStorage.setItem('pm_author_title', authorTitle);
    localStorage.setItem('pm_author_linkedin', authorLinkedIn);
    localStorage.setItem('pm_author_github', authorGithub);
  }, [authorName, authorTitle, authorLinkedIn, authorGithub]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSelectPreset = (preset: PresetIdea) => {
    setIdea(preset.idea);
    setProductType(preset.category);
    setLifecycleStage(preset.stage);
    setSprintCadence(preset.cadence);
    toast.success(`Loaded preset: ${preset.label}`);
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    setPrdData(null);
    setVersionHistory([]);
    
    const structuredIdea = `Product Idea: ${idea.trim()}
Target Category: ${productType}
Release Scope: ${lifecycleStage}
Sprint Cadence: ${sprintCadence}
Product Lead: ${authorName} (${authorTitle})`;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
      const response = await axios.post(`${apiUrl}/api/prd/generate`, {
        idea: structuredIdea
      });
      const generated = response.data;
      if (!generated.version) generated.version = 1;
      setPrdData(generated);
      setVersionHistory([generated]);
      toast.success('PRD v1.0 generated successfully!');
    } catch (error: any) {
      console.error(error);
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || 'Failed to generate PRD. The server might be down or AI API failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefineWithFeedback = async (feedback: {
    reviewerRole: string;
    rating: number;
    missingRequirements: string[];
    feedbackNotes: string;
  }) => {
    if (!prdData) return;
    setIsRefining(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
      const response = await axios.post(`${apiUrl}/api/prd/refine`, {
        currentPrd: prdData,
        reviewerRole: feedback.reviewerRole,
        rating: feedback.rating,
        missingRequirements: feedback.missingRequirements,
        feedbackNotes: feedback.feedbackNotes
      });

      const refined = response.data;
      setPrdData(refined);
      setVersionHistory(prev => [...prev, refined]);
      setIsPeerReviewOpen(false);
      toast.success(`PRD upgraded to v${refined.version || 2}.0 with peer feedback!`);
    } catch (error: any) {
      console.error(error);
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || 'Failed to refine PRD. The server might be down or AI API failed.');
    } finally {
      setIsRefining(false);
    }
  };

  const switchVersion = (targetVersion: number) => {
    const found = versionHistory.find(v => v.version === targetVersion);
    if (found) {
      setPrdData(found);
      toast.success(`Switched view to Version v${targetVersion}.0`);
    }
  };

  const copyToClipboard = () => {
    if (!prdData) return;
    navigator.clipboard.writeText(JSON.stringify(prdData, null, 2));
    toast.success('Copied JSON to clipboard');
  };

  const downloadJson = () => {
    if (!prdData) return;
    const blob = new Blob([JSON.stringify(prdData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prd_v${prdData.version || 1}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded JSON');
  };

  const exportJiraCsv = () => {
    if (!prdData) return;
    const rows: string[] = [
      ['Issue Type', 'Summary', 'Description', 'Sprint / Week', 'Acceptance Criteria'].map(h => `"${h}"`).join(',')
    ];

    prdData.userStories.forEach((story, idx) => {
      const summary = story.length > 80 ? story.substring(0, 77) + '...' : story;
      const desc = story.replace(/"/g, '""');
      const sprint = prdData.sprintPlan[idx % prdData.sprintPlan.length]?.week || 'Backlog';
      const ac = (prdData.acceptanceCriteria || []).join('; ').replace(/"/g, '""');
      rows.push(`"Story","${summary.replace(/"/g, '""')}","${desc}","${sprint}","${ac}"`);
    });

    prdData.sprintPlan.forEach(sprint => {
      sprint.tasks.forEach(task => {
        rows.push(`"Task","${task.replace(/"/g, '""')}","Part of ${sprint.week} engineering deliverables","${sprint.week}",""`);
      });
    });

    const csvContent = rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jira_linear_backlog_v${prdData.version || 1}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported Jira / Linear Backlog CSV');
  };

  const printDocument = () => {
    window.print();
  };

  const downloadMarkdown = () => {
    if (!prdData) return;
    
    let md = `# Product Requirements Document (PRD)\n\n`;
    md += `**Document Version:** v${prdData.version || 1}.0\n`;
    md += `**Document Author:** ${authorName} (${authorTitle})\n`;
    md += `**Product Category:** ${productType}\n`;
    md += `**Release Scope:** ${lifecycleStage}\n`;
    md += `**Sprint Cadence:** ${sprintCadence}\n`;
    md += `**Status:** APPROVED FOR SPRINT\n\n`;
    md += `---\n\n`;

    if (prdData.changeLog && prdData.changeLog.length > 0) {
      md += `## 📝 Peer Feedback Change Log (v${prdData.version || 2}.0 Modifications)\n`;
      prdData.changeLog.forEach((item, i) => {
        md += `### ${i + 1}. [${item.section}] ${item.changeDescription}\n`;
        md += `- **PM Rationale:** ${item.reason}\n\n`;
      });
      md += `---\n\n`;
    }

    md += `## 1. Problem Statement & Market Need\n${prdData.problemStatement}\n\n`;
    
    if (prdData.successMetrics) {
      md += `## 2. Success Metrics & Product KPIs\n`;
      if (prdData.successMetrics.northStar) {
        md += `**Primary North Star Metric:** ${prdData.successMetrics.northStar}\n\n`;
      }
      if (prdData.successMetrics.primaryKpis && prdData.successMetrics.primaryKpis.length > 0) {
        md += `### Primary KPIs\n`;
        prdData.successMetrics.primaryKpis.forEach(kpi => md += `- ${kpi}\n`);
        md += `\n`;
      }
      if (prdData.successMetrics.guardrailMetrics && prdData.successMetrics.guardrailMetrics.length > 0) {
        md += `### Guardrail Metrics\n`;
        prdData.successMetrics.guardrailMetrics.forEach(gm => md += `- ${gm}\n`);
        md += `\n`;
      }
    }

    md += `## 3. Target User Cohorts\n`;
    prdData.targetUsers.forEach(u => md += `- ${u}\n`);
    md += `\n`;

    md += `## 4. User Personas\n`;
    prdData.personas.forEach(p => {
      md += `### ${p.name}\n- **Description:** ${p.description}\n- **Goal:** ${p.goal}\n- **Pain Points:**\n`;
      p.painPoints.forEach(pp => md += `  - ${pp}\n`);
    });
    md += `\n`;

    md += `## 5. Agile User Stories\n`;
    prdData.userStories.forEach(s => md += `- ${s}\n`);
    md += `\n`;

    md += `## 6. Acceptance Criteria\n`;
    prdData.acceptanceCriteria.forEach(ac => md += `- [ ] ${ac}\n`);
    md += `\n`;

    md += `## 7. Feature Prioritization (MoSCoW)\n`;
    md += `### Must-Have (Phase 1 MVP)\n`;
    prdData.mvpFeatures.forEach(f => md += `- ${f}\n`);
    md += `\n### Future Roadmap (Phase 2 Backlog)\n`;
    prdData.futureFeatures.forEach(f => md += `- ${f}\n`);
    md += `\n`;

    if (prdData.risksAndMitigations && prdData.risksAndMitigations.length > 0) {
      md += `## 8. Pre-Mortem Risk Assessment & Mitigations\n`;
      prdData.risksAndMitigations.forEach(r => {
        md += `### ${r.risk} (Impact: ${r.impact})\n`;
        md += `- **PM Mitigation Strategy:** ${r.mitigation}\n\n`;
      });
    }

    md += `## 9. Recommended APIs & Infrastructure\n`;
    prdData.suggestedApis.forEach(api => md += `- ${api}\n`);
    md += `\n`;

    md += `## 10. Database Schema Model\n\`\`\`sql\n`;
    md += prdData.databaseSchema.join('\n\n');
    md += `\n\`\`\`\n\n`;

    md += `## 11. Wireframe Ideas & Screen Hierarchy\n`;
    prdData.wireframeIdeas.forEach(w => md += `${w}\n\n`);

    md += `## 12. Sprint Schedule & Engineering Execution\n`;
    prdData.sprintPlan.forEach(s => {
      md += `### ${s.week}\n`;
      s.tasks.forEach(t => md += `- ${t}\n`);
      md += `\n`;
    });
    
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prd_v${prdData.version || 1}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded Enterprise Markdown PRD');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-background text-foreground' : 'bg-gray-50/70 text-gray-900'}`}>
      <Toaster position="bottom-right" />
      
      {/* Top Navigation Bar */}
      <nav className="border-b bg-card/85 backdrop-blur-md sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary/70 flex items-center justify-center shadow-sm">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">PRD Forge</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded border">
                PM Studio v2.4
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Author Profile Chip */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-muted/50 hover:bg-muted transition-all text-xs font-medium cursor-pointer"
              title="Click to customize your PM profile details"
            >
              <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px]">
                {authorName.charAt(0)}
              </div>
              <span className="hidden md:inline font-semibold">{authorName}</span>
              <span className="text-muted-foreground hidden sm:inline">• {authorTitle}</span>
              <Edit3 className="w-3 h-3 text-muted-foreground" />
            </button>

            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border bg-card hover:bg-muted transition-colors cursor-pointer"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Workspace Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4 no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Product Management Architecture Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Turn product concepts into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              engineering-ready PRDs
            </span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Designed by <strong className="text-foreground">{authorName}</strong> for Agile product discovery. Features interactive peer review feedback loops, change log diffing, and one-click Jira backlog exports.
          </p>
        </section>

        {/* Input & Scoping Control Panel */}
        <section className="max-w-4xl mx-auto bg-card border rounded-3xl shadow-sm p-6 space-y-6 no-print">
          {/* PM Parameters Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-primary" /> Product Category
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full text-xs font-medium bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Consumer Marketplace">Consumer Marketplace</option>
                <option value="B2B Enterprise SaaS">B2B Enterprise SaaS</option>
                <option value="On-Demand Service App">On-Demand Service App</option>
                <option value="Developer Tooling">Developer Tooling / API</option>
                <option value="AI Agent & Productivity">AI Agent & Productivity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary" /> Lifecycle Scope
              </label>
              <select
                value={lifecycleStage}
                onChange={(e) => setLifecycleStage(e.target.value)}
                className="w-full text-xs font-medium bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="0 to 1 MVP">0 to 1 MVP (Initial Scoping)</option>
                <option value="Beta Launch">Private Beta / Pilot Launch</option>
                <option value="Feature Expansion">Feature Expansion (Growth)</option>
                <option value="Enterprise Scale">Enterprise Scale & Hardening</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-primary" /> Sprint Cadence
              </label>
              <select
                value={sprintCadence}
                onChange={(e) => setSprintCadence(e.target.value)}
                className="w-full text-xs font-medium bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="2-Week Agile Sprints">2-Week Agile Sprints</option>
                <option value="4-Week Milestone Phases">4-Week Milestone Phases</option>
                <option value="Quarterly Roadmap">Quarterly Roadmap (3-Month)</option>
              </select>
            </div>
          </div>

          {/* Textarea Input */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Product Problem & Solution Concept
            </label>
            <textarea
              className="w-full bg-muted/30 border rounded-2xl p-4 resize-none outline-none min-h-[110px] text-base text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Describe what you want to build (e.g. A hyper-local marketplace for secondhand college textbooks...)"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </div>

          {/* Preset Demo Pills */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Quick Demo Presets (Click to Populate):
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_IDEAS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset)}
                  className="text-xs px-3 py-1.5 rounded-xl border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground font-medium transition-all text-left cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-xs text-muted-foreground">
              {idea.length} characters • Configured for <strong>{productType}</strong>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIdea('')}
                className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !idea.trim()}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-sm cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Engineering PRD...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate PRD
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* PRD Output Section */}
        {prdData && (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
            {/* Action Bar Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-2xl bg-card border shadow-sm no-print">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black">Generated Specification</h2>
                  {versionHistory.length > 1 && (
                    <div className="flex items-center gap-1 ml-2 bg-muted px-2 py-0.5 rounded-lg border text-xs">
                      <History className="w-3.5 h-3.5 text-primary" />
                      <span className="text-muted-foreground">History:</span>
                      {versionHistory.map(v => (
                        <button
                          key={v.version || 1}
                          onClick={() => switchVersion(v.version || 1)}
                          className={`px-1.5 py-0.5 rounded font-mono font-bold transition-all cursor-pointer ${
                            (prdData.version || 1) === (v.version || 1) 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          v{v.version || 1}.0
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Authored by <strong className="text-foreground">{authorName}</strong> • Version v{prdData.version || 1}.0 ready for engineering handoff
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Peer Review Button */}
                <button
                  onClick={() => setIsPeerReviewOpen(true)}
                  className="px-3.5 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Submit Peer Review & Generate Improved v2.0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Peer Review & Refine</span>
                </button>

                <button 
                  onClick={exportJiraCsv} 
                  className="px-3 py-2 rounded-xl border bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center gap-2 text-xs font-semibold shadow-sm cursor-pointer" 
                  title="Export to Jira / Linear Backlog CSV"
                >
                  <ListTodo className="w-3.5 h-3.5" /> Jira CSV
                </button>
                <button 
                  onClick={printDocument} 
                  className="px-3 py-2 rounded-xl border bg-muted/60 hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer" 
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / PDF
                </button>
                <button 
                  onClick={downloadMarkdown} 
                  className="px-3 py-2 rounded-xl border bg-muted/60 hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer" 
                  title="Download Markdown"
                >
                  <Download className="w-3.5 h-3.5" /> Markdown
                </button>
                <button 
                  onClick={downloadJson} 
                  className="px-3 py-2 rounded-xl border bg-muted/60 hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer" 
                  title="Download JSON"
                >
                  <FileJson className="w-3.5 h-3.5" /> JSON
                </button>
                <button 
                  onClick={copyToClipboard} 
                  className="px-3 py-2 rounded-xl border bg-muted/60 hover:bg-muted transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer" 
                  title="Copy Raw JSON"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>
            </div>

            {/* Render Dashboard */}
            <PRDDashboard 
              data={prdData} 
              authorName={authorName} 
              authorTitle={authorTitle} 
              productType={productType}
              lifecycleStage={lifecycleStage}
              onOpenFeedbackModal={() => setIsPeerReviewOpen(true)}
            />
          </section>
        )}

        {/* Footer */}
        <footer className="pt-12 pb-6 border-t text-center space-y-3 no-print">
          <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground font-medium">
            <span>Portfolio Project by <strong className="text-foreground">{authorName}</strong> ({authorTitle})</span>
            <span>•</span>
            <a href={authorLinkedIn} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground">
              <Link2 className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <span>•</span>
            <a href={authorGithub} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground">
              <Globe className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Enterprise Product Engineering Architecture: React 18, Vite, Java Spring Boot 3 &amp; Gemini 3.5.
          </p>
        </footer>
      </main>

      {/* Edit Author Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-card border rounded-3xl p-6 max-w-md w-full shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg">Personalize Your Portfolio Details</h3>
              </div>
              <button 
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              These details will be stamped as the Document Owner across all generated PRDs, exports, and footer badges.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full text-sm bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Your Job Title / Target Role</label>
                <input
                  type="text"
                  value={authorTitle}
                  onChange={(e) => setAuthorTitle(e.target.value)}
                  placeholder="e.g. Product Manager / Associate PM"
                  className="w-full text-sm bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={authorLinkedIn}
                  onChange={(e) => setAuthorLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full text-sm bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">GitHub Profile URL</label>
                <input
                  type="text"
                  value={authorGithub}
                  onChange={(e) => setAuthorGithub(e.target.value)}
                  placeholder="https://github.com/yourname"
                  className="w-full text-sm bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => {
                  toast.success('PM profile details updated!');
                  setIsProfileModalOpen(false);
                }}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-all shadow-sm cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Peer Review Modal */}
      <PeerReviewModal
        isOpen={isPeerReviewOpen}
        onClose={() => setIsPeerReviewOpen(false)}
        onSubmit={handleRefineWithFeedback}
        isSubmitting={isRefining}
        currentVersion={prdData?.version || 1}
      />
    </div>
  );
}

export default App;
