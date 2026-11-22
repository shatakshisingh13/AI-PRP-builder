package com.prdbuilder.dto;

import java.util.List;

public class PRDRefineRequest {
    private PRDResponse currentPrd;
    private String reviewerRole;
    private int rating;
    private List<String> missingRequirements;
    private String feedbackNotes;

    public PRDRefineRequest() {}

    public PRDResponse getCurrentPrd() {
        return currentPrd;
    }

    public void setCurrentPrd(PRDResponse currentPrd) {
        this.currentPrd = currentPrd;
    }

    public String getReviewerRole() {
        return reviewerRole;
    }

    public void setReviewerRole(String reviewerRole) {
        this.reviewerRole = reviewerRole;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public List<String> getMissingRequirements() {
        return missingRequirements;
    }

    public void setMissingRequirements(List<String> missingRequirements) {
        this.missingRequirements = missingRequirements;
    }

    public String getFeedbackNotes() {
        return feedbackNotes;
    }

    public void setFeedbackNotes(String feedbackNotes) {
        this.feedbackNotes = feedbackNotes;
    }
}
