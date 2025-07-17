import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    title: 'Frontend Developer',
    bio: 'Passionate frontend developer with 3+ years of experience building modern web applications.',
    skills: [
      { id: '1', name: 'HTML', level: 90, category: 'Frontend' },
      { id: '2', name: 'CSS', level: 85, category: 'Frontend' },
      { id: '3', name: 'JavaScript', level: 80, category: 'Frontend' },
      { id: '4', name: 'React', level: 75, category: 'Frontend' },
      { id: '5', name: 'TypeScript', level: 60, category: 'Frontend' },
      { id: '6', name: 'Node.js', level: 45, category: 'Backend' },
      { id: '7', name: 'Testing', level: 40, category: 'Testing' },
      { id: '8', name: 'Accessibility', level: 35, category: 'Frontend' },
    ],
    projects: [
      {
        id: '1',
        title: 'E-commerce Dashboard',
        description: 'A comprehensive admin dashboard for e-commerce management with real-time analytics.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        githubUrl: 'https://github.com/example/ecommerce-dashboard',
        liveUrl: 'https://ecommerce-dashboard-demo.com',
        image: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: true,
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates.',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        githubUrl: 'https://github.com/example/task-manager',
        liveUrl: 'https://task-manager-demo.com',
        image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
        featured: false,
      },
    ],
    learningPaths: [
      {
        id: '1',
        title: 'Advanced React Patterns',
        description: 'Master advanced React patterns and performance optimization techniques.',
        skills: ['React', 'TypeScript', 'Performance'],
        resources: [],
        progress: 35,
        estimatedHours: 40,
      },
      {
        id: '2',
        title: 'Full-Stack Testing',
        description: 'Learn comprehensive testing strategies for modern web applications.',
        skills: ['Testing', 'Jest', 'Cypress'],
        resources: [],
        progress: 15,
        estimatedHours: 30,
      },
    ],
    savedResources: [
      {
        id: '1',
        title: 'React Performance Optimization',
        url: 'https://react.dev/learn/render-and-commit',
        type: 'documentation',
        tags: ['React', 'Performance'],
        saved: true,
        rating: 5,
      },
      {
        id: '2',
        title: 'Advanced CSS Grid Techniques',
        url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
        type: 'article',
        tags: ['CSS', 'Grid'],
        saved: true,
        rating: 4,
      },
    ],
    achievements: ['First Project', 'Skill Master', 'Learning Streak'],
    totalPoints: 1250,
    level: 5,
    theme: 'default',
  });

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setUser(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id, data) => {
    setUser(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, ...data } : project
      ),
    }));
  };

  const deleteProject = (id) => {
    setUser(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id),
    }));
  };

  const saveResource = (resource) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      saved: true,
    };
    setUser(prev => ({
      ...prev,
      savedResources: [...prev.savedResources, newResource],
    }));
  };

  const updateSkill = (skillId, level) => {
    setUser(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === skillId ? { ...skill, level } : skill
      ),
    }));
  };

  const addLearningPath = (path) => {
    const newPath = {
      ...path,
      id: Date.now().toString(),
    };
    setUser(prev => ({
      ...prev,
      learningPaths: [...prev.learningPaths, newPath],
    }));
  };

  const updateLearningPathProgress = (pathId, progress) => {
    setUser(prev => ({
      ...prev,
      learningPaths: prev.learningPaths.map(path =>
        path.id === pathId ? { ...path, progress } : path
      ),
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        addProject,
        updateProject,
        deleteProject,
        saveResource,
        updateSkill,
        addLearningPath,
        updateLearningPathProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};