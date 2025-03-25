import React, { useState } from "react";
import { useQuestionsQuery } from "@features/reading/hooks";
import AnswerType from "../AnswerTypes/AnswerType";
import MarkButton from "../MarkButton";
import RQuestionNavigator from "../ReadingNavigator";

const ReadingParts = () => {
  const { data: exams, isLoading, error } = useQuestionsQuery();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState([]); // Store marked question IDs

  if (isLoading)
    return (
      <div className="bg-white border-2 border-gray-400 shadow-xl rounded-md lg:w-[70%] lg:h-fit lg:p-8">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  if (error)
    return (
      <div className="bg-white border-2 border-gray-400 shadow-xl rounded-md lg:w-[950px] lg:h-fit lg:p-8">
        Error
      </div>
    );
  if (!exams || !exams.Parts || exams.Parts.length === 0)
    return (
      <div className="bg-white border-2 border-gray-400 shadow-xl rounded-md lg:w-[950px] lg:h-fit lg:p-8">
        No exams available.
      </div>
    );

  const currentPart = exams.Parts[currentPartIndex] || { Questions: [] };
  const currentQuestion = currentPart.Questions[currentQuestionIndex] || {};

  const totalQuestions = exams.Parts.reduce(
    (sum, part) => sum + (part.Questions ? part.Questions.length : 0),
    0
  );

  const isLastQuestion =
    currentPartIndex === exams.Parts.length - 1 &&
    currentQuestionIndex === currentPart.Questions.length - 1;

  const handleNavigate = (index) => {
    let questionCount = 0;
    for (let i = 0; i < exams.Parts.length; i++) {
      if (index < questionCount + exams.Parts[i].Questions.length) {
        setCurrentPartIndex(i);
        setCurrentQuestionIndex(index - questionCount);
        return;
      }
      questionCount += exams.Parts[i].Questions.length;
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      if (currentQuestionIndex < currentPart.Questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (currentPartIndex < exams.Parts.length - 1) {
        setCurrentPartIndex(currentPartIndex + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentPartIndex > 0) {
      const prevPartIndex = currentPartIndex - 1;
      setCurrentPartIndex(prevPartIndex);
      setCurrentQuestionIndex(exams.Parts[prevPartIndex].Questions.length - 1);
    }
  };

  const handleSubmit = () => {
    alert("Exam Submitted! 🎉"); // Replace this with actual submit logic
  };

  const toggleMark = (questionId) => {
    setMarkedQuestions(
      (prev) =>
        prev.includes(questionId)
          ? prev.filter((q) => q !== questionId) // Unmark
          : [...prev, questionId] // Mark
    );
  };

  return (
    <div className="question-list">
      <div className="bg-white border-2 border-gray-400 shadow-xl rounded-md lg:w-[950px] lg:h-fit lg:p-8">
        <div className="flex justify-between">
          <h6 className="text-lg font-bold mb-2">{currentPart.Content}</h6>
          <MarkButton questionId={currentQuestion.ID} />
        </div>
        <div className="mb-4">
          <AnswerType question={currentQuestion} />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPartIndex === 0 && currentQuestionIndex === 0}
          className="bg-white text-blue-500 p-2 h-[48px] w-[114px] rounded-3xl"
        >
          Previous
        </button>
        {isLastQuestion ? (
          <button
            className="bg-blue-500 text-white p-2 h-[48px] w-[114px] rounded-3xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white p-2 h-[48px] w-[114px] rounded-3xl"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>

      <RQuestionNavigator
        totalQuestions={totalQuestions}
        onNavigate={handleNavigate}
        markedQuestions={markedQuestions}
      />
    </div>
  );
};

export default ReadingParts;
