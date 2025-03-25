import axios from "axios";

const client = axios.create({
  baseURL: `https://greenprep-api.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchReadingQuestions = async () => {
  const response = await client.get(
    "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=READING"
  );
  return response.data;
};
