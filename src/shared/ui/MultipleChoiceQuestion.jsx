import { useState, useEffect } from 'react';

const MultipleChoiceQuestion = ({
  questionNumber,
  partNumber,
  options,
  question,
  selectedAnswer,
  handleAnswerSelect,
}) => {
  

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        {/* Question Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-600">
            Part {partNumber} - Question {questionNumber}
          </h2>
        </div>

        {/* Question Text */}
        <p className="text-gray-800 mb-4">{question}</p>
        <p className="text-gray-600 mb-4">Choose only 1 answer:</p>

        {/* Answer Options */}
        <div className="space-y-4">
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center ${
                selectedAnswer === option.value
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-100'
              } rounded-lg p-4 cursor-pointer hover:bg-blue-50 transition-colors`}
            >
              <input
                type="radio"
                name="answer"
                value={option.value}
                checked={selectedAnswer === option.value}
                onChange={() => handleAnswerSelect(option.value)}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-3 text-gray-800">
                {option.label}. {option.text}
              </span>
            </label>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;