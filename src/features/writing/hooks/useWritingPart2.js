import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

export const useWritingPart2 = () => {
  return useQuery({
    queryKey: ['writing', 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
      
      // Find Part 2 from the response
      const part2 = data.Parts.find(part => part.Content.startsWith('Part 2:'));
      
      if (!part2) {
        throw new Error('Part 2 not found');
      }

      // Return only needed fields
      return {
        content: part2.Content,
        subContent: part2.SubContent,
        questions: part2.Questions
      };
    }
  });
}; 