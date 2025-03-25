const API_URL = 'https://greenprep-api.onrender.com';

export const fetchTestData = async (topicId) => {
  try {
    const response = await fetch(`${API_URL}/api/topics/${topicId}?questionType=multiple-choice`);
    if (!response.ok) {
      throw new Error('Failed to fetch test data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching test data:', error);
    throw error;
  }
};