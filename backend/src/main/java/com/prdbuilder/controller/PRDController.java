package com.prdbuilder.controller;

import com.prdbuilder.dto.PRDRefineRequest;
import com.prdbuilder.dto.PRDRequest;
import com.prdbuilder.dto.PRDResponse;
import com.prdbuilder.service.PRDService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class PRDController {

    private final PRDService prdService;

    public PRDController(PRDService prdService) {
        this.prdService = prdService;
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> root() {
        return ResponseEntity.ok(Map.of(
            "status", "Backend is running",
            "frontendUrl", "http://localhost:5173",
            "message", "To use the UI, please open http://localhost:5173 in your browser."
        ));
    }

    @PostMapping("/api/prd/generate")
    public ResponseEntity<PRDResponse> generatePRD(@RequestBody PRDRequest request) {
        PRDResponse response = prdService.generatePRD(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/prd/refine")
    public ResponseEntity<PRDResponse> refinePRD(@RequestBody PRDRefineRequest request) {
        PRDResponse response = prdService.refinePRD(request);
        return ResponseEntity.ok(response);
    }
}
