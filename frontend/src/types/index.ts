export interface Persona {
  name: string;
  description: string;
  goal: string;
  painPoints: string[];
}

export interface SprintTask {
  week: string;
  tasks: string[];
}

export interface SuccessMetrics {
  northStar: string;
  primaryKpis: string[];
  guardrailMetrics: string[];
}

export interface RiskItem {
  risk: string;
  impact: string;
  mitigation: string;
}

export interface PRDChangeLogItem {
  section: string;
  changeDescription: string;
  reason: string;
}

export interface PeerFeedback {
  reviewerRole: string;
  rating: number;
  missingRequirements: string[];
  feedbackNotes: string;
  timestamp: string;
}

export interface PRDResponse {
  version?: number;
  problemStatement: string;
  targetUsers: string[];
  personas: Persona[];
  userStories: string[];
  acceptanceCriteria: string[];
  mvpFeatures: string[];
  futureFeatures: string[];
  suggestedApis: string[];
  databaseSchema: string[];
  wireframeIdeas: string[];
  sprintPlan: SprintTask[];
  successMetrics?: SuccessMetrics;
  risksAndMitigations?: RiskItem[];
  changeLog?: PRDChangeLogItem[];
  feedbackHistory?: PeerFeedback[];
}
