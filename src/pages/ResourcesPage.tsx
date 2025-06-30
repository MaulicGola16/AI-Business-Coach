import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Header } from '../components/Layout/Header';
import { useApp } from '../contexts/AppContext';
import { BookOpen, Video, PenTool as Tool, FileText, Search, Filter, ExternalLink, Clock, Star, TrendingUp } from 'lucide-react';

export function ResourcesPage() {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = ['All', 'Market Research', 'Product Development', 'Fundraising', 'Customer Development', 'Finance', 'Marketing'];
  const types = ['All', 'article', 'video', 'tool', 'template'];

  const typeIcons = {
    article: BookOpen,
    video: Video,
    tool: Tool,
    template: FileText,
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const filteredResources = state.resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = state.resources.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Learning Resources" showSearch />
      
      <div className="px-4 py-6 pb-24">
        {/* Hero Section */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <h2 className="text-xl font-semibold mb-2">Accelerate Your Learning</h2>
            <p className="text-blue-100 mb-4">
              Curated resources to help you build, validate, and grow your business ideas.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Resources</div>
              </div>
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-blue-100">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-blue-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Featured Resources */}
        {searchQuery === '' && selectedCategory === 'All' && selectedType === 'All' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Featured Resources
              </h2>
            </div>
            
            <div className="space-y-4">
              {featuredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons];
                return (
                  <Card key={resource.id} hover className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            difficultyColors[resource.difficulty as keyof typeof difficultyColors]
                          }`}>
                            {resource.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{resource.estimatedTime}</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                              {resource.category}
                            </span>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {searchQuery || selectedCategory !== 'All' || selectedType !== 'All' ? 'Search Results' : 'All Resources'}
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredResources.length})
              </span>
            </h2>
          </div>

          {filteredResources.length === 0 ? (
            <Card className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => {
                const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons];
                return (
                  <Card key={resource.id} hover className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-gray-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{resource.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            difficultyColors[resource.difficulty as keyof typeof difficultyColors]
                          }`}>
                            {resource.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{resource.estimatedTime}</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded-full">
                              {resource.category}
                            </span>
                          </div>
                          
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}