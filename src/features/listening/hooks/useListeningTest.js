import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ListeningApi } from '../api';

export const useListeningTest = () => {
  const queryClient = useQueryClient();
  
  const { data: questions = [], isLoading, error } = useQuery({
    queryKey: ['listeningQuestions'],
    queryFn: async () => {
      try {
        const response = await ListeningApi.getQuestions();
        console.log('API Response:', response);
        
        // Flatten questions from all parts
        const flattenedQuestions = response.data.Parts.flatMap(part => 
          part.Questions.map(question => {
            console.log('Question data:', question);
            console.log('Audio URL from AnswerContent:', question.AnswerContent?.audioKeys);
            
            const audioUrl = question.AnswerContent?.audioKeys;
            if (!audioUrl) {
              console.warn('No audio URL found for question:', question.ID);
            }

            return {
              ...question,
              Part: part,
              isMarked: false,
              audioUrl: audioUrl
            };
          })
        );

        console.log('Flattened questions with audio:', flattenedQuestions);
        return flattenedQuestions;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  const handleToggleMark = (questionIndex) => {
    queryClient.setQueryData(['listeningQuestions'], oldData => {
      const currentQuestions = Array.isArray(oldData) ? oldData : [];
      return currentQuestions.map((q, index) => 
        index === questionIndex ? { ...q, isMarked: !q.isMarked } : q
      );
    });
  };

  return {
    questions,
    isLoading,
    error,
    handleToggleMark
  };
}; 