package com.prdbuilder.dto;

import java.util.List;

public class Persona {
    private String name;
    private String description;
    private String goal;
    private List<String> painPoints;

    public Persona() {}

    public Persona(String name, String description, String goal, List<String> painPoints) {
        this.name = name;
        this.description = description;
        this.goal = goal;
        this.painPoints = painPoints;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }

    public List<String> getPainPoints() {
        return painPoints;
    }

    public void setPainPoints(List<String> painPoints) {
        this.painPoints = painPoints;
    }
}
