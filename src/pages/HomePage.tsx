import React from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { useApp } from '../contexts/AppContext';
import { NavigationPage } from '../hooks/useNavigation';
import { 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Award,
  ArrowRight,
  Star,
  Target,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { state } = useApp();

  const stats = [
    { label: 'Ideas Analyzed', value: '2.4K+', icon: Lightbulb, color: 'text-blue-600' },
    { label: 'Success Rate', value: '84%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Users', value: '1.2K+', icon: Users, color: 'text-purple-600' },
    { label: 'Avg. Score', value: '76', icon: Award, color: 'text-orange-600' },
  ];

  const recentIdeas = state.ideas.slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header title="AI Business Coach" />
      
      <div className="px-4 py-6 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {state.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Your AI-powered business mentor is ready to help you validate and refine your next big idea.
            </p>
          </div>
          
          <Button 
            onClick={() => onNavigate('submit')}
            size="lg"
            className="mb-8"
          >
            Submit New Idea
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <Card hover onClick={() => onNavigate('submit')} className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Submit New Idea</h3>
                  <p className="text-sm text-gray-600">Get AI-powered feedback on your business concept</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>

            <Card hover onClick={() => onNavigate('chat')} className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">AI Mentor Chat</h3>
                  <p className="text-sm text-gray-600">Ask questions and get personalized advice</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Ideas */}
        {recentIdeas.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Ideas</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentIdeas.map((idea) => (
                <Card key={idea.id} hover className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{idea.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {idea.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {idea.category}
                        </span>
                        <div className={`flex items-center space-x-1 ${
                          idea.status === 'completed' ? 'text-green-600' : 
                          idea.status === 'analyzing' ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            idea.status === 'completed' ? 'bg-green-600' : 
                            idea.status === 'analyzing' ? 'bg-blue-600' : 'bg-orange-600'
                          }`} />
                          <span className="text-xs font-medium capitalize">
                            {idea.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {idea.status === 'completed' && (
                      <div className="flex items-center text-yellow-500 ml-4">
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}