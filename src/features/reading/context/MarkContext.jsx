import { createContext, useContext, useState } from "react";

const MarkContext = createContext();

export const useMarkContext = () => useContext(MarkContext);

export const MarkProvider = ({ children }) => {
  const [markedQuestions, setMarkedQuestions] = useState([]);

  const toggleMark = (questionId) => {
    setMarkedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((q) => q !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <MarkContext.Provider value={{ markedQuestions, toggleMark }}>
      {children}
    </MarkContext.Provider>
  );
};
