package com.prdbuilder.dto;

public class PRDChangeLogItem {
    private String section;
    private String changeDescription;
    private String reason;

    public PRDChangeLogItem() {}

    public PRDChangeLogItem(String section, String changeDescription, String reason) {
        this.section = section;
        this.changeDescription = changeDescription;
        this.reason = reason;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getChangeDescription() {
        return changeDescription;
    }

    public void setChangeDescription(String changeDescription) {
        this.changeDescription = changeDescription;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
