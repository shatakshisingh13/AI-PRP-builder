import { useState } from 'react';
import { Sparkles, Moon, Sun, Loader2, Copy, Download, FileJson, ListTodo } from 'lucide-react';
import { PRDDashboard } from './components/PRDDashboard';
import { PRDResponse } from './types';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prdData, setPrdData] = useState<PRDResponse | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setIsGenerating(true);
    setPrdData(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8081';
      const response = await axios.post(`${apiUrl}/api/prd/generate`, {
        idea: idea
      });
      setPrdData(response.data);
      toast.success('PRD generated successfully!');
    } catch (error: any) {
      console.error(error);
      const serverMessage = error.response?.data?.message;
      toast.error(serverMessage || 'Failed to generate PRD. The server might be down or AI API failed.');
    } finally {
      setIsGenerating(false);
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
    a.download = 'prd.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded JSON');
  };

  const exportJiraCsv = () => {
    if (!prdData) return;
    const rows: string[] = [
      ['Issue Type', 'Summary', 'Description', 'Sprint / Week', 'Acceptance Criteria'].map(h => `"${h}"`).join(',')
    ];

    // Add user stories as Story issues
    prdData.userStories.forEach((story, idx) => {
      const summary = story.length > 80 ? story.substring(0, 77) + '...' : story;
      const desc = story.replace(/"/g, '""');
      const sprint = prdData.sprintPlan[idx % prdData.sprintPlan.length]?.week || 'Backlog';
      const ac = (prdData.acceptanceCriteria || []).join('; ').replace(/"/g, '""');
      rows.push(`"Story","${summary.replace(/"/g, '""')}","${desc}","${sprint}","${ac}"`);
    });

    // Add sprint tasks as Task issues
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
    a.download = 'jira_linear_backlog.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported Jira / Linear Backlog CSV');
  };

  const downloadMarkdown = () => {
    if (!prdData) return;
    
    let md = `# Product Requirements Document\n\n`;
    md += `## Problem Statement\n${prdData.problemStatement}\n\n`;
    
    if (prdData.successMetrics) {
      md += `## Success Metrics & KPIs\n`;
      if (prdData.successMetrics.northStar) {
        md += `**North Star Metric:** ${prdData.successMetrics.northStar}\n\n`;
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

    md += `## Target Users\n`;
    prdData.targetUsers.forEach(u => md += `- ${u}\n`);
    md += `\n`;

    md += `## Personas\n`;
    prdData.personas.forEach(p => {
      md += `### ${p.name}\n- Description: ${p.description}\n- Goal: ${p.goal}\n- Pain Points:\n`;
      p.painPoints.forEach(pp => md += `  - ${pp}\n`);
    });
    md += `\n`;

    md += `## User Stories\n`;
    prdData.userStories.forEach(s => md += `- ${s}\n`);
    md += `\n`;

    md += `## Acceptance Criteria\n`;
    prdData.acceptanceCriteria.forEach(ac => md += `- ${ac}\n`);
    md += `\n`;

    md += `## MVP Features\n`;
    prdData.mvpFeatures.forEach(f => md += `- ${f}\n`);
    md += `\n`;

    md += `## Future Features\n`;
    prdData.futureFeatures.forEach(f => md += `- ${f}\n`);
    md += `\n`;

    if (prdData.risksAndMitigations && prdData.risksAndMitigations.length > 0) {
      md += `## Risks & Pre-Mortem Mitigations\n`;
      prdData.risksAndMitigations.forEach(r => {
        md += `### ${r.risk} (Impact: ${r.impact})\n`;
        md += `- **Mitigation Strategy:** ${r.mitigation}\n\n`;
      });
    }

    md += `## Suggested Technical APIs\n`;
    prdData.suggestedApis.forEach(api => md += `- ${api}\n`);
    md += `\n`;

    md += `## Database Schema\n\`\`\`sql\n`;
    md += prdData.databaseSchema.join('\n\n');
    md += `\n\`\`\`\n\n`;

    md += `## Wireframe Ideas\n`;
    prdData.wireframeIdeas.forEach(w => md += `${w}\n\n`);

    md += `## Sprint Delivery Plan\n`;
    prdData.sprintPlan.forEach(s => {
      md += `### ${s.week}\n`;
      s.tasks.forEach(t => md += `- ${t}\n`);
      md += `\n`;
    });
    
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prd.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded Markdown');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-background text-foreground' : 'bg-gray-50 text-gray-900'}`}>
      <Toaster position="bottom-right" />
      <nav className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">AI PRD Builder</span>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Turn your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">product idea</span> into a complete PRD in seconds.
          </h1>
          <p className="text-lg text-muted-foreground">
            Describe your idea and our AI Product Manager will generate a structured Product Requirements Document with metrics, risks, and sprint plans instantly.
          </p>

          <div className="bg-card border rounded-2xl shadow-sm p-2 flex flex-col focus-within:ring-2 focus-within:ring-primary/20 transition-all text-left">
            <textarea
              className="w-full bg-transparent p-4 resize-none outline-none min-h-[120px] text-lg text-foreground"
              placeholder="Example: Build a food delivery app for college students..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
            <div className="flex justify-between items-center p-2 border-t mt-2">
              <span className="text-sm text-muted-foreground px-2">
                {idea.length} characters
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIdea('')}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !idea.trim()}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
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
          </div>
        </section>

        {prdData && (
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold">Your Generated PRD</h2>
                <p className="text-sm text-muted-foreground">Comprehensive specification ready for engineering handoff</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={exportJiraCsv} className="p-2 rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm font-medium" title="Export to Jira / Linear">
                  <ListTodo className="w-4 h-4 text-primary" /> Jira / Linear CSV
                </button>
                <button onClick={copyToClipboard} className="p-2 rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm" title="Copy JSON">
                  <Copy className="w-4 h-4" /> Copy
                </button>
                <button onClick={downloadJson} className="p-2 rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm" title="Download JSON">
                  <FileJson className="w-4 h-4" /> JSON
                </button>
                <button onClick={downloadMarkdown} className="p-2 rounded-lg border bg-card hover:bg-muted transition-colors flex items-center gap-2 text-sm" title="Download Markdown">
                  <Download className="w-4 h-4" /> Markdown
                </button>
              </div>
            </div>
            <PRDDashboard data={prdData} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
