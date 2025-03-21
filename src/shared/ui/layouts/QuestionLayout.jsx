import React from 'react';
import Navigation from '../common/Navigation';

const QuestionLayout = ({ 
  title,
  icon,
  children,
  rightPanel,
  showNavigation = true,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
              {icon && (
                <span className="inline-block mr-3">
                  {icon}
                </span>
              )}
              {title}
            </h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
              {showNavigation && (
                <Navigation className="mt-8" />
              )}
            </div>
          </div>
        </div>

        {/* Right panel */}
        {rightPanel && (
          <div className="w-72">
            {rightPanel}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionLayout; 