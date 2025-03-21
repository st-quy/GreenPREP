import React, { useState } from 'react';
import { FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const MultipleMatchingQuestion = ({ question, answer }) => {
  const [answers, setAnswers] = useState(
    Object.fromEntries(
      Array.from({ length: question.statements.length }, (_, i) => [i + 1, ''])
    )
  );

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
          {question.description}
        </p>
        <p className="font-medium text-gray-800">{question.title}</p>

        <div className="space-y-4">
          {question.statements.map((statement, index) => (
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
                {answer.options.map((option, optIndex) => (
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