import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListeningApi } from '../../auth/api';

export const useListeningTest = () => {
  const queryClient = useQueryClient();
  
  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ['listeningQuestions'],
    queryFn: async () => {
      const { data } = await ListeningApi.getQuestions();
      return data.map(q => ({
        ...q,
        isMarked: false
      }));
    },
  });

  const handleToggleMark = async (questionIndex) => {
    const question = questions[questionIndex];
    try {
      await ListeningApi.markQuestion(question.id, !question.isMarked);
      queryClient.setQueryData(['listeningQuestions'], oldData => {
        const currentQuestions = Array.isArray(oldData) ? oldData : [];
        return currentQuestions.map((q, index) => 
          index === questionIndex ? { ...q, isMarked: !q.isMarked } : q
        );
      });
    } catch (error) {
      console.error('Failed to mark question:', error);
    }
  };

  return {
    questions,
    isLoading,
    error,
    handleToggleMark
  };
}; 