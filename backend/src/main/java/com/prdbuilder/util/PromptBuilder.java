package com.prdbuilder.util;

public class PromptBuilder {

    public static String buildPrompt(String idea) {
        return """
               Act as a Senior Product Manager.
               Generate a complete Product Requirements Document (PRD) for the following idea:
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
                   ]
               }
               
               Never return Markdown.
               Never explain anything.
               Never wrap JSON inside markdown code blocks.
               """.formatted(idea);
    }
}
