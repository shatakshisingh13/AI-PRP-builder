import React, { useState } from 'react';
import { MessageSquare, Star, Check, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface PeerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    reviewerRole: string;
    rating: number;
    missingRequirements: string[];
    feedbackNotes: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  currentVersion: number;
}

const REVIEWER_ROLES = [
  "Staff Software Engineer (Tech Lead)",
  "Principal Product Designer (UX/UI)",
  "Group Product Manager (GPM)",
  "Security & Compliance Architect",
  "QA & Reliability Lead"
];

const SUGGESTED_MISSING_REQUIREMENTS = [
  "Offline Mode & Local Storage Caching",
  "GDPR / Privacy Compliance & Data Erasure",
  "Payment Disputes & Automatic Refund SLA",
  "Concurrency Conflicts & Race Conditions",
  "Audit Trail & Soft Deletes in Data Model",
  "Accessibility & WCAG 2.1 AA Standards",
  "Battery & Telemetry Polling Optimization",
  "Rate Limiting & DDoS Prevention"
];

export const PeerReviewModal: React.FC<PeerReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  currentVersion
}) => {
  const [reviewerRole, setReviewerRole] = useState(REVIEWER_ROLES[0]);
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Offline Mode & Local Storage Caching",
    "Payment Disputes & Automatic Refund SLA"
  ]);
  const [feedbackNotes, setFeedbackNotes] = useState(
    "Overall solid specification. However, we need explicit offline buffering when cellular drops in basements, and we must define how payment pre-authorizations are released if a counterparty cancels."
  );

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      reviewerRole,
      rating,
      missingRequirements: selectedTags,
      feedbackNotes
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-card border rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Peer Review & Requirements Feedback</h3>
              <p className="text-xs text-muted-foreground">Iterate PRD from Version v{currentVersion}.0 to v{currentVersion + 1}.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Reviewer Role */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Reviewer Stakeholder Role
            </label>
            <select
              value={reviewerRole}
              onChange={(e) => setReviewerRole(e.target.value)}
              className="w-full text-sm bg-muted/50 border rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary/20"
            >
              {REVIEWER_ROLES.map((role, i) => (
                <option key={i} value={role}>{role}</option>
              ))}
            </select>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Initial PRD Quality Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-500 hover:scale-110 transition-transform"
                >
                  <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-500' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
              <span className="text-xs text-muted-foreground font-mono ml-2">
                ({rating} out of 5 stars)
              </span>
            </div>
          </div>

          {/* Missing Requirements Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Flag Missing Requirements (Click to Toggle):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_MISSING_REQUIREMENTS.map((tag, i) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all flex items-center gap-1 ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-muted/40 hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Specific Feedback & Engineering Critique
            </label>
            <textarea
              value={feedbackNotes}
              onChange={(e) => setFeedbackNotes(e.target.value)}
              rows={3}
              className="w-full text-sm bg-muted/40 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              placeholder="What specific edge cases or technical gaps need addressing in the next version?"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-2.5 text-xs text-muted-foreground">
            <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>
              Submitting this critique will trigger an automated AI architectural refinement. A new Version v{currentVersion + 1}.0 will be produced with an explicit <strong>Change Log</strong> tracking every modified requirement.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Improved v{currentVersion + 1}.0...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Incorporate Feedback & Generate v{currentVersion + 1}.0
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
