import React from 'react';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import MultipleChoiceQuestion from '@shared/ui/MultipleChoiceQuestion';
import MultipleMatchingQuestion from './MultipleMatchingQuestion';
import FormCompletionQuestion from './FormCompletionQuestion';

const QuestionContent = ({ questionData, onAnswerSelect, selectedAnswer }) => {
  if (!questionData || !questionData.AnswerContent) {
    return <div>No question data available</div>;
  }

  // Transform options to match MultipleChoiceQuestion component's expected format
  const options = questionData.AnswerContent.options.map((option, index) => ({
    value: String.fromCharCode(65 + index), // A, B, C, etc.
    text: option
  }));

  return (

      <MultipleChoiceQuestion
        questionNumber={parseInt(questionData.Content.split('.')[0]) || 1}
        partNumber={parseInt(questionData.Part.Content.split(' ')[1])}
        options={options}
        question={questionData.Content}
        selectedAnswer={selectedAnswer}
        handleAnswerSelect={onAnswerSelect}
      />

  );
};

export default QuestionContent; 