import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

export const useWritingPart4 = () => {
  return useQuery({
    queryKey: ['writing', 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
      
      // Find Part 4 from the response
      const part4 = data.Parts.find(part => part.Content.startsWith('Part 4:'));
      
      if (!part4) {
        throw new Error('Part 4 not found');
      }

      // Return only needed fields
      return {
        content: part4.Content,
        subContent: part4.SubContent,
        questions: part4.Questions
      };
    }
  });
}; 