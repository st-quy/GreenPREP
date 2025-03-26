import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NavigationApi } from "../../auth/api";
import { useListeningTest } from "./useListeningTest";

export const useNavigationTest = (topicId, questionType = "multiple-choice") => {
  const queryClient = useQueryClient();
  const { questions: listeningQuestions, handleToggleMark } = useListeningTest();

  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ["navigationQuestions", topicId, questionType],
    queryFn: async () => {
      const response = await NavigationApi.getQuestions(topicId, questionType);
      const fetchedQuestions = response.data.map(q => ({
        ...q,
        isMarked: listeningQuestions.find(lq => lq.id === q.id)?.isMarked || false
      }));
      return fetchedQuestions;
    },
    enabled: !!topicId,
  });

  return { questions, isLoading, error, handleToggleMark };
};
