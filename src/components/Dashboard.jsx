import React from 'react';
import { TrendingUp, Target, BookOpen, Trophy, Star, Clock, ArrowRight, Zap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Dashboard = ({ onStartAssessment }) => {
  const { user, updateLearningPathProgress } = useUser();

  const skillsToImprove = user.skills
    .filter(skill => skill.level < 70)
    .sort((a, b) => a.level - b.level)
    .slice(0, 3);

  const recentAchievements = user.achievements.slice(-3);

  const progressUpdate = (pathId, currentProgress) => {
    const newProgress = Math.min(currentProgress + 10, 100);
    updateLearningPathProgress(pathId, newProgress);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100 mb-6">Continue your learning journey and showcase your skills</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-100">Total Points</span>
              <Zap className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold">{user.totalPoints}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-100">Level</span>
              <Trophy className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold">{user.level}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-100">Achievements</span>
              <Star className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold">{user.achievements.length}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={onStartAssessment}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-left group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Assessment</h3>
          <p className="text-gray-600 text-sm">Evaluate your current skills and get personalized recommendations</p>
        </button>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Progress</h3>
          <div className="space-y-2">
            {user.learningPaths.slice(0, 2).map((path) => (
              <div key={path.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{path.title}</span>
                <span className="text-sm font-medium text-green-600">{path.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed React module</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Added new project</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills to Improve */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills to Improve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsToImprove.map((skill) => (
            <div key={skill.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {skill.level < 30 ? 'Beginner' : skill.level < 60 ? 'Intermediate' : 'Advanced'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Learning Paths */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Learning Paths</h2>
        <div className="space-y-4">
          {user.learningPaths.map((path) => (
            <div key={path.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{path.title}</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{path.estimatedHours}h</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{path.description}</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-blue-600">{path.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${path.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {path.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => progressUpdate(path.id, path.progress)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="font-medium text-gray-900">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;