import { useQuery } from "@tanstack/react-query";
import { fetchReadingQuestions } from "../api";

export const useQuestionsQuery = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: fetchReadingQuestions,
    staleTime: 60000, // Cache for 1 minute
  });
};
