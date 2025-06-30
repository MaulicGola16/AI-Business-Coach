import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { ProgressBar } from '../components/UI/ProgressBar';
import { ScoreChart } from '../components/Charts/ScoreChart';
import { useApp } from '../contexts/AppContext';
import { NavigationPage } from '../hooks/useNavigation';
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Calendar,
  Target,
  Award
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { state } = useApp();

  const completedIdeas = state.ideas.filter(idea => idea.status === 'completed');
  const analyzingIdeas = state.ideas.filter(idea => idea.status === 'analyzing');
  const completedMilestones = state.milestones.filter(m => m.completed);
  const progressPercentage = (completedMilestones.length / state.milestones.length) * 100;

  const recentFeedback = state.feedback.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Dashboard" showSearch />
      
      <div className="px-4 py-6 pb-24">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{completedIdeas.length}</div>
            <div className="text-sm text-gray-600">Ideas Analyzed</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{analyzingIdeas.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="mb-4">
            <ProgressBar
              value={progressPercentage}
              color="blue"
              size="lg"
              showLabel
              label="Overall Progress"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {completedMilestones.length}
              </div>
              <div className="text-sm text-gray-600">Milestones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </Card>

        {/* Recent Analysis */}
        {recentFeedback.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Analysis</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>

            <div className="space-y-4">
              {recentFeedback.map((feedback) => {
                const idea = state.ideas.find(i => i.id === feedback.ideaId);
                return (
                  <Card key={feedback.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{idea?.title}</h3>
                        <p className="text-sm text-gray-600">{idea?.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600 mb-1">
                          {feedback.overallScore}
                        </div>
                        <div className="text-xs text-gray-500">Overall Score</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Market</span>
                        <span className="font-medium">{feedback.marketScore}/100</span>
                      </div>
                      <ProgressBar value={feedback.marketScore} color="blue" size="sm" />
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Feasibility</span>
                        <span className="font-medium">{feedback.feasibilityScore}/100</span>
                      </div>
                      <ProgressBar value={feedback.feasibilityScore} color="green" size="sm" />
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Analysis
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Ideas */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">All Ideas</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('submit')}
            >
              Add New
            </Button>
          </div>

          <div className="space-y-3">
            {state.ideas.map((idea) => (
              <Card key={idea.id} hover className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        idea.status === 'completed' 
                          ? 'bg-green-100 text-green-700'
                          : idea.status === 'analyzing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {idea.status.replace('_', ' ')}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                      {idea.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(idea.submittedAt).toLocaleDateString()}</span>
                      </div>
                      <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {idea.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {idea.status === 'completed' && (
                      <Award className="w-5 h-5 text-yellow-500" />
                    )}
                    {idea.status === 'analyzing' && (
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    )}
                    {idea.status === 'needs_revision' && (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h2>
          <div className="space-y-3">
            {state.milestones.map((milestone) => (
              <Card key={milestone.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    milestone.completed 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      milestone.completed ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                    {milestone.completed && milestone.completedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Completed {new Date(milestone.completedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {milestone.category}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}