package com.prdbuilder.controller;

import com.prdbuilder.dto.PRDRequest;
import com.prdbuilder.dto.PRDResponse;
import com.prdbuilder.service.PRDService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prd")
@RequiredArgsConstructor
public class PRDController {

    private final PRDService prdService;

    @PostMapping("/generate")
    public ResponseEntity<PRDResponse> generatePRD(@RequestBody PRDRequest request) {
        PRDResponse response = prdService.generatePRD(request);
        return ResponseEntity.ok(response);
    }
}
