import React from 'react';

/**
 * Common navigation controls component for handling next/previous actions
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Handler function for next button click
 * @param {Function} props.onPrevious - Handler function for previous button click
 * @param {boolean} props.isFirstQuestion - If true, disables previous button
 * @param {boolean} props.isLastQuestion - If true, disables next button
 * @param {string} [props.className] - Optional CSS classes for custom styling
 * @returns {JSX.Element} Navigation controls with previous and next buttons
 */
const NavigationControls = ({ 
  onNext,  // next handle
  onPrevious,   // previous handle
  isFirstQuestion,  // disabled previous if true
  isLastQuestion,   // disabled next if true
  className        // custom style
}) => (
  <div className={`flex justify-end space-x-3 ${className}`}>
    <button
      onClick={onPrevious}
      disabled={isFirstQuestion}
      className={`px-6 py-2.5 rounded-full border font-medium transition-all ${
        isFirstQuestion ? 'border-gray-200 text-gray-300' : 'border-blue-500 text-blue-500 hover:bg-blue-50'
      }`}
    >
      ← Previous
    </button>

    <button
      onClick={onNext}
      disabled={isLastQuestion}
      className={`px-6 py-2.5 rounded-full font-medium transition-all ${
        isLastQuestion ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      Next →
    </button>
  </div>
);

export default NavigationControls; 