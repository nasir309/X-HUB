import React, { useState } from 'react';
import { Code } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">DevHub</span>
          </div>
        </div>

        {/* Auth Forms */}
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>

        {/* Features */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Join thousands of developers who are advancing their careers
          </p>
          <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 dark:text-gray-500">
            <div>
              <div className="font-medium">Personalized Learning</div>
              <div>Custom paths for your goals</div>
            </div>
            <div>
              <div className="font-medium">Portfolio Showcase</div>
              <div>Display your best work</div>
            </div>
            <div>
              <div className="font-medium">Progress Tracking</div>
              <div>Monitor your growth</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;