import React, { useState } from "react";
import AnswerType from "../AnswerTypes/AnswerType";
import PreviousButton from "../Button/PreviousButton";
import NextButton from "../Button/NextButton";
import SubmitButton from "../Button/SubmitButton";
import ReadingMarkButton from "../ReadingMarkButton/ReadingMarkButton";
import { useReading } from "@features/reading/hooks/useReading";
import { formatStringWithNewlines } from "@shared/lib/utils/formatString";

const ReadingParts = () => {
  // const { data: exams, isLoading, error } = useQuestionsQuery();
  // const [currentPartIndex, setCurrentPartIndex] = useState(0);
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [markedQuestions, setMarkedQuestions] = useState([]);

  // if (isLoading)
  //   return (
  //     <div className="w-full rounded-md border-2 border-gray-400 bg-white p-6 shadow-xl md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
  //       <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className="w-full rounded-md border-2 border-gray-400 bg-white p-6 shadow-xl md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
  //       Error
  //     </div>
  //   );
  // if (!exams || !exams.Parts || exams.Parts.length === 0)
  //   return (
  //     <div className="w-full rounded-md border-2 border-gray-400 bg-white p-6 shadow-xl md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
  //       No exams available.
  //     </div>
  //   );

  // const currentPart = exams.Parts[currentPartIndex] || { Questions: [] };
  // const currentQuestion = currentPart.Questions[currentQuestionIndex] || {};
  // const isPart2 = currentPart.Content.includes("Part 2");

  // const isLastQuestion =
  //   currentPartIndex === exams.Parts.length - 1 &&
  //   currentQuestionIndex === currentPart.Questions.length - 1;

  // const totalQuestions = exams.Parts.reduce(
  //   (sum, part) => sum + (part.Questions ? part.Questions.length : 0),
  //   0
  // );

  // const handleNavigate = (index) => {
  //   let questionCount = 0;
  //   for (let i = 0; i < exams.Parts.length; i++) {
  //     if (index < questionCount + exams.Parts[i].Questions.length) {
  //       setCurrentPartIndex(i);
  //       setCurrentQuestionIndex(index - questionCount);
  //       return;
  //     }
  //     questionCount += exams.Parts[i].Questions.length;
  //   }
  // };

  // const handleNext = () => {
  //   if (!isLastQuestion) {
  //     if (currentQuestionIndex < currentPart.Questions.length - 1) {
  //       setCurrentQuestionIndex(currentQuestionIndex + 1);
  //     } else if (currentPartIndex < exams.Parts.length - 1) {
  //       setCurrentPartIndex(currentPartIndex + 1);
  //       setCurrentQuestionIndex(0);
  //     }
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex(currentQuestionIndex - 1);
  //   } else if (currentPartIndex > 0) {
  //     const prevPartIndex = currentPartIndex - 1;
  //     setCurrentPartIndex(prevPartIndex);
  //     setCurrentQuestionIndex(exams.Parts[prevPartIndex].Questions.length - 1);
  //   }
  // };

  // const handleSubmit = () => {
  //   alert("Exam Submitted! 🎉"); // Replace this with actual submit logic
  // };

  const {
    exams,
    isLoading,
    error,
    currentPart,
    currentQuestion,
    isPart2,
    isLastQuestion,
    handleNext,
    handlePrev,
    handleSubmit,
    currentPartIndex,
    currentQuestionIndex,
  } = useReading();

  if (isLoading)
    return (
      <div className="w-full rounded-md shadow-sm border border-gray-200 bg-white p-6  md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
        <div className="w-6 h-6 shadow-sm border border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="w-full rounded-md shadow-sm border border-gray-200 bg-white p-6 md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
        Error
      </div>
    );

  if (!exams || !exams.Parts || exams.Parts.length === 0)
    return (
      <div className="w-full rounded-md shadow-sm border border-gray-200 bg-white p-6 md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
        No exams available.
      </div>
    );

  return (
    <div className="question-list order-2 md:order-1 lg:order-1">
      {isPart2 ? (
        <div>
          <div className="w-full rounded-[20px] bg-white p-6 pb-0 mb-4 shadow-sm border border-gray-200 md:w-[650px] lg:w-[900px] lg:p-8 lg:pb-0 lg:h-fit">
            <div className="mb-4 flex flex-col md:flex-row lg:mb-0 lg:flex-row lg:justify-between">
              <h6 className="mb-2 font-[600] lg:text-[24px]">
                {formatStringWithNewlines(currentPart.Content)}
              </h6>
              <ReadingMarkButton questionId={currentQuestion.ID} />
            </div>
          </div>
          <div className="w-full rounded-[20px] bg-white p-6 shadow-sm border border-gray-200 md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
            <div className="mb-4">
              <AnswerType question={currentQuestion} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-[20px] bg-white p-6 shadow-sm border border-gray-200 md:w-[650px] lg:w-[900px] lg:p-8 lg:h-fit">
          <div className="mb-4 flex flex-col md:flex-row lg:mb-0 lg:flex-row lg:justify-between">
            <h6 className="mb-2 font-[600] lg:text-[24px]">
              {formatStringWithNewlines(currentPart.Content)}
            </h6>
            <ReadingMarkButton questionId={currentQuestion.ID} />
          </div>
          <div className="mb-4">
            <AnswerType question={currentQuestion} />
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <PreviousButton
          event={handlePrev}
          isDisabled={currentPartIndex === 0 && currentQuestionIndex === 0}
        />
        {isLastQuestion ? (
          <SubmitButton event={handleSubmit} />
        ) : (
          <NextButton event={handleNext} />
        )}
      </div>
    </div>
  );
};

export default ReadingParts;
