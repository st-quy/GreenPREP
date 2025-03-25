import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestion, selectNavigation } from "../navigationSlice";

const MarkBox = ({ questionNumber }) => {
  const dispatch = useDispatch();
  const { currentQuestion, markedQuestions } = useSelector(selectNavigation);

  const isMarked = markedQuestions.includes(questionNumber);
  const isActive = currentQuestion === questionNumber;

  return (
    <button
      onClick={() => dispatch(setCurrentQuestion(questionNumber))}
      className={`px-4 py-2 rounded-md border transition-colors m-1
        ${isActive ? "bg-[#E1580E] text-[#FFFFFF]" : "bg-transparent border-[#F3F4F9]"}
        ${isMarked && !isActive ? "border-[#E1580E] text[#E1580E]" : ""}`}
    >
      {questionNumber}
    </button>
  );
};

MarkBox.defaultProps = {
  questionNumber: 1, 
};

export default MarkBox;
