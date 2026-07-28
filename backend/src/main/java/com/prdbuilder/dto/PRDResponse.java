package com.prdbuilder.dto;

import lombok.Data;
import java.util.List;

@Data
public class PRDResponse {
    private String problemStatement;
    private List<String> targetUsers;
    private List<Persona> personas;
    private List<String> userStories;
    private List<String> acceptanceCriteria;
    private List<String> mvpFeatures;
    private List<String> futureFeatures;
    private List<String> suggestedApis;
    private List<String> databaseSchema;
    private List<String> wireframeIdeas;
    private List<SprintTask> sprintPlan;
}
