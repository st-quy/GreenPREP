import React, { useState } from 'react';
import { FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const MultipleMatchingQuestion = () => {
  const [answers, setAnswers] = useState({
    1: '',
    2: '',
    3: '',
    4: ''
  });

  const statements = [
    "Parents should better manage their children's diet.",
    "Parents should support their child's interest in sport.",
    "Quiet time can promote children's concentration abilities.",
    "Excessive sleep can be bad for young people."
  ];

  const options = ['Item 1', 'Item 2', 'Item 3'];

  const handleAnswerChange = (statementIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [statementIndex + 1]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-gray-800">
          Listen to two parents discussing the issue of children's health. Read the opinions below and decide
          whose opinion matches the statements: the man, the woman, or both the man and the woman. You can
          listen to the discussion twice.
        </p>
        <p className="font-medium text-gray-800">Who expresses which opinion?</p>

        <div className="space-y-4">
          {statements.map((statement, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{index + 1}.</span>
                <p className="text-gray-800">{statement}</p>
              </div>
              <select
                value={answers[index + 1]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select answer</option>
                {options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}

    </div>
  );
};

export default MultipleMatchingQuestion; 