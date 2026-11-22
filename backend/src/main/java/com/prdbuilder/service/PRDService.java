package com.prdbuilder.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prdbuilder.dto.PeerFeedback;
import com.prdbuilder.dto.PRDRefineRequest;
import com.prdbuilder.dto.PRDRequest;
import com.prdbuilder.dto.PRDResponse;
import com.prdbuilder.util.PromptBuilder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class PRDService {

    private final AIClient aiClient;
    private final ObjectMapper objectMapper;

    public PRDService(AIClient aiClient, ObjectMapper objectMapper) {
        this.aiClient = aiClient;
        this.objectMapper = objectMapper;
    }

    public PRDResponse generatePRD(PRDRequest request) {
        String prompt = PromptBuilder.buildPrompt(request.getIdea());
        System.out.println("Calling AI Provider...");
        String aiResponseJson = aiClient.generatePRD(prompt);
        System.out.println("Raw AI Response: " + aiResponseJson);
        
        // Strip Markdown code blocks if the AI ignored instructions
        aiResponseJson = aiResponseJson.trim();
        if (aiResponseJson.startsWith("```json")) aiResponseJson = aiResponseJson.substring(7).trim();
        else if (aiResponseJson.startsWith("```")) aiResponseJson = aiResponseJson.substring(3).trim();
        if (aiResponseJson.endsWith("```")) aiResponseJson = aiResponseJson.substring(0, aiResponseJson.length() - 3).trim();
        
        try {
            return objectMapper.readValue(aiResponseJson, PRDResponse.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to parse AI JSON response", e);
        }
    }

    public PRDResponse refinePRD(PRDRefineRequest request) {
        try {
            String currentPrdJson = objectMapper.writeValueAsString(request.getCurrentPrd());
            String prompt = PromptBuilder.buildRefinePrompt(currentPrdJson, request);
            
            System.out.println("Calling AI Provider for PRD Refinement...");
            String aiResponseJson = aiClient.generatePRD(prompt);
            System.out.println("Raw AI Refined Response: " + aiResponseJson);
            
            aiResponseJson = aiResponseJson.trim();
            if (aiResponseJson.startsWith("```json")) aiResponseJson = aiResponseJson.substring(7).trim();
            else if (aiResponseJson.startsWith("```")) aiResponseJson = aiResponseJson.substring(3).trim();
            if (aiResponseJson.endsWith("```")) aiResponseJson = aiResponseJson.substring(0, aiResponseJson.length() - 3).trim();
            
            PRDResponse refinedPrd = objectMapper.readValue(aiResponseJson, PRDResponse.class);
            
            // Maintain feedback history
            List<PeerFeedback> history = request.getCurrentPrd() != null && request.getCurrentPrd().getFeedbackHistory() != null
                    ? new ArrayList<>(request.getCurrentPrd().getFeedbackHistory())
                    : new ArrayList<>();
            
            history.add(new PeerFeedback(
                request.getReviewerRole(),
                request.getRating(),
                request.getMissingRequirements(),
                request.getFeedbackNotes(),
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm"))
            ));
            refinedPrd.setFeedbackHistory(history);
            
            return refinedPrd;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process PRD refinement JSON", e);
        }
    }

    private String mockResponse() {
        return """
               {
                 "version": 1,
                 "problemStatement": "College students struggle to find affordable late-night food.",
                 "targetUsers": ["Undergraduate students"],
                 "personas": [{"name": "Late-Night Larry", "description": "Student", "goal": "Find food", "painPoints": ["Everything is closed"]}],
                 "userStories": ["As a student, I want to filter by open places"],
                 "acceptanceCriteria": ["Show open restaurants only"],
                 "mvpFeatures": ["Login", "Restaurant list", "Checkout"],
                 "futureFeatures": ["Bill splitting"],
                 "suggestedApis": ["Stripe API", "Google Maps API"],
                 "databaseSchema": ["User (id, name, email)"],
                 "wireframeIdeas": ["Home Screen: Search bar, categories"],
                 "sprintPlan": [{"week": "Week 1", "tasks": ["Database setup"]}],
                 "successMetrics": {
                   "northStar": "Weekly completed late-night orders delivered in < 25 mins",
                   "primaryKpis": ["Order conversion rate > 18%", "30-day user retention > 35%"],
                   "guardrailMetrics": ["Order cancellation rate < 2.5%", "Driver incident reports < 0.1%"]
                 },
                 "risksAndMitigations": [
                   {
                     "risk": "Low restaurant supply after 1 AM",
                     "impact": "High",
                     "mitigation": "Partner with 24/7 cloud kitchens and provide guaranteed order volume stipends."
                   }
                 ]
               }
               """;
    }
}
