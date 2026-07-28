import React from 'react';
import { PRDResponse } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Users, Target, CheckSquare, Zap, Rocket, Server, Database, Layout, Clock, FileText } from 'lucide-react';

interface PRDDashboardProps {
  data: PRDResponse;
}

export const PRDDashboard: React.FC<PRDDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Target className="w-5 h-5 text-primary" />
            Problem Statement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{data.problemStatement}</p>
        </CardContent>
      </Card>

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
