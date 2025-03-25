import { useState } from "react";
import { useQuestionsQuery } from "@features/reading/hooks";

export const useReading = () => {
  const { data: exams, isLoading, error } = useQuestionsQuery();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (
    isLoading ||
    error ||
    !exams ||
    !exams.Parts ||
    exams.Parts.length === 0
  ) {
    return { exams, isLoading, error };
  }

  const currentPart = exams.Parts[currentPartIndex] || { Questions: [] };
  const currentQuestion = currentPart.Questions[currentQuestionIndex] || {};
  const isPart2 = currentPart.Content.includes("Part 2");

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
    alert("Exam Submitted! 🎉"); // Thay thế bằng logic submit thực tế
  };

  return {
    exams,
    isLoading,
    error,
    currentPart,
    currentQuestion,
    isPart2,
    isLastQuestion,
    handleNavigate,
    handleNext,
    handlePrev,
    handleSubmit,
    currentPartIndex,
    currentQuestionIndex,
  };
};
