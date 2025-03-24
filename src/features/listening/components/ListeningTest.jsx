import React, { useState } from 'react';
import { FaHeadphones, FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CountdownTimer from '../../../shared/ui/CountdownTimer';
import QuestionContent from './QuestionContent';
import MarkerButton from '../../../shared/ui/MarkerButton';

/**
 * @typedef {Object} Question
 * @property {boolean} isMarked
 */

const fetchQuestions = async () => {
  const response = await fetch('src/features/auth/hooks/index.js');
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  const data = await response.json();
  return data.map(q => ({
    ...q,
    isMarked: false
  }));
};

const ListeningTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const queryClient = useQueryClient();
  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ['listeningQuestions'],
    queryFn: fetchQuestions,
  });

  const handleTimeUp = () => {
    alert("Time's up! Please submit your test.");
  };

  const handleToggleMark = (questionIndex) => {
    queryClient.setQueryData(['listeningQuestions'], oldData => {
      const currentQuestions = Array.isArray(oldData) ? oldData : [];
      return currentQuestions.map((q, index) => 
        index === questionIndex ? { ...q, isMarked: !q.isMarked } : q
      );
    });
  };

  const totalQuestions = questions.length;
  const currentQuestionData = questions[currentQuestion - 1];

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
                  Question {currentQuestion}
                </div>
                <MarkerButton 
                  marked={currentQuestionData?.isMarked} 
                  onClick={() => handleToggleMark(currentQuestion - 1)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-8">Loading questions...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">{error.message}</div>
              ) : (
                <QuestionContent questionData={currentQuestionData} />
              )}
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
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-blue-600 hover:bg-gray-50 bg-white shadow-sm"
                onClick={() => setCurrentQuestion(prev => Math.max(1, prev - 1))}
                disabled={currentQuestion === 1}
              >
                <FaArrowLeft className="text-sm" />
                Previous
              </button>
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions, prev + 1))}
                disabled={currentQuestion === totalQuestions}
              >
                Next
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className='bg-white rounded-2xl p-8'>
            {/* Timer Section */}
            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Time Remaining</h2>
              <CountdownTimer onTimeUp={handleTimeUp} />
            </div>

            {/* Question Navigation */}
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-4">Question Navigation</h2>
              <div className="grid grid-cols-6 gap-2.5">
                {questions.map((question, index) => {
                  const questionNum = index + 1;
                  const isSelected = currentQuestion === questionNum;
                  const hasMarker = question.isMarked;
                  
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
  );
};

export default ListeningTest; 