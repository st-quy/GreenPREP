import React, { useState, useEffect } from 'react';
import { FaHeadphones, FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';
import CountdownTimer from './CountdownTimer';
import QuestionContent from './QuestionContent';
import Marker from './Marker';

const ListeningTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await fetch('YOUR_API_ENDPOINT/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        // Initialize isMarked property for each question
        const questionsWithMarking = data.map(q => ({
          ...q,
          isMarked: false
        }));
        setQuestions(questionsWithMarking);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleToggleMark = (questionIndex) => {
    setQuestions(prevQuestions => 
      prevQuestions.map((q, index) => 
        index === questionIndex ? { ...q, isMarked: !q.isMarked } : q
      )
    );
  };

  const totalQuestions = questions.length;

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

  const currentQuestionData = questions[currentQuestion - 1];

  const renderQuestionContent = () => {
    if (!currentQuestionData) return null;

    const questionTypes = {
      single_choice: {
        title: 'Choose only 1 answer:',
        component: (
          <div className="space-y-3">
            {currentQuestionData.answer.options.map((option, index) => (
              <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3">{option}</span>
              </label>
            ))}
          </div>
        )
      },
      multiple_choice: {
        title: 'Choose all correct answers:',
        component: (
          <div className="space-y-3">
            {currentQuestionData.answer.options.map((option, index) => (
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
        )
      },
      multiple_matching: {
        title: 'Match the statements with the correct options:',
        component: <MultipleMatchingQuestion question={currentQuestionData.question} answer={currentQuestionData.answer} />
      },
      form_completion: {
        title: 'Fill in the blanks:',
        component: (
          <div className="space-y-3">
            {currentQuestionData.answer.fields.map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
        )
      }
    };

    const questionType = questionTypes[currentQuestionData.type];
    if (!questionType) {
      return <div className="text-center py-8 text-red-600">Invalid question type</div>;
    }

    return (
      <div className="space-y-4">
        <p className="text-gray-800">{currentQuestionData.question}</p>
        <p className="text-gray-600 text-sm">{questionType.title}</p>
        {questionType.component}
      </div>
    );
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
                  Question {currentQuestion}
                </div>
                <Marker 
                  isMarked={currentQuestionData?.isMarked} 
                  onToggle={() => handleToggleMark(currentQuestion - 1)}
                />
              </div>

              {loading ? (
                <div className="text-center py-8">Loading questions...</div>
              ) : error ? (
                <div className="text-center py-8 text-red-600">{error}</div>
              ) : (
                renderQuestionContent()
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
            {/* Timer and Navigation Combined Card */}
            <div className="p-8">
              {/* Timer */}
              <CountdownTimer />

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
    </div>
  );
};

export default ListeningTest; 