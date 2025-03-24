import React, { useState } from 'react';

const MultipleChoiceQuestion = ({ options, onAnswerChange }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleChange = (option) => {
    setSelectedAnswers(prev => {
      const newAnswers = prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option];
      onAnswerChange?.(newAnswers);
      return newAnswers;
    });
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedAnswers.includes(option)}
            onChange={() => handleChange(option)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="ml-3">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default MultipleChoiceQuestion; 