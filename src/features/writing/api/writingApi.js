import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getWritingPart1 = async () => {
  const response = await axios.get(`${API_URL}/writing/part1`);
  return response.data;
};

export const getWritingPart2 = async () => {
  const response = await axios.get(`${API_URL}/writing/part2`);
  return response.data;
};

export const getWritingPart3 = async () => {
  const response = await axios.get(`${API_URL}/writing/part3`);
  return response.data;
};

export const getWritingPart4 = async () => {
  const response = await axios.get(`${API_URL}/writing/part4`);
  return response.data;
}; 