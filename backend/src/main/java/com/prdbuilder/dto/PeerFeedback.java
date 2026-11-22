package com.prdbuilder.dto;

import java.util.List;

public class PeerFeedback {
    private String reviewerRole;
    private int rating;
    private List<String> missingRequirements;
    private String feedbackNotes;
    private String timestamp;

    public PeerFeedback() {}

    public PeerFeedback(String reviewerRole, int rating, List<String> missingRequirements, String feedbackNotes, String timestamp) {
        this.reviewerRole = reviewerRole;
        this.rating = rating;
        this.missingRequirements = missingRequirements;
        this.feedbackNotes = feedbackNotes;
        this.timestamp = timestamp;
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

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
