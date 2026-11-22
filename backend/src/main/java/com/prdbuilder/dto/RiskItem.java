package com.prdbuilder.dto;

public class RiskItem {
    private String risk;
    private String impact;
    private String mitigation;

    public RiskItem() {}

    public RiskItem(String risk, String impact, String mitigation) {
        this.risk = risk;
        this.impact = impact;
        this.mitigation = mitigation;
    }

    public String getRisk() {
        return risk;
    }

    public void setRisk(String risk) {
        this.risk = risk;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public String getMitigation() {
        return mitigation;
    }

    public void setMitigation(String mitigation) {
        this.mitigation = mitigation;
    }
}
