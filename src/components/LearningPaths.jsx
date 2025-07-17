import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle, Play, Plus, Star, TrendingUp, Target, Users } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const LearningPaths = () => {
  const { user, addLearningPath, updateLearningPathProgress } = useUser();
  const [activeTab, setActiveTab] = useState('active');

  const availablePaths = [
    {
      title: 'Modern CSS Mastery',
      description: 'Master CSS Grid, Flexbox, animations, and modern styling techniques',
      skills: ['CSS', 'Flexbox', 'Grid', 'Animations'],
      estimatedHours: 35,
      difficulty: 'Intermediate',
      rating: 4.8,
      students: 12500,
      modules: 8,
      featured: true,
    },
    {
      title: 'JavaScript ES6+ Deep Dive',
      description: 'Learn modern JavaScript features and best practices',
      skills: ['JavaScript', 'ES6+', 'Async/Await', 'Modules'],
      estimatedHours: 45,
      difficulty: 'Intermediate',
      rating: 4.9,
      students: 18200,
      modules: 12,
      featured: false,
    },
    {
      title: 'Web Performance Optimization',
      description: 'Optimize loading times, Core Web Vitals, and user experience',
      skills: ['Performance', 'Optimization', 'Core Web Vitals'],
      estimatedHours: 28,
      difficulty: 'Advanced',
      rating: 4.7,
      students: 8900,
      modules: 6,
      featured: true,
    },
    {
      title: 'Accessibility Best Practices',
      description: 'Build inclusive web applications for all users',
      skills: ['Accessibility', 'ARIA', 'Screen readers'],
      estimatedHours: 32,
      difficulty: 'Intermediate',
      rating: 4.6,
      students: 5400,
      modules: 7,
      featured: false,
    },
  ];

  const completedPaths = [
    {
      title: 'HTML Fundamentals',
      description: 'Master semantic HTML and document structure',
      skills: ['HTML', 'Semantics', 'Forms'],
      estimatedHours: 20,
      completedAt: '2024-01-15',
      rating: 4.5,
    },
  ];

  const startLearningPath = (path) => {
    addLearningPath({
      title: path.title,
      description: path.description,
      skills: path.skills,
      resources: [],
      progress: 0,
      estimatedHours: path.estimatedHours,
    });
  };

  const continueProgress = (pathId, currentProgress) => {
    const newProgress = Math.min(currentProgress + 15, 100);
    updateLearningPathProgress(pathId, newProgress);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderActivePaths = () => (
    <div className="space-y-6">
      {user.learningPaths.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Learning Paths</h3>
          <p className="text-gray-600 mb-6">Start a new learning path to begin your journey</p>
          <button
            onClick={() => setActiveTab('available')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Available Paths
          </button>
        </div>
      ) : (
        user.learningPaths.map((path) => (
          <div key={path.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {path.estimatedHours}h
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {path.progress}% Complete
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{path.progress}%</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {path.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => continueProgress(path.id, path.progress)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Continue</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderAvailablePaths = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {availablePaths.map((path, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-200 hover:shadow-md ${
              path.featured ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                  {path.featured && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{path.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {path.estimatedHours}h
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {path.modules} modules
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {path.students.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{path.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-1">
                {path.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(path.difficulty)}`}>
                {path.difficulty}
              </span>
            </div>

            <button
              onClick={() => startLearningPath(path)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Start Learning Path</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompletedPaths = () => (
    <div className="space-y-6">
      {completedPaths.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Paths Yet</h3>
          <p className="text-gray-600">Complete your first learning path to see it here</p>
        </div>
      ) : (
        completedPaths.map((path, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {path.estimatedHours}h
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Completed {path.completedAt}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{path.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {path.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">Completed</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Certificate
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const tabs = [
    { id: 'active', label: 'Active Paths', count: user.learningPaths.length },
    { id: 'available', label: 'Available Paths', count: availablePaths.length },
    { id: 'completed', label: 'Completed', count: completedPaths.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            {user.learningPaths.reduce((sum, path) => sum + path.progress, 0) / user.learningPaths.length || 0}% Average Progress
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'active' && renderActivePaths()}
        {activeTab === 'available' && renderAvailablePaths()}
        {activeTab === 'completed' && renderCompletedPaths()}
      </div>
    </div>
  );
};

export default LearningPaths;