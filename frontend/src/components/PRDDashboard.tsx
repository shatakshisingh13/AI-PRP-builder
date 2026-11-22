import React, { useState } from 'react';
import { PRDResponse } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { 
  Users, 
  Target, 
  CheckSquare, 
  Zap, 
  Rocket, 
  Server, 
  Database, 
  Layout, 
  Clock, 
  FileText, 
  TrendingUp, 
  Compass, 
  ShieldCheck, 
  ShieldAlert,
  Calendar,
  Layers,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  GitBranch,
  Star,
  GitCommit
} from 'lucide-react';
import toast from 'react-hot-toast';

interface PRDDashboardProps {
  data: PRDResponse;
  authorName?: string;
  authorTitle?: string;
  productType?: string;
  lifecycleStage?: string;
  onOpenFeedbackModal?: () => void;
}

export const PRDDashboard: React.FC<PRDDashboardProps> = ({ 
  data, 
  authorName = "Lead Product Manager",
  authorTitle = "Senior PM",
  productType = "Cross-Platform Application",
  lifecycleStage = "0 to 1 MVP",
  onOpenFeedbackModal
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'strategy' | 'requirements' | 'engineering' | 'changelog'>('all');
  const [docStatus, setDocStatus] = useState<'DRAFT' | 'IN REVIEW' | 'APPROVED'>('APPROVED');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copySection = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    toast.success(`Copied ${sectionKey} to clipboard`);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getStatusBadge = () => {
    switch (docStatus) {
      case 'APPROVED':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'IN REVIEW':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'DRAFT':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
    }
  };

  const cycleStatus = () => {
    if (docStatus === 'DRAFT') setDocStatus('IN REVIEW');
    else if (docStatus === 'IN REVIEW') setDocStatus('APPROVED');
    else setDocStatus('DRAFT');
  };

  const hasChangeLog = Boolean(data.changeLog && data.changeLog.length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Formal Enterprise PRD Document Header */}
      <div className="p-6 rounded-2xl bg-card border shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                PRD-SPEC-2026-v{data.version || 1}.0
              </span>
              <button 
                onClick={cycleStatus}
                title="Click to toggle document status"
                className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all cursor-pointer hover:opacity-80 flex items-center gap-1.5 ${getStatusBadge()}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {docStatus}
              </button>
              {data.version && data.version > 1 && (
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20 flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> Improved v{data.version}.0
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Engineering & Product Requirements Specification
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Owner: <strong className="text-foreground">{authorName}</strong> ({authorTitle})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>Type: <strong className="text-foreground">{productType}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg border">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Stage: <strong className="text-foreground">{lifecycleStage}</strong></span>
              </div>
            </div>

            {/* Peer Review Trigger Button */}
            {onOpenFeedbackModal && (
              <button
                onClick={onOpenFeedbackModal}
                className="px-3.5 py-1.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                title="Add peer feedback, rate PRD, and generate improved v2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Peer Review & Refine</span>
              </button>
            )}
          </div>
        </div>

        {/* View Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 no-print">
          <div className="inline-flex p-1 bg-muted rounded-xl gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Sections
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'strategy' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Target className="w-4 h-4 text-primary" /> Strategy & KPIs
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'requirements' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-emerald-500" /> Requirements & Stories
            </button>
            <button
              onClick={() => setActiveTab('engineering')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'engineering' 
                  ? 'bg-card text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code2 className="w-4 h-4 text-blue-500" /> Engineering Specs
            </button>
            {hasChangeLog && (
              <button
                onClick={() => setActiveTab('changelog')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-bold ${
                  activeTab === 'changelog' 
                    ? 'bg-card text-purple-600 shadow-sm border border-purple-500/20' 
                    : 'text-purple-600 hover:text-purple-700 bg-purple-500/10'
                }`}
              >
                <GitCommit className="w-4 h-4" /> Change Log ({data.changeLog?.length})
              </button>
            )}
          </div>

          <span className="text-xs text-muted-foreground italic">
            Tip: Click &quot;Peer Review &amp; Refine&quot; to test the iterative feedback loop
          </span>
        </div>
      </div>

      {/* CHANGE LOG & FEEDBACK HISTORY TAB */}
      {(activeTab === 'all' || activeTab === 'changelog') && hasChangeLog && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Feedback Loop: Peer Review &amp; Document Change Log</h3>
              <p className="text-xs text-muted-foreground">Requirements modified in Version v{data.version || 2}.0 directly addressing reviewer critique</p>
            </div>
          </div>

          {/* Change Log Table */}
          <Card className="border-purple-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-600">
                <GitBranch className="w-5 h-5" />
                Modifications Made in v{data.version || 2}.0 Based on Peer Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.changeLog?.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border bg-muted/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 border border-purple-500/20">
                        {item.section}
                      </span>
                      <span className="text-xs text-muted-foreground">Change #{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground pt-1">{item.changeDescription}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">PM Rationale:</strong> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback History Cards */}
          {data.feedbackHistory && data.feedbackHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Peer Review History Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.feedbackHistory.map((fb, idx) => (
                  <div key={idx} className="p-4 rounded-xl border bg-muted/30 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{fb.reviewerRole}</span>
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: fb.rating }).map((_, s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{fb.timestamp}</span>
                    </div>

                    {fb.missingRequirements && fb.missingRequirements.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {fb.missingRequirements.map((req, r) => (
                          <span key={r} className="text-xs px-2 py-0.5 rounded bg-card border text-muted-foreground font-medium">
                            • {req}
                          </span>
                        ))}
                      </div>
                    )}

                    {fb.feedbackNotes && (
                      <p className="text-xs italic text-muted-foreground pt-1 border-t mt-1">
                        &quot;{fb.feedbackNotes}&quot;
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* STRATEGY & DISCOVERY SECTION */}
      {(activeTab === 'all' || activeTab === 'strategy') && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">1. Strategic Discovery &amp; Value Proposition</h3>
              <p className="text-xs text-muted-foreground">Core customer problems, target personas, and validation metrics</p>
            </div>
          </div>

          {/* Problem Statement */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="w-5 h-5 text-primary" />
                Problem Statement &amp; Market Need
              </CardTitle>
              <button 
                onClick={() => copySection(data.problemStatement, 'Problem Statement')}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 p-1 rounded hover:bg-muted"
                title="Copy section"
              >
                {copiedSection === 'Problem Statement' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-base">{data.problemStatement}</p>
            </CardContent>
          </Card>

          {/* Success Metrics & KPIs */}
          {data.successMetrics && (
            <Card className="border-primary/40 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Product Metrics Framework
                </CardTitle>
                <span className="text-xs font-mono uppercase bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
                  HEART / OKR Model
                </span>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.successMetrics.northStar && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-start gap-3">
                    <Compass className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold text-primary">Primary North Star Metric</span>
                      <p className="text-base font-semibold mt-0.5 text-foreground">{data.successMetrics.northStar}</p>
                      <p className="text-xs text-muted-foreground mt-1">Direct indicator of core value delivered to end-users.</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.successMetrics.primaryKpis && data.successMetrics.primaryKpis.length > 0 && (
                    <div className="p-4 rounded-xl bg-muted/40 border space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2 text-foreground">
                        <TrendingUp className="w-4 h-4 text-emerald-500" /> Primary Success KPIs
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {data.successMetrics.primaryKpis.map((kpi, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{kpi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.successMetrics.guardrailMetrics && data.successMetrics.guardrailMetrics.length > 0 && (
                    <div className="p-4 rounded-xl bg-muted/40 border space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2 text-foreground">
                        <ShieldCheck className="w-4 h-4 text-blue-500" /> Guardrail &amp; Quality Metrics
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {data.successMetrics.guardrailMetrics.map((gm, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>{gm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Target Users & Personas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Target User Cohorts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5 text-muted-foreground">
                  {data.targetUsers.map((user, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{user}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-primary" />
                  Core User Personas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.personas.map((persona, i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/40 border space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base text-foreground">{persona.name}</h4>
                      <span className="text-xs bg-card px-2 py-0.5 rounded border text-muted-foreground">Archetype</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">{persona.description}</p>
                    <div className="pt-2 border-t space-y-1.5 text-xs">
                      <p><strong className="text-foreground">Primary Goal:</strong> <span className="text-muted-foreground">{persona.goal}</span></p>
                      <div>
                        <strong className="text-foreground">Key Pain Points:</strong>
                        <ul className="list-disc pl-4 mt-1 space-y-0.5 text-muted-foreground">
                          {persona.painPoints.map((pp, j) => (
                            <li key={j}>{pp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risks & Pre-Mortem Mitigations */}
          {data.risksAndMitigations && data.risksAndMitigations.length > 0 && (
            <Card className="border-amber-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  Pre-Mortem Risk Assessment &amp; Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.risksAndMitigations.map((item, i) => {
                  const impactColor = 
                    item.impact?.toLowerCase() === 'high' ? 'bg-red-500/10 text-red-600 border-red-500/30' :
                    item.impact?.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/30' :
                    'bg-blue-500/10 text-blue-600 border-blue-500/30';

                  return (
                    <div key={i} className="p-4 rounded-xl border bg-muted/20 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-semibold text-foreground text-sm">{item.risk}</span>
                          {item.impact && (
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border shrink-0 ${impactColor}`}>
                              {item.impact} Risk
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-card border text-xs text-muted-foreground">
                        <strong className="text-foreground block mb-0.5">PM Mitigation Strategy:</strong>
                        {item.mitigation}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* REQUIREMENTS & SCOPE SECTION */}
      {(activeTab === 'all' || activeTab === 'requirements') && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">2. Functional Requirements &amp; Scope Boundaries</h3>
              <p className="text-xs text-muted-foreground">Agile user stories, acceptance criteria, and MoSCoW prioritization</p>
            </div>
          </div>

          {/* User Stories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-primary" />
                Agile User Stories
              </CardTitle>
              <button 
                onClick={() => copySection(data.userStories.join('\n'), 'User Stories')}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 p-1 rounded hover:bg-muted"
                title="Copy all user stories"
              >
                {copiedSection === 'User Stories' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {data.userStories.map((story, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/40 border text-sm flex items-start gap-3">
                    <span className="font-mono text-xs text-muted-foreground font-semibold px-2 py-0.5 rounded bg-card border shrink-0">
                      US-{i + 1}
                    </span>
                    <p className="text-foreground leading-snug">{story}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Acceptance Criteria */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckSquare className="w-5 h-5 text-primary" />
                Conditions of Satisfaction (Acceptance Criteria)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.acceptanceCriteria.map((criteria, i) => (
                  <div key={i} className="p-3.5 rounded-lg border bg-muted/30 text-sm flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-foreground">{criteria}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* MVP Features vs Future Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-emerald-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    Phase 1: Must-Have MVP Scope
                  </CardTitle>
                  <span className="text-xs bg-emerald-500/10 text-emerald-600 font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                    Sprint 1-2
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {data.mvpFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Rocket className="w-5 h-5 text-purple-500" />
                    Phase 2: Future Roadmap Backlog
                  </CardTitle>
                  <span className="text-xs bg-purple-500/10 text-purple-600 font-semibold px-2 py-0.5 rounded border border-purple-500/20">
                    Post-Launch
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {data.futureFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Rocket className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TECHNICAL ARCHITECTURE SECTION */}
      {(activeTab === 'all' || activeTab === 'engineering') && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">3. Technical Architecture &amp; Sprint Execution</h3>
              <p className="text-xs text-muted-foreground">API integrations, data schemas, wireframes, and delivery schedule</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Suggested APIs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="w-5 h-5 text-primary" />
                  Recommended Third-Party APIs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {data.suggestedApis.map((api, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/40 border text-sm flex items-center justify-between">
                      <span className="font-semibold text-foreground">{api}</span>
                      <span className="text-xs font-mono bg-card px-2 py-0.5 rounded border text-muted-foreground">REST / SDK</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Database Schema */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Database className="w-5 h-5 text-primary" />
                  Relational Data Model
                </CardTitle>
                <button 
                  onClick={() => copySection(data.databaseSchema.join('\n\n'), 'Database Schema')}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 p-1 rounded hover:bg-muted"
                  title="Copy schema SQL"
                >
                  {copiedSection === 'Database Schema' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-xs bg-muted/60 p-4 rounded-xl border whitespace-pre-wrap max-h-[320px] overflow-y-auto leading-relaxed text-foreground">
                  {data.databaseSchema.join('\n\n')}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wireframes & Sprint Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layout className="w-5 h-5 text-primary" />
                  Low-Fidelity Screen Wireframes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {data.wireframeIdeas.map((wireframe, i) => (
                    <div key={i} className="font-mono text-xs bg-muted/40 p-4 rounded-xl border whitespace-pre-wrap leading-relaxed">
                      {wireframe}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  Engineering Sprint Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative border-l border-primary/30 ml-3 space-y-6 pb-2">
                  {data.sprintPlan.map((sprint, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-card" />
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-base text-foreground">{sprint.week}</h4>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground font-mono">Sprint Stage</span>
                      </div>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                        {sprint.tasks.map((task, j) => (
                          <li key={j} className="flex items-start gap-1.5">
                            <span className="text-primary font-bold">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
