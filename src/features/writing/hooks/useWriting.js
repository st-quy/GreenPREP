import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

export const useWritingPart = () => {
  const queryResult = useQuery({
    queryKey: ['writing', 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic();

      if (!data || !data.Parts || data.Parts.length !== 4) {
        throw new Error('Invalid data structure');
      }

      // Tổ chức data theo từng part
      const organizedData = data.Parts.reduce((acc, part, index) => {
        acc[index + 1] = {
          content: part.Content,
          subContent: part.SubContent,
          questions: part.Questions,
        };
        return acc;
      }, {});

      return organizedData;
    },
  });

  const { data: exams, isLoading, error } = queryResult;

  return {
    exams,
    isLoading,
    error,
  };
};