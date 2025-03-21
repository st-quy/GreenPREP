import React, { useState } from 'react';
import NavigationControls from './common/NavigationControls';

// create a tesing to check how navigation action work
const questions = [
  {
    id: 1,
    content: {
      A: "I enjoy working on challenge project at work",
      B: "So _____ !!"
    },
    options: ["am", "do", "can"]
  },
  {
    id: 2,
    content: {
      A: "_____ you mind closing the window?",
      B: "Not at all"
    },
    options: ["Would", "Will", "Could"]
  },
  {
    id: 3,
    content: {
      A: "They _____ studying English for 2 years",
      B: "That's impressive!"
    },
    options: ["have been", "has been", "are"]
  }
  // Add more questions as needed
];

const NavigationTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <svg className="w-8 h-8 text-blue-500 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          Grammar & Vocabulary Test
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-blue-600 font-medium">Part 1</span>
              <span className="ml-3 text-gray-700">- Question {currentQuestion.id}</span>
            </div>
            
            <div className="space-y-3">
              {Object.entries(currentQuestion.content).map(([key, value]) => (
                <div key={key} className="text-gray-700">
                  <span className="font-medium">{key}:</span> {value}
                </div>
              ))}
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-3 font-medium">Choose only 1 answer:</div>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleSelectAnswer(option)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedAnswers[currentQuestionIndex] === option
                        ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NavigationControls
            className="mt-8"
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstQuestion={currentQuestionIndex === 0}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationTest; 