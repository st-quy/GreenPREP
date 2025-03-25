import { useQuery } from '@tanstack/react-query';
import { getWritingTopic } from '../api';

export const useWritingPart3 = () => {
  return useQuery({
    queryKey: ['writing', 'ef6b69aa-2ec2-4c65-bf48-294fd12e13fc'],
    queryFn: async () => {
      const data = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
      
      // Find Part 3 from the response
      const part3 = data.Parts.find(part => part.Content.startsWith('Part 3:'));
      
      if (!part3) {
        throw new Error('Part 3 not found');
      }

      // Return only needed fields
      return {
        content: part3.Content,
        subContent: part3.SubContent,
        questions: part3.Questions
      };
    }
  });
}; 