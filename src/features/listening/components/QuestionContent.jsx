import React from 'react';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';

const QuestionContent = ({ questionData }) => {
  if (!questionData) return null;

  const questionTypes = {
    single_choice: {
      title: 'Choose only 1 answer:',
      component: (
        <div className="space-y-3">
          {questionData.answer.options.map((option, index) => (
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
          {questionData.answer.options.map((option, index) => (
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
      component: <MultipleMatchingQuestion question={questionData.question} answer={questionData.answer} />
    },
    form_completion: {
      title: 'Fill in the blanks:',
      component: (
        <div className="space-y-3">
          {questionData.answer.fields.map((field, index) => (
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

  const questionType = questionTypes[questionData.type];
  if (!questionType) {
    return <div className="text-center py-8 text-red-600">Invalid question type</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-800">{questionData.question}</p>
      <p className="text-gray-600 text-sm">{questionType.title}</p>
      {questionType.component}
    </div>
  );
};

export default QuestionContent; 