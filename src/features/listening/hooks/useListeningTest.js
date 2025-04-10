import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ListeningApi } from "../api";

export const useListeningTest = () => {
  return useQuery({
    queryKey: ["listeningQuestions"],
    queryFn: async () => {
      const { data } = await ListeningApi.getQuestions();
      return data;
    },
  });
};