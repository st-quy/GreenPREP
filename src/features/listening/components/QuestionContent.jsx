import React from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';
import FormCompletionQuestion from './FormCompletionQuestion';

const QuestionContent = ({ questionData }) => {
  if (!questionData) return null;

  const questionTypes = {
    single_choice: {
      title: 'Choose only 1 answer:',
      component: <SingleChoiceQuestion options={questionData.answer.options} />
    },
    multiple_choice: {
      title: 'Choose all correct answers:',
      component: <MultipleChoiceQuestion options={questionData.answer.options} />
    },
    multiple_matching: {
      title: 'Match the statements with the correct options:',
      component: <MultipleMatchingQuestion question={questionData.question} answer={questionData.answer} />
    },
    form_completion: {
      title: 'Fill in the blanks:',
      component: <FormCompletionQuestion fields={questionData.answer.fields} />
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