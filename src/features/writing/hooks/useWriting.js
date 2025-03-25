import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

// Helper functions to check specific parts
const isPart1 = (content) => content.startsWith('Part 1:');
const isPart2 = (content) => content.startsWith('Part 2:');
const isPart3 = (content) => content.startsWith('Part 3:');
const isPart4 = (content) => content.startsWith('Part 4:');

// Get the current part number from the URL
export const useWritingPart = (partId) => {
  const queryResult = useQuery({
    queryKey: ['writing', `part-${partId}`, 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');

      const part = data.Parts.find((part) => {
        switch (Number(partId)) {
          case 1:
            return part.Content.startsWith('Part 1:');
          case 2:
            return part.Content.startsWith('Part 2:');
          case 3:
            return part.Content.startsWith('Part 3:');
          case 4:
            return part.Content.startsWith('Part 4:');
          default:
            return false;
        }
      });

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