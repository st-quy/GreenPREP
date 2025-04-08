import React, { useEffect, useState } from "react";

const QuestionMuitipleChoice = ({
  question,
  questionIndex,
  selectedAnswers,
  handleAnswerSelect,
}) => {
  if (!question) return null;

  const [listAnswer, setListAnswer] = useState([]);

  const handleSelectSingle = (key, value) => {
    const existingIndex = listAnswer.findIndex((item) => item.key === key);
    if (existingIndex !== -1) {
      const newList = [...listAnswer];
      newList[existingIndex] = { key, value };
      setListAnswer(newList);
    } else {
      setListAnswer([
        ...listAnswer,
        {
          key,
          value,
        },
      ]);
    }
  };

  useEffect(() => {
    if (listAnswer.length > 0) {
      handleAnswerSelect(question.ID, listAnswer);
    }
  }, [listAnswer]);

  return (
    <div key={question.ID} className="mb-4">
      {question?.GroupContent?.listContent?.length > 0 ? (
        <div>
          {question?.GroupContent?.listContent.map((item, index) => {
            const questionKey = `question-${index}-${questionIndex}`;
            const selectedAnswer = selectedAnswers?.[question.ID]?.find(
              (answer) => answer.key === questionKey
            );

            return (
              <div key={questionKey}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-black font-bold">{item.content}</span>
                </div>
                <div className="my-4">Choose only 1 answer:</div>
                <div className="mt-2">
                  {item.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-6 border rounded-2xl cursor-pointer mb-2 transition-all duration-200 
                        ${
                          selectedAnswer?.value === option
                            ? "!bg-[#EDF2FE] border-solid !border-[#5F5CA4] shadow-md"
                            : "bg-gray-100 border-gray-300 hover:border-blue-400"
                        }`}
                    >
                      <input
                        type="radio"
                        name={questionKey}
                        value={option}
                        checked={selectedAnswer?.value === option}
                        onChange={() => handleSelectSingle(questionKey, option)}
                      />
                      <span
                        className={`ml-3 text-lg font-medium transition-all duration-200
                          ${
                            selectedAnswer?.value === option
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
          })}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2"></div>
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
        </>
      )}
    </div>
  );
};

export default QuestionMuitipleChoice;
