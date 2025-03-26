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

      <div >


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
                {option.label} {option.text}
              </span>
            </label>
          ))}
        </div>

      </div>
  );
};

export default MultipleChoiceQuestion;