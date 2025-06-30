import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { useApp } from '../contexts/AppContext';
import { NavigationPage } from '../hooks/useNavigation';
import { 
  Upload, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  DollarSign,
  FileText,
  Sparkles
} from 'lucide-react';

interface SubmitIdeaPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export function SubmitIdeaPage({ onNavigate }: SubmitIdeaPageProps) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    targetMarket: '',
    problemSolving: '',
    businessModel: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    'Technology',
    'Health & Fitness',
    'Consumer Goods',
    'Marketplace',
    'Education',
    'Finance',
    'Entertainment',
    'B2B Services',
    'Other'
  ];

  const steps = [
    { number: 1, title: 'Basic Info', icon: Lightbulb },
    { number: 2, title: 'Market Details', icon: TrendingUp },
    { number: 3, title: 'Business Model', icon: DollarSign },
    { number: 4, title: 'Review', icon: FileText },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newIdea = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      submittedAt: new Date().toISOString(),
      status: 'analyzing' as const,
    };

    dispatch({ type: 'ADD_IDEA', payload: newIdea });
    dispatch({ type: 'SET_CURRENT_IDEA', payload: newIdea });
    
    setIsSubmitting(false);
    onNavigate('dashboard');
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.targetMarket && formData.problemSolving;
      case 3:
        return formData.businessModel;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Submit New Idea" />
      
      <div className="px-4 py-6 pb-24">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                  step.number <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number <= currentStep ? (
                    <step.icon className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
          </p>
        </div>

        <Card className="p-6 mb-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Tell us about your idea</h2>
                <p className="text-gray-600">Start with the basics - what's your big idea?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idea Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., AI-Powered Fitness Coach App"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your business idea in detail. What does it do? How does it work? What makes it unique?"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Market Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Market & Problem</h2>
                <p className="text-gray-600">Help us understand your target market and the problem you're solving</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Market *
                </label>
                <textarea
                  value={formData.targetMarket}
                  onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                  placeholder="Who is your target audience? Demographics, psychographics, market size, etc."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem You're Solving *
                </label>
                <textarea
                  value={formData.problemSolving}
                  onChange={(e) => setFormData({ ...formData, problemSolving: e.target.value })}
                  placeholder="What specific problem does your idea solve? How big is this problem? Why existing solutions aren't sufficient?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Business Model */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <DollarSign className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Business Model</h2>
                <p className="text-gray-600">How will your idea make money?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Model *
                </label>
                <textarea
                  value={formData.businessModel}
                  onChange={(e) => setFormData({ ...formData, businessModel: e.target.value })}
                  placeholder="How will you generate revenue? Subscription, one-time purchase, commission, advertising, etc."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">Pro Tip</h3>
                    <p className="text-sm text-blue-700">
                      Consider multiple revenue streams and think about scalability. The best business models often combine several approaches.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <FileText className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Review Your Submission</h2>
                <p className="text-gray-600">Double-check your information before submitting for AI analysis</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Title</h3>
                  <p className="text-gray-700">{formData.title}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Category</h3>
                  <p className="text-gray-700">{formData.category}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Description</h3>
                  <p className="text-gray-700">{formData.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Target Market</h3>
                  <p className="text-gray-700">{formData.targetMarket}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Problem Solving</h3>
                  <p className="text-gray-700">{formData.problemSolving}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Business Model</h3>
                  <p className="text-gray-700">{formData.businessModel}</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={!isStepValid()}
            >
              Submit for Analysis
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}