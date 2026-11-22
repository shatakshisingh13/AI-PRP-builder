package com.prdbuilder.util;

import com.prdbuilder.dto.PRDRefineRequest;

public class PromptBuilder {

    public static String buildPrompt(String idea) {
        return """
               Act as a Principal Product Manager.
               Generate a comprehensive, production-ready Product Requirements Document (PRD) for the following idea:
               "%s"
               
               Return ONLY valid JSON matching the following structure:
               {
                   "version": 1,
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

    public static String buildRefinePrompt(String currentPrdJson, PRDRefineRequest refineRequest) {
        String missingReqs = String.join(", ", refineRequest.getMissingRequirements() != null ? refineRequest.getMissingRequirements() : java.util.List.of());
        int nextVersion = (refineRequest.getCurrentPrd() != null ? refineRequest.getCurrentPrd().getVersion() + 1 : 2);
        
        return """
               Act as a Principal Product Manager leading a formal design and engineering review.
               You have received peer review feedback on the following Product Requirements Document:
               
               %s
               
               PEER REVIEW FEEDBACK RECEIVED:
               - Reviewer Role: %s
               - Reviewer Score: %d / 5 Stars
               - Identified Missing Requirements: [%s]
               - Specific Reviewer Notes / Critique: "%s"
               
               YOUR TASK:
               1. Upgrade and refine the PRD into Version %d.
               2. Seamlessly incorporate the missing requirements into user stories, acceptance criteria, database schema, APIs, and sprint plan.
               3. Populate the "changeLog" array documenting each specific change made based on the peer's feedback, the section modified, and the rationale.
               
               Return ONLY valid JSON adhering to the exact same PRD schema, but with:
               - "version": %d
               - "changeLog": [
                   {"section": "e.g. Acceptance Criteria", "changeDescription": "e.g. Added offline telemetry buffering", "reason": "e.g. Directly addresses Senior Engineer feedback on cellular drops in urban basements"}
                 ]
               
               Never return Markdown.
               Never explain anything.
               Never wrap JSON inside markdown code blocks.
               """.formatted(
                   currentPrdJson,
                   refineRequest.getReviewerRole(),
                   refineRequest.getRating(),
                   missingReqs,
                   refineRequest.getFeedbackNotes() != null ? refineRequest.getFeedbackNotes() : "",
                   nextVersion,
                   nextVersion
               );
    }
}
