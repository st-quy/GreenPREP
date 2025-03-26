import React, { useState } from 'react';
import { FaHeadphones, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CountdownTimer from '../../../shared/ui/CountdownTimer';
import QuestionContent from './QuestionContent';
import MarkerButton from '../../../shared/ui/MarkerButton';
import AudioPlayer from './AudioPlayer';
import { useListeningTest } from '../hooks/useListeningTest';
import ButtonNext from '../../../shared/ui/button-next-previous/buttonNext';
import ButtonPrevious from '../../../shared/ui/button-next-previous/buttonPrevious';

/**
 * @typedef {Object} Question
 * @property {boolean} isMarked
 */

const ListeningTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const { questions, isLoading, error, handleToggleMark } = useListeningTest();

  const handleTimeUp = () => {
  };

  const totalQuestions = questions.length;
  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="container mx-auto py-6 max-w-[1550px]">
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
              <div className="flex justify-start">
                <AudioPlayer 
                  audioUrl={currentQuestionData?.audioUrl} 
                  questionId={currentQuestion - 1} 
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-3">
              <ButtonPrevious 
                url={`/listening/${currentQuestion - 1}`}
                isFirstQuestion={currentQuestion === 1}
              />
              <ButtonNext 
                url={`/listening/${currentQuestion + 1}`}
                isLastQuestion={currentQuestion === totalQuestions}
                onSubmitTest={() => {
                  // Handle test submission if needed
                }}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className='bg-white rounded-2xl p-8'>
            {/* Timer Section */}
            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Time Remaining</h2>
              <CountdownTimer onSubmit={handleTimeUp} />
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