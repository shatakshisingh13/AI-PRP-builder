import React from 'react';
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
  ShieldAlert 
} from 'lucide-react';

interface PRDDashboardProps {
  data: PRDResponse;
}

export const PRDDashboard: React.FC<PRDDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Problem Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5 text-primary" />
            Problem Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{data.problemStatement}</p>
        </CardContent>
      </Card>

      {/* Success Metrics & KPIs (New PM Section) */}
      {data.successMetrics && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="w-5 h-5 text-primary" />
              Success Metrics & KPIs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* North Star Highlight */}
            {data.successMetrics.northStar && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-start gap-3">
                <Compass className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-primary">North Star Metric</span>
                  <p className="text-base font-semibold mt-0.5 text-foreground">{data.successMetrics.northStar}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary KPIs */}
              {data.successMetrics.primaryKpis && data.successMetrics.primaryKpis.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Primary KPIs
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                    {data.successMetrics.primaryKpis.map((kpi, i) => (
                      <li key={i}>{kpi}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guardrail Metrics */}
              {data.successMetrics.guardrailMetrics && data.successMetrics.guardrailMetrics.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500" /> Guardrail Metrics
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                    {data.successMetrics.guardrailMetrics.map((gm, i) => (
                      <li key={i}>{gm}</li>
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
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="w-5 h-5 text-primary" />
              Target Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {data.targetUsers.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="w-5 h-5 text-primary" />
              Personas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.personas.map((persona, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 border">
                <h4 className="font-semibold text-lg">{persona.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{persona.description}</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Goal:</strong> {persona.goal}</p>
                  <div>
                    <strong className="text-sm">Pain Points:</strong>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground mt-1">
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

      {/* User Stories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-5 h-5 text-primary" />
            User Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {data.userStories.map((story, i) => (
              <li key={i}>{story}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Acceptance Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <CheckSquare className="w-5 h-5 text-primary" />
            Acceptance Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {data.acceptanceCriteria.map((criteria, i) => (
              <li key={i}>{criteria}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* MVP Features & Future Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="w-5 h-5 text-primary" />
              MVP Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {data.mvpFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Rocket className="w-5 h-5 text-primary" />
              Future Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {data.futureFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Risks & Pre-Mortem Analysis (New PM Section) */}
      {data.risksAndMitigations && data.risksAndMitigations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Risks & Pre-Mortem Mitigations
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.risksAndMitigations.map((item, i) => {
              const impactColor = 
                item.impact?.toLowerCase() === 'high' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                item.impact?.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                'bg-blue-500/10 text-blue-600 border-blue-500/20';

              return (
                <div key={i} className="p-4 rounded-xl border bg-muted/30 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-semibold text-foreground text-sm">{item.risk}</span>
                      {item.impact && (
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border shrink-0 ${impactColor}`}>
                          {item.impact} Risk
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-background border text-xs text-muted-foreground">
                    <strong className="text-foreground block mb-0.5">Mitigation:</strong>
                    {item.mitigation}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Suggested APIs & Database Schema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Server className="w-5 h-5 text-primary" />
              Suggested APIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {data.suggestedApis.map((api, i) => (
                <li key={i}>{api}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Database className="w-5 h-5 text-primary" />
              Database Schema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-muted/50 p-4 rounded-lg border whitespace-pre-wrap">
              {data.databaseSchema.join('\n\n')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wireframe Ideas & Sprint Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Layout className="w-5 h-5 text-primary" />
              Wireframe Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.wireframeIdeas.map((wireframe, i) => (
                <div key={i} className="font-mono text-sm bg-muted/50 p-4 rounded-lg border whitespace-pre-wrap">
                  {wireframe}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-5 h-5 text-primary" />
              Sprint Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border-l border-muted-foreground/30 ml-3 space-y-8 pb-4">
              {data.sprintPlan.map((sprint, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5" />
                  <h4 className="font-semibold text-lg">{sprint.week}</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground text-sm">
                    {sprint.tasks.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
