import React from 'react';

const Marker = ({ isMarked, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className={`px-3 py-1 rounded-full text-sm transition-colors duration-200
        ${isMarked 
          ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
    >
      {isMarked ? 'Marked' : 'Mark'}
    </button>
  );
};

export default Marker; 