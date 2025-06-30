import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { ProgressBar } from '../components/UI/ProgressBar';
import { useApp } from '../contexts/AppContext';
import {
  User,
  Mail,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Settings,
  Bell,
  Shield,
  LogOut,
  Edit2,
  Download,
  Star,
  X,
  Save
} from 'lucide-react';

export function ProfilePage() {
  const { state, dispatch } = useApp();
  const [editForm, setEditForm] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
  });

  if (!state.user) return null;

  const completedIdeas = state.ideas.filter(idea => idea.status === 'completed');
  const completedMilestones = state.milestones.filter(m => m.completed);
  const joinDate = new Date(state.user.joinDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const achievements = [
    { 
      id: '1', 
      title: 'First Idea', 
      description: 'Submitted your first business idea', 
      earned: true,
      icon: '🚀',
      earnedDate: '2024-01-20'
    },
    { 
      id: '2', 
      title: 'Validator', 
      description: 'Completed market validation for an idea', 
      earned: true,
      icon: '🎯',
      earnedDate: '2024-01-21'
    },
    { 
      id: '3', 
      title: 'High Scorer', 
      description: 'Received an overall score above 80', 
      earned: false,
      icon: '⭐',
      earnedDate: null
    },
    { 
      id: '4', 
      title: 'Milestone Master', 
      description: 'Completed 5 business milestones', 
      earned: false,
      icon: '🏆',
      earnedDate: null
    },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  const handleEditProfile = () => {
    dispatch({ type: 'SHOW_EDIT_PROFILE', payload: true });
  };

  const handleSaveProfile = () => {
    dispatch({ type: 'UPDATE_USER', payload: editForm });
    dispatch({ type: 'SHOW_EDIT_PROFILE', payload: false });
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: state.user?.name || '',
      email: state.user?.email || '',
    });
    dispatch({ type: 'SHOW_EDIT_PROFILE', payload: false });
  };

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleExportData = () => {
    const data = {
      user: state.user,
      ideas: state.ideas,
      feedback: state.feedback,
      milestones: state.milestones,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-coach-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Profile" />
      
      <div className="px-4 py-6 pb-24">
        {/* User Info */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <img
                src={state.user.avatar}
                alt={state.user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button 
                onClick={handleEditProfile}
                className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1">
              {state.showEditProfile ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveProfile} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-semibold text-gray-900">{state.user.name}</h1>
                  <div className="flex items-center space-x-1 text-gray-600 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{state.user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {joinDate}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {!state.showEditProfile && (
            <Button variant="outline" className="w-full" onClick={handleEditProfile}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{completedIdeas.length}</div>
            <div className="text-sm text-gray-600">Ideas Analyzed</div>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{earnedAchievements.length}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </Card>
        </div>

        {/* Progress */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Business Milestones</span>
                <span className="text-sm text-gray-500">
                  {completedMilestones.length}/{state.milestones.length}
                </span>
              </div>
              <ProgressBar
                value={completedMilestones.length}
                max={state.milestones.length}
                color="blue"
                size="md"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Achievement Progress</span>
                <span className="text-sm text-gray-500">
                  {earnedAchievements.length}/{achievements.length}
                </span>
              </div>
              <ProgressBar
                value={earnedAchievements.length}
                max={achievements.length}
                color="purple"
                size="md"
              />
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
          
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-4 p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {achievement.earned && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Notifications</span>
              </div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </button>

            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Privacy & Security</span>
              </div>
            </button>

            <button 
              onClick={handleExportData}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Export Data</span>
              </div>
            </button>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}