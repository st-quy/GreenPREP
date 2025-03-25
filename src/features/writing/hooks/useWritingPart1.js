import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

export const useWritingPart1 = () => {
  return useQuery({
    queryKey: ['writing', 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
      
      // Find Part 1 from the response
      const part1 = data.Parts.find(part => part.Content.startsWith('Part 1:'));
      
      if (!part1) {
        throw new Error('Part 1 not found');
      }

      // Return only needed fields
      return {
        content: part1.Content,
        subContent: part1.SubContent,
        questions: part1.Questions
      };
    }
  });
}; 