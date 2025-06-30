export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
}

export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  submittedAt: string;
  status: 'analyzing' | 'completed' | 'needs_revision';
}

export interface AIFeedback {
  id: string;
  ideaId: string;
  marketScore: number;
  feasibilityScore: number;
  competitionScore: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  nextSteps: string[];
  marketAnalysis: {
    demand: string;
    trends: string[];
    targetAudience: string;
  };
  competitors: Array<{
    name: string;
    similarity: number;
    differentiation: string;
  }>;
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'tool' | 'template';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
  category: string;
}