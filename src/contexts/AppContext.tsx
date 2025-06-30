import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, BusinessIdea, AIFeedback, ChatMessage, Resource, Milestone } from '../types';
import { mockUser, mockIdeas, mockFeedback, mockResources, mockMilestones } from '../utils/mockData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentIdea: BusinessIdea | null;
  ideas: BusinessIdea[];
  feedback: AIFeedback[];
  chatMessages: ChatMessage[];
  resources: Resource[];
  milestones: Milestone[];
  isLoading: boolean;
  showEditProfile: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENT_IDEA'; payload: BusinessIdea }
  | { type: 'ADD_IDEA'; payload: BusinessIdea }
  | { type: 'ADD_FEEDBACK'; payload: AIFeedback }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'COMPLETE_MILESTONE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SHOW_EDIT_PROFILE'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AppState = {
  user: mockUser,
  isAuthenticated: true,
  currentIdea: null,
  ideas: mockIdeas,
  feedback: mockFeedback,
  chatMessages: [],
  resources: mockResources,
  milestones: mockMilestones,
  isLoading: false,
  showEditProfile: false,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, chatMessages: [] };
    case 'SET_CURRENT_IDEA':
      return { ...state, currentIdea: action.payload };
    case 'ADD_IDEA':
      return { ...state, ideas: [action.payload, ...state.ideas] };
    case 'ADD_FEEDBACK':
      return { ...state, feedback: [action.payload, ...state.feedback] };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'COMPLETE_MILESTONE':
      return {
        ...state,
        milestones: state.milestones.map(milestone =>
          milestone.id === action.payload
            ? { ...milestone, completed: true, completedAt: new Date().toISOString() }
            : milestone
        ),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SHOW_EDIT_PROFILE':
      return { ...state, showEditProfile: action.payload };
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}