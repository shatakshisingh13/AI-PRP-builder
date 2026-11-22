package com.prdbuilder.dto;

import java.util.List;

public class SprintTask {
    private String week;
    private List<String> tasks;

    public SprintTask() {}

    public SprintTask(String week, List<String> tasks) {
        this.week = week;
        this.tasks = tasks;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }
}
