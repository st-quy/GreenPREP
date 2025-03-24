import React from 'react';

const MultipleChoiceQuestion = ({ options }) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
          <input
            type="checkbox"
            value={option}
            className="w-4 h-4 text-blue-600"
          />
          <span className="ml-3">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion; 