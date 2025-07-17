import React, { useState } from 'react';
import { BookOpen, ExternalLink, Star, Plus, Search, Filter, Tag, Heart, Clock, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Resources = () => {
  const { user, saveResource } = useUser();
  const [activeTab, setActiveTab] = useState('saved');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const discoverResources = [
    {
      title: 'React Documentation',
      url: 'https://react.dev',
      type: 'documentation',
      tags: ['React', 'JavaScript', 'Components'],
      rating: 5,
      description: 'The official React documentation with comprehensive guides and API reference.',
      author: 'React Team',
      readTime: '15 min',
      trending: true,
    },
    {
      title: 'CSS Grid Complete Guide',
      url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      type: 'article',
      tags: ['CSS', 'Grid', 'Layout'],
      rating: 5,
      description: 'A comprehensive guide to CSS Grid with examples and best practices.',
      author: 'CSS-Tricks',
      readTime: '20 min',
      trending: false,
    },
    {
      title: 'TypeScript Deep Dive',
      url: 'https://basarat.gitbook.io/typescript/',
      type: 'course',
      tags: ['TypeScript', 'JavaScript', 'Types'],
      rating: 4,
      description: 'In-depth TypeScript course covering advanced concepts and patterns.',
      author: 'Basarat Ali Syed',
      readTime: '4 hours',
      trending: true,
    },
    {
      title: 'Web Performance Optimization',
      url: 'https://web.dev/performance/',
      type: 'article',
      tags: ['Performance', 'Optimization', 'Core Web Vitals'],
      rating: 5,
      description: 'Learn how to optimize your web applications for better performance.',
      author: 'Google Developers',
      readTime: '25 min',
      trending: false,
    },
    {
      title: 'Accessibility Guidelines',
      url: 'https://www.w3.org/WAI/WCAG21/quickref/',
      type: 'documentation',
      tags: ['Accessibility', 'WCAG', 'A11y'],
      rating: 4,
      description: 'Complete accessibility guidelines for web content.',
      author: 'W3C',
      readTime: '30 min',
      trending: false,
    },
  ];

  const resourceTypes = [
    { value: '', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'course', label: 'Courses' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'tool', label: 'Tools' },
  ];

  const allTags = Array.from(
    new Set([
      ...user.savedResources.flatMap(resource => resource.tags),
      ...discoverResources.flatMap(resource => resource.tags)
    ])
  ).sort();

  const filteredSavedResources = user.savedResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesTag = !selectedTag || resource.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const filteredDiscoverResources = discoverResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesTag = !selectedTag || resource.tags.includes(selectedTag);
    return matchesSearch && matchesType && matchesTag;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'video': return <BookOpen className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      case 'tool': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'course': return 'bg-green-100 text-green-800';
      case 'documentation': return 'bg-gray-100 text-gray-800';
      case 'tool': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderSavedResources = () => (
    <div className="space-y-4">
      {filteredSavedResources.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Resources</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedType || selectedTag 
              ? 'Try adjusting your filters' 
              : 'Discover and save resources to build your personal library'}
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Discover Resources
          </button>
        </div>
      ) : (
        filteredSavedResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                    {resource.rating && (
                      <div className="flex items-center space-x-1">
                        {renderStars(resource.rating)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderDiscoverResources = () => (
    <div className="space-y-4">
      {filteredDiscoverResources.map((resource, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                {getTypeIcon(resource.type)}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                  {resource.trending && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {resource.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{resource.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(resource.rating)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => saveResource(resource)}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Save</span>
              </button>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {resource.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(resource.type)}`}>
              {resource.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {user.savedResources.length} saved resources
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'saved'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved Resources
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {user.savedResources.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'discover'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Discover
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {discoverResources.length}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {resourceTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'saved' && renderSavedResources()}
        {activeTab === 'discover' && renderDiscoverResources()}
      </div>
    </div>
  );
};

export default Resources;