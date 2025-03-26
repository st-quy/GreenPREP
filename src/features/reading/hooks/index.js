import { useQuery } from "@tanstack/react-query";
import { ReadingApi } from "@features/auth/api";

export const useQuestionsQuery = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const { data } = await ReadingApi.getReadingQuestions();
      return data;
    },
  });
};
