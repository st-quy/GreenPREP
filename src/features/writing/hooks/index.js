import { useQuery, useQueryClient } from "@tanstack/react-query";

import { WritingApi } from "../api.js";

export const useWritingTest = () => {
  return useQuery({
    queryKey: ["writingQuestions"],
    queryFn: async () => {
      const { data } = await WritingApi.getQuestions();
      return data;
    },
  });
};
