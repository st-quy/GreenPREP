import React from "react";

const QuestionMuitipleChoice = ({
  question,
  questionIndex,
  selectedAnswers,
  handleAnswerSelect,
}) => {
  if (!question) return null;

  return (
    <div key={question.ID} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-black font-bold">
          {questionIndex + 1}. {question.Content}
        </span>
      </div>
      <div className="my-4">Choose only 1 answer:</div>
      <div className="mt-2">
        {question.AnswerContent.options.map((option, i) => (
          <label
            key={i}
            className={`flex items-center p-6 border rounded-2xl cursor-pointer mb-2 transition-all duration-200 
              ${
                selectedAnswers[question.ID] === option
                  ? "!bg-[#EDF2FE] border-solid !border-[#5F5CA4] shadow-md"
                  : "bg-gray-100 border-gray-300 hover:border-blue-400"
              }`}
          >
            <input
              type="radio"
              name={`question-${question.ID}`}
              value={option}
              checked={selectedAnswers[question.ID] === option}
              onChange={() => handleAnswerSelect(question.ID, option)}
            />
            <span
              className={`ml-3 text-lg font-medium transition-all duration-200
                ${
                  selectedAnswers[question.ID] === option
                    ? "text-[#374151]"
                    : "text-gray-900"
                }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionMuitipleChoice;
