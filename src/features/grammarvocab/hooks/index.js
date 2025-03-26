import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GVocabApi } from "../api.js";

export const useGrammarVocabTest = () => {
  return useQuery({
    queryKey: ["GVQuestions"],
    queryFn: async () => {
      const { data } = await GVocabApi.getQuestions();
      return data;
    },
  });
};
