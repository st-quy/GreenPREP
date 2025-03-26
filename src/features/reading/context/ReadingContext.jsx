// QuestionContext.js
import React, { createContext, useState, useContext } from "react";
import { useQuestionsQuery } from "../hooks";

const ReadingContext = createContext(null);

export const ReadingProvider = ({ children }) => {
  // Fetch exam data
  const { data: exams, isLoading, error } = useQuestionsQuery();

  // State management
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState([]);

  // Early return if data is unavailable
  if (isLoading || error || !exams?.Parts?.length) {
    return <div>Loading...</div>; // Hoặc có thể return null
  }

  // Extract current part and question
  const currentPart = exams.Parts[currentPartIndex] || { Questions: [] };
  const currentQuestion = currentPart.Questions[currentQuestionIndex] || {};

  // Derived values
  const isPart2 = currentPart.Content?.includes("Part 2") || false;
  const totalQuestions =
    exams?.Parts?.reduce(
      (sum, part) => sum + (part.Questions?.length || 0),
      0
    ) || 0;
  const isLastQuestion =
    currentPartIndex === exams.Parts.length - 1 &&
    currentQuestionIndex === currentPart.Questions.length - 1;

  // Event Handlers
  const toggleMark = (questionId) => {
    setMarkedQuestions((prev) => {
      const newMarks = new Set(prev);
      newMarks.has(questionId)
        ? newMarks.delete(questionId)
        : newMarks.add(questionId);
      return Array.from(newMarks);
    });
  };

  const handleNavigate = (index) => {
    let questionCount = 0;
    const partIndex = exams.Parts.findIndex((part) => {
      if (index < questionCount + part.Questions.length) return true;
      questionCount += part.Questions.length;
      return false;
    });

    if (partIndex !== -1) {
      setCurrentPartIndex(partIndex);
      setCurrentQuestionIndex(
        index - (questionCount - exams.Parts[partIndex].Questions.length)
      );
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      if (currentQuestionIndex < currentPart.Questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setCurrentPartIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentPartIndex > 0) {
      setCurrentPartIndex((prev) => prev - 1);
      setCurrentQuestionIndex(
        exams.Parts[currentPartIndex - 1].Questions.length - 1
      );
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Exam:", { exams, markedQuestions });
    alert("Exam Submitted! 🎉");
  };

  return (
    <ReadingContext.Provider
      value={{
        exams,
        isLoading,
        error,
        currentPart,
        currentQuestion,
        isPart2,
        isLastQuestion,
        totalQuestions,
        markedQuestions,
        toggleMark,
        handleNavigate,
        handleNext,
        handlePrev,
        handleSubmit,
        currentPartIndex,
        currentQuestionIndex,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReadingContext = () => {
  return useContext(ReadingContext);
};
