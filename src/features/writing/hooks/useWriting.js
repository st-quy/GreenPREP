import { useQuery } from '@tanstack/react-query';
import { getWritingTopic, getWritingPart } from '../api';



// Get the current part number from the URL
export const useWritingPart = (partId) => {
  const queryResult = useQuery({
    queryKey: ['writing', `part-${partId}`, 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic(); // Fetch the writing topic data

      // Use the helper function from api.js to get the specific part
      const part = getWritingPart(data, partId);

      if (!part) {
        throw new Error(`Part ${partId} not found`);
      }

      return {
        content: part.Content,
        subContent: part.SubContent,
        questions: part.Questions,
      };
    },
  });

  const { data: exams, isLoading, error } = queryResult;

  return {
    exams,
    isLoading,
    error,
    currentPath: partId,
  };
};