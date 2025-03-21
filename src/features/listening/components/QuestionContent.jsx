import React, { useState } from 'react';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';

const QuestionContent = ({ question, answer, type }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerChange = (value, index) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const renderQuestionByType = () => {
    switch (type) {
      case 'single_choice':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Choose only 1 answer:</p>
            
            <div className="space-y-3">
              {answer.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswers[0] === option}
                    onChange={(e) => handleAnswerChange(e.target.value, 0)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'multiple_choice':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Choose all correct answers:</p>
            
            <div className="space-y-3">
              {answer.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedAnswers[index] === option}
                    onChange={(e) => handleAnswerChange(e.target.checked ? option : null, index)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'form_completion':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Fill in the blanks:</p>
            
            <div className="space-y-3">
              {answer.fields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    type="text"
                    value={selectedAnswers[index] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'sentence_completion':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Complete the sentence:</p>
            
            <div className="space-y-3">
              {answer.sentences.map((sentence, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-700">
                    {sentence.prefix}
                    <input
                      type="text"
                      value={selectedAnswers[index] || ''}
                      onChange={(e) => handleAnswerChange(e.target.value, index)}
                      className="mx-2 px-2 py-1 border-b-2 border-blue-600 focus:outline-none focus:border-blue-800"
                      placeholder="Type your answer"
                    />
                    {sentence.suffix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'multiple_matching':
        return <MultipleMatchingQuestion question={question} answer={answer} />;

      case 'true_false':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Choose True or False:</p>
            
            <div className="space-y-3">
              {answer.statements.map((statement, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-700">{statement}</p>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        value="true"
                        checked={selectedAnswers[index] === 'true'}
                        onChange={(e) => handleAnswerChange(e.target.value, index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2">True</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        value="false"
                        checked={selectedAnswers[index] === 'false'}
                        onChange={(e) => handleAnswerChange(e.target.value, index)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2">False</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'note_completion':
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">Complete the notes:</p>
            
            <div className="space-y-3">
              {answer.notes.map((note, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-gray-700">
                    {note.prefix}
                    <input
                      type="text"
                      value={selectedAnswers[index] || ''}
                      onChange={(e) => handleAnswerChange(e.target.value, index)}
                      className="mx-2 px-2 py-1 border-b-2 border-blue-600 focus:outline-none focus:border-blue-800"
                      placeholder={note.placeholder}
                    />
                    {note.suffix}
                  </p>
                  {note.hint && (
                    <p className="text-sm text-gray-500">{note.hint}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-800">{question}</p>
            <p className="text-gray-600 text-sm">No question type specified</p>
          </div>
        );
    }
  };

  return renderQuestionByType();
};

export default QuestionContent; 