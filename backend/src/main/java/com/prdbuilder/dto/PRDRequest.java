package com.prdbuilder.dto;

public class PRDRequest {
    private String idea;

    public PRDRequest() {}

    public PRDRequest(String idea) {
        this.idea = idea;
    }

    public String getIdea() {
        return idea;
    }

    public void setIdea(String idea) {
        this.idea = idea;
    }
}
