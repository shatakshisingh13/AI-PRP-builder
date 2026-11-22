package com.prdbuilder.dto;

import java.util.List;

public class SuccessMetrics {
    private String northStar;
    private List<String> primaryKpis;
    private List<String> guardrailMetrics;

    public SuccessMetrics() {}

    public SuccessMetrics(String northStar, List<String> primaryKpis, List<String> guardrailMetrics) {
        this.northStar = northStar;
        this.primaryKpis = primaryKpis;
        this.guardrailMetrics = guardrailMetrics;
    }

    public String getNorthStar() {
        return northStar;
    }

    public void setNorthStar(String northStar) {
        this.northStar = northStar;
    }

    public List<String> getPrimaryKpis() {
        return primaryKpis;
    }

    public void setPrimaryKpis(List<String> primaryKpis) {
        this.primaryKpis = primaryKpis;
    }

    public List<String> getGuardrailMetrics() {
        return guardrailMetrics;
    }

    public void setGuardrailMetrics(List<String> guardrailMetrics) {
        this.guardrailMetrics = guardrailMetrics;
    }
}
