import React from 'react';
import PropTypes from 'prop-types';

// Common navigation controls for handling next/previous actions
const NavigationControls = ({ 
  onNext,           // next handler
  onPrevious,       // previous handler
  isFirstQuestion,  // disable previous if true
  isLastQuestion,   // disable next if true
  className        // custom styles
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

NavigationControls.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default NavigationControls; 