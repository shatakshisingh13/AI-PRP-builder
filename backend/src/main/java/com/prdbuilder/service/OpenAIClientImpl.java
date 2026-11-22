package com.prdbuilder.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class OpenAIClientImpl implements AIClient {

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.model:gemini-3.5-flash}")
    private String model;

    private final RestTemplate restTemplate;

    public OpenAIClientImpl() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    @SuppressWarnings("unchecked")
    public String generatePRD(String prompt) {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new RuntimeException("GEMINI_API_KEY is missing or empty. Please set $env:GEMINI_API_KEY = 'your_key' in your terminal and restart the backend.");
        }

        // Verified active Gemini models with priority on currently available endpoints
        Set<String> candidateModels = new LinkedHashSet<>();
        if (model != null && !model.isBlank()) {
            candidateModels.add(model);
        }
        candidateModels.add("gemini-3.5-flash");
        candidateModels.add("gemini-3.6-flash");
        candidateModels.add("gemini-3.5-flash-lite");
        candidateModels.add("gemini-3.8-flash");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                ),
                "generationConfig", Map.of(
                        "temperature", 0.7
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        Exception lastException = null;

        for (String targetModel : candidateModels) {
            try {
                System.out.println("Calling Gemini API with model: " + targetModel);
                String url = "https://generativelanguage.googleapis.com/v1beta/models/" + targetModel + ":generateContent";
                Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);
                
                if (response == null || !response.containsKey("candidates")) {
                    throw new RuntimeException("Received empty response from Gemini API");
                }

                List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                if (candidates == null || candidates.isEmpty()) {
                    throw new RuntimeException("No candidates returned by Gemini API");
                }

                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                return (String) parts.get(0).get("text");
            } catch (HttpStatusCodeException e) {
                lastException = e;
                int statusCode = e.getStatusCode().value();
                System.err.println("Gemini API (" + targetModel + ") returned HTTP " + statusCode + ": " + e.getResponseBodyAsString());
                
                // If 503 (High Demand), 429 (Rate Limit), or 404 (Not Found/Deprecated), try next available model
                if (statusCode == 503 || statusCode == 429 || statusCode == 404) {
                    System.out.println("Model " + targetModel + " returned " + statusCode + ". Trying fallback model...");
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException ignored) {}
                    continue;
                }
                
                // For other errors (e.g. 401 Invalid Key or 400 Bad Request), fail immediately
                throw new RuntimeException("Gemini API returned " + e.getStatusCode() + ": " + e.getResponseBodyAsString(), e);
            } catch (Exception e) {
                lastException = e;
                System.err.println("Error with model " + targetModel + ": " + e.getMessage());
            }
        }

        throw new RuntimeException("Gemini API request failed across all models. (Last error: " 
                + (lastException != null ? lastException.getMessage() : "Unknown") + ")", lastException);
    }
}
