import axiosInstance from "@shared/config/axios";

const API_URL = " https://greenprep-api.onrender.com/api/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=multiple-choice&skillName=LISTENING";

export const ListeningApi = {
    getQuestions: () => {
      return axiosInstance.get(`${API_URL}?questionType=multiple-choice&skillName=LISTENING`);
    },
    submitTest: (answers) => {
      return axiosInstance.post(`${API_URL}/submit`, answers);
    },
    markQuestion: (questionId, isMarked) => {
      return axiosInstance.put(`${API_URL}/questions/${questionId}/mark`, { isMarked });
    }
  }; 