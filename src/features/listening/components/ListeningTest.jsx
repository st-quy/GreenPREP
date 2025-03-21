import React, { useState } from 'react';
import { FaHeadphones, FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';

const ListeningTest = () => {
  const [timeRemaining, setTimeRemaining] = useState('40:00');
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const totalQuestions = 17;

  const renderQuestionNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= totalQuestions; i++) {
      numbers.push(
        <button
          key={i}
          className={`w-11 h-11 rounded-xl text-base font-medium flex items-center justify-center relative
            ${currentQuestion === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setCurrentQuestion(i)}
        >
          {i.toString().padStart(2, '0')}
        </button>
      );
    }
    return numbers;
  };

  const renderQuestionContent = () => {
    // Example: Show different question types based on the current question
    if (currentQuestion === 1) {
      return (
        <div className="space-y-4">
          <p className="text-gray-800">A doctor's secretary calls about a change to an appointment. What is changing?</p>
          <p className="text-gray-600 text-sm">Choose only 1 answer:</p>
          
          <div className="space-y-3">
            {['The date', 'The time', 'The place'].map((option, index) => (
              <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
        </div>
      );
    } else if (currentQuestion === 15) {
      return <MultipleMatchingQuestion />;
    }
    // Add more question types as needed
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-3 rounded-lg">
            <FaHeadphones className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold">Listening Test</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Question Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="text-blue-600 font-medium">
                  Part {currentQuestion <= 10 ? '1' : '3'} - Question {currentQuestion}
                </div>
                <button className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm">
                  {currentQuestion === 15 ? 'Mark' : 'Marked'}
                </button>
              </div>

              {renderQuestionContent()}
            </div>

            {/* Audio Controls in separate card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-700 mb-3">Listen audio file here:</p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-gray-50 shadow-sm border border-blue-600">
                  <FaPlay className="text-sm" />
                  <span>Play first time</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 hover:bg-gray-50 shadow-sm border border-blue-600">
                  <FaPlay className="text-sm" />
                  <span>Play second time</span>
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-blue-600 hover:bg-gray-50 bg-white shadow-sm">
                <FaArrowLeft className="text-sm" />
                Previous
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700">
                Next
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className='bg-white rounded-2xl p-8'>
            {/* Timer and Navigation Combined Card */}
            <div className="p-8">
              {/* Timer */}
              <div>
                <h2 className="text-base font-medium text-gray-900">Time Remaining</h2>
                <div className="text-[40px] font-bold text-blue-600">
                  {timeRemaining}
                </div>
                <div className="h-px bg-gray-200 my-6"></div>
              </div>

              {/* Question Navigation */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-4">Question Navigation</h2>
                <div className="grid grid-cols-6 gap-2.5">
                  {[...Array(totalQuestions)].map((_, i) => {
                    const questionNum = i + 1;
                    const isSelected = currentQuestion === questionNum;
                    const hasMarker = [2, 3].includes(questionNum); // Example for questions with markers
                    
                    return (
                      <button
                        key={questionNum}
                        onClick={() => setCurrentQuestion(questionNum)}
                        className={`relative w-11 h-11 rounded-xl text-sm font-medium flex items-center justify-center
                          ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}
                          ${hasMarker ? 'after:absolute after:top-0 after:right-0 after:w-2 after:h-2 after:bg-orange-500 after:rounded-full after:-mt-1 after:-mr-1' : ''}
                        `}
                      >
                        {String(questionNum).padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningTest; 