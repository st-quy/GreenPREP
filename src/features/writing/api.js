import axios from "axios";

const client = axios.create({
  baseURL: `https://greenprep-api.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWritingTopic = async () => {
  const response = await client.get(
    "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=WRITING"
  );
  return response.data;
};

// Helper functions to get specific parts
export const getWritingPart = (data, partNumber) => {
  return data.Parts.find(part => part.Content.startsWith(`Part ${partNumber}:`));
};

export const getWritingPart1 = (data) => getWritingPart(data, 1);
export const getWritingPart2 = (data) => getWritingPart(data, 2);
export const getWritingPart3 = (data) => getWritingPart(data, 3);
export const getWritingPart4 = (data) => getWritingPart(data, 4);

// Example usage:
// const writingData = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
