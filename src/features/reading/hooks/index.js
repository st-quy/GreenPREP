import { useQuery } from "@tanstack/react-query";
import { getReadingQuestions } from "../api";

export const useQuestionsQuery = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: getReadingQuestions,
    staleTime: 60000, // Cache for 1 minute
  });
};
