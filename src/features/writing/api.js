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




// Example usage:
// const writingData = await getWritingTopic('ef6b69aa-2ec2-4c65-bf48-294fd12e13fc', 'WRITING');
