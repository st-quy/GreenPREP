import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, selectNavigation } from "../navigationSlice";
import { StarFilled } from "@ant-design/icons";

const NavigationControl = () => {
  const dispatch = useDispatch();
  const { 
    currentQuestion, 
    totalQuestions, 
    markedQuestions,
    answeredQuestions 
  } = useSelector(selectNavigation);

  const handleQuestionClick = (questionNumber) => {
    dispatch(setCurrentQuestion(questionNumber));
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-semibold">Question Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
          const notAnswer = num === currentQuestion;
          const isAnswered = answeredQuestions[num] !== undefined;
          const isMarked = markedQuestions.includes(num);

          return (
            <div key={num} className="relative">
              <button
                onClick={() => handleQuestionClick(num)}
                className={`w-10 h-10 flex items-center justify-center rounded-md border 
                  ${notAnswer ? "border-2 border-[#3758F9] bg-[#E1E8FF] text-[#3758F9]" 
                    : isAnswered ? "border border-[#0000004D] bg-[#E1E8FF] text-[#1C3FB7]" 
                    : "border border-[#0000004D] bg-[#F9FAFB] text-[#1F2A37]"} 
                  transition-all duration-200
                `}
              >
                {num}
              </button>
              {isMarked && (
                <StarFilled className="absolute bottom-[27px] top-[5px] right-0 text-[#E1580E] text-[11px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationControl;
