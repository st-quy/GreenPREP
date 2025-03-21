import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextItem, previousItem } from '../../lib/redux/navigationSlice';

// provide the component (Next, previous)
const Navigation = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { currentIndex, totalItems } = useSelector((state) => state.navigation);

  const handlePrevious = () => {
    dispatch(previousItem());
  };

  const handleNext = () => {
    dispatch(nextItem());
  };

  return (
    <div className={`flex justify-center gap-4 ${className}`}>
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`px-6 py-2.5 rounded-full border font-medium transition-all ${
          currentIndex === 0
            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
            : 'border-blue-600 text-blue-600 hover:bg-blue-50'
        }`}
      >
        ← Previous
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === totalItems - 1}
        className={`px-6 py-2.5 rounded-full font-medium transition-all ${
          currentIndex === totalItems - 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Navigation; 