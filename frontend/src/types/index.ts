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

export interface PRDResponse {
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
}
