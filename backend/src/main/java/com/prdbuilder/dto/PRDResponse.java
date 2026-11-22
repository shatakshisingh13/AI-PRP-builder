package com.prdbuilder.dto;

import java.util.List;

public class PRDResponse {
    private int version = 1;
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
    private SuccessMetrics successMetrics;
    private List<RiskItem> risksAndMitigations;
    private List<PRDChangeLogItem> changeLog;
    private List<PeerFeedback> feedbackHistory;

    public PRDResponse() {}

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public String getProblemStatement() {
        return problemStatement;
    }

    public void setProblemStatement(String problemStatement) {
        this.problemStatement = problemStatement;
    }

    public List<String> getTargetUsers() {
        return targetUsers;
    }

    public void setTargetUsers(List<String> targetUsers) {
        this.targetUsers = targetUsers;
    }

    public List<Persona> getPersonas() {
        return personas;
    }

    public void setPersonas(List<Persona> personas) {
        this.personas = personas;
    }

    public List<String> getUserStories() {
        return userStories;
    }

    public void setUserStories(List<String> userStories) {
        this.userStories = userStories;
    }

    public List<String> getAcceptanceCriteria() {
        return acceptanceCriteria;
    }

    public void setAcceptanceCriteria(List<String> acceptanceCriteria) {
        this.acceptanceCriteria = acceptanceCriteria;
    }

    public List<String> getMvpFeatures() {
        return mvpFeatures;
    }

    public void setMvpFeatures(List<String> mvpFeatures) {
        this.mvpFeatures = mvpFeatures;
    }

    public List<String> getFutureFeatures() {
        return futureFeatures;
    }

    public void setFutureFeatures(List<String> futureFeatures) {
        this.futureFeatures = futureFeatures;
    }

    public List<String> getSuggestedApis() {
        return suggestedApis;
    }

    public void setSuggestedApis(List<String> suggestedApis) {
        this.suggestedApis = suggestedApis;
    }

    public List<String> getDatabaseSchema() {
        return databaseSchema;
    }

    public void setDatabaseSchema(List<String> databaseSchema) {
        this.databaseSchema = databaseSchema;
    }

    public List<String> getWireframeIdeas() {
        return wireframeIdeas;
    }

    public void setWireframeIdeas(List<String> wireframeIdeas) {
        this.wireframeIdeas = wireframeIdeas;
    }

    public List<SprintTask> getSprintPlan() {
        return sprintPlan;
    }

    public void setSprintPlan(List<SprintTask> sprintPlan) {
        this.sprintPlan = sprintPlan;
    }

    public SuccessMetrics getSuccessMetrics() {
        return successMetrics;
    }

    public void setSuccessMetrics(SuccessMetrics successMetrics) {
        this.successMetrics = successMetrics;
    }

    public List<RiskItem> getRisksAndMitigations() {
        return risksAndMitigations;
    }

    public void setRisksAndMitigations(List<RiskItem> risksAndMitigations) {
        this.risksAndMitigations = risksAndMitigations;
    }

    public List<PRDChangeLogItem> getChangeLog() {
        return changeLog;
    }

    public void setChangeLog(List<PRDChangeLogItem> changeLog) {
        this.changeLog = changeLog;
    }

    public List<PeerFeedback> getFeedbackHistory() {
        return feedbackHistory;
    }

    public void setFeedbackHistory(List<PeerFeedback> feedbackHistory) {
        this.feedbackHistory = feedbackHistory;
    }
}
