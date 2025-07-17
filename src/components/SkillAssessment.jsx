import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Target, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const SkillAssessment = ({ onComplete }) => {
  const { user, updateSkill, addLearningPath } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState({});
  const [goals, setGoals] = useState([]);

  const skillCategories = [
    {
      title: 'Frontend Fundamentals',
      skills: [
        { id: 'html', name: 'HTML', description: 'Semantic markup and structure' },
        { id: 'css', name: 'CSS', description: 'Styling, layouts, and responsive design' },
        { id: 'javascript', name: 'JavaScript', description: 'Core language features and DOM manipulation' },
      ]
    },
    {
      title: 'Frontend Frameworks',
      skills: [
        { id: 'react', name: 'React', description: 'Component-based UI development' },
        { id: 'vue', name: 'Vue.js', description: 'Progressive framework for building UIs' },
        { id: 'angular', name: 'Angular', description: 'Full-featured framework for web apps' },
      ]
    },
    {
      title: 'Development Tools',
      skills: [
        { id: 'typescript', name: 'TypeScript', description: 'Static type checking for JavaScript' },
        { id: 'testing', name: 'Testing', description: 'Unit, integration, and e2e testing' },
        { id: 'accessibility', name: 'Accessibility', description: 'Building inclusive web experiences' },
      ]
    }
  ];

  const learningGoals = [
    'Master React and its ecosystem',
    'Learn TypeScript thoroughly',
    'Improve testing skills',
    'Build full-stack applications',
    'Learn performance optimization',
    'Master CSS Grid and Flexbox',
    'Understand web accessibility',
    'Learn modern build tools',
  ];

  const skillLevels = [
    { value: 0, label: 'No Experience', description: 'Never used this technology' },
    { value: 25, label: 'Beginner', description: 'Basic understanding, can follow tutorials' },
    { value: 50, label: 'Intermediate', description: 'Can build projects independently' },
    { value: 75, label: 'Advanced', description: 'Can solve complex problems and teach others' },
    { value: 100, label: 'Expert', description: 'Deep expertise, can architect solutions' },
  ];

  const handleSkillAssessment = (skillId, level) => {
    setAssessmentData(prev => ({ ...prev, [skillId]: level }));
  };

  const handleGoalToggle = (goal) => {
    setGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const generateRecommendations = () => {
    const weakSkills = Object.entries(assessmentData)
      .filter(([_, level]) => level < 50)
      .map(([skillId, _]) => skillId);

    const learningPaths = [];

    if (weakSkills.includes('react') && goals.includes('Master React and its ecosystem')) {
      learningPaths.push({
        title: 'React Mastery Path',
        description: 'Complete guide to React development from basics to advanced patterns',
        skills: ['React', 'JavaScript', 'TypeScript'],
        resources: [],
        progress: 0,
        estimatedHours: 50,
      });
    }

    if (weakSkills.includes('testing') && goals.includes('Improve testing skills')) {
      learningPaths.push({
        title: 'Testing Excellence',
        description: 'Master unit, integration, and e2e testing for modern web apps',
        skills: ['Testing', 'Jest', 'Cypress'],
        resources: [],
        progress: 0,
        estimatedHours: 30,
      });
    }

    if (weakSkills.includes('typescript') && goals.includes('Learn TypeScript thoroughly')) {
      learningPaths.push({
        title: 'TypeScript Fundamentals',
        description: 'Learn TypeScript from basics to advanced type system features',
        skills: ['TypeScript', 'JavaScript'],
        resources: [],
        progress: 0,
        estimatedHours: 25,
      });
    }

    return learningPaths;
  };

  const completeAssessment = () => {
    // Update user skills
    Object.entries(assessmentData).forEach(([skillId, level]) => {
      const skill = user.skills.find(s => s.name.toLowerCase() === skillId);
      if (skill) {
        updateSkill(skill.id, level);
      }
    });

    // Add recommended learning paths
    const recommendations = generateRecommendations();
    recommendations.forEach(path => addLearningPath(path));

    onComplete();
  };

  const renderSkillAssessment = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill Assessment</h2>
        <p className="text-gray-600">Rate your current level in each technology</p>
      </div>

      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
          <div className="space-y-6">
            {category.skills.map((skill) => (
              <div key={skill.id} className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  {skillLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => handleSkillAssessment(skill.id, level.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                        assessmentData[skill.id] === level.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">{level.label}</div>
                      <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGoalSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Goals</h2>
        <p className="text-gray-600">Select what you want to focus on learning</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningGoals.map((goal) => (
          <button
            key={goal}
            onClick={() => handleGoalToggle(goal)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left flex items-center space-x-3 ${
              goals.includes(goal)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {goals.includes(goal) ? (
              <CheckCircle className="w-5 h-5 text-blue-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span className="font-medium text-gray-900">{goal}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderResults = () => {
    const recommendations = generateRecommendations();
    const weakSkills = Object.entries(assessmentData)
      .filter(([_, level]) => level < 50)
      .map(([skillId, level]) => ({ skill: skillId, level }));

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Results</h2>
          <p className="text-gray-600">Here's your personalized learning plan</p>
        </div>

        {/* Skill Gaps */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-500" />
            Skills to Improve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weakSkills.map(({ skill, level }) => (
              <div key={skill} className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 capitalize">{skill}</span>
                  <span className="text-sm text-orange-600">{level}%</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Paths */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Recommended Learning Paths
          </h3>
          <div className="space-y-4">
            {recommendations.map((path, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{path.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{path.estimatedHours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    { title: 'Skill Assessment', component: renderSkillAssessment },
    { title: 'Learning Goals', component: renderGoalSelection },
    { title: 'Results', component: renderResults },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm font-medium text-gray-700">{steps[currentStep].title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-8">
        {steps[currentStep].component()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={completeAssessment}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <span>Complete Assessment</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillAssessment;