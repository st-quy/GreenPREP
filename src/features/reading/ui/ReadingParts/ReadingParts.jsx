import React, { useState } from "react";
import AnswerType from "../AnswerTypes/AnswerType";
import PreviousButton from "../Button/PreviousButton";
import NextButton from "../Button/NextButton";
import SubmitButton from "../Button/SubmitButton";
import ReadingMarkButton from "../ReadingMarkButton/ReadingMarkButton";
import { formatStringWithNewlines } from "@shared/lib/utils/formatString";
import { useReadingContext } from "@features/reading/context/ReadingContext";

const ReadingParts = () => {
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
  } = useReadingContext();

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
