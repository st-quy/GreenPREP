import axios from 'axios';

const BASE_URL = 'https://greenprep-api.onrender.com/api';

export const getWritingTopic = async (topicId, skillName) => {
  try {
    const response = await axios.get(`${BASE_URL}/topics/${topicId}`, {
      params: {
        skillName: skillName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching writing topic:', error);
    throw error;
  }
};

// Example usage:
// const writingData = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
