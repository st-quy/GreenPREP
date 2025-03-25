import { useQuery } from "@tanstack/react-query";
import { getReadingQuestions } from "../api";
import { ReadingApi } from "@features/auth/api";

export const useQuestionsQuery = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: ReadingApi.getQuestions,
    staleTime: 60000, // Cache for 1 minute
  });
};
