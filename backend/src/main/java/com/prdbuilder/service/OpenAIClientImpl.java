package com.prdbuilder.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class OpenAIClientImpl implements AIClient {

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.model}")
    private String model;

    private final RestTemplate restTemplate;

    public OpenAIClientImpl() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    @SuppressWarnings("unchecked")
    public String generatePRD(String prompt) {
        System.out.println("Calling Gemini API Natively...");
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
        
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";
            Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);
            
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            throw new RuntimeException("Error calling Gemini API natively", e);
        }
    }
}
