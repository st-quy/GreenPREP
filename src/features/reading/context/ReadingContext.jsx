// Import necessary dependencies
import React, { createContext, useState, useContext } from "react";
import { useQuestionsQuery } from "../hooks";

// Create a context for managing reading questions
const ReadingContext = createContext(null);

export const ReadingProvider = ({ children }) => {
  // Fetch exam data using custom hook
  const { data: exams, isLoading, error } = useQuestionsQuery();

  // State management for current part, question, and marked questions
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState([]);

  // Early return if data is unavailable
  if (isLoading || error || !exams?.Parts?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Extract the current part and question
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

  // Function to toggle mark on a question
  const toggleMark = (questionId) => {
    setMarkedQuestions((prev) => {
      if (prev.includes(questionId)) {
        return prev.filter((id) => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };

  // Function to navigate to a specific question by index
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

  // Function to navigate to the next question
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

  // Function to navigate to the previous question
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

  // Function to handle exam submission
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

// Custom hook to use the ReadingContext
export const useReadingContext = () => {
  return useContext(ReadingContext);
};
