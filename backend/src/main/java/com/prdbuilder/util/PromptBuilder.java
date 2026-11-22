package com.prdbuilder.util;

public class PromptBuilder {

    public static String buildPrompt(String idea) {
        return """
               Act as a Principal Product Manager.
               Generate a comprehensive, production-ready Product Requirements Document (PRD) for the following idea:
               "%s"
               
               Return ONLY valid JSON matching the following structure:
               {
                   "problemStatement": "",
                   "targetUsers": [],
                   "personas": [
                       {"name": "", "description": "", "goal": "", "painPoints": []}
                   ],
                   "userStories": [],
                   "acceptanceCriteria": [],
                   "mvpFeatures": [],
                   "futureFeatures": [],
                   "suggestedApis": [],
                   "databaseSchema": [],
                   "wireframeIdeas": [],
                   "sprintPlan": [
                       {"week": "", "tasks": []}
                   ],
                   "successMetrics": {
                       "northStar": "",
                       "primaryKpis": [],
                       "guardrailMetrics": []
                   },
                   "risksAndMitigations": [
                       {"risk": "", "impact": "High | Medium | Low", "mitigation": ""}
                   ]
               }
               
               Never return Markdown.
               Never explain anything.
               Never wrap JSON inside markdown code blocks.
               """.formatted(idea);
    }
}
