import axiosInstance from "@shared/config/axios";
import axios from "axios";
///Example
export const RequestApi = {
  getAll: () => {
    return axiosInstance.get("/requests");
  },
  update: (record) => {
    return axiosInstance.put(`/requests/${record.id}`, record);
  },
  add: (record) => {
    return axiosInstance.post("/requests", record);
  },
};

export const ListeningApi = {
  getQuestions: () => {
    return axiosInstance.get(
      "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=LISTENING"
    );
  },
  submitTest: (answers) => {
    return axiosInstance.post("/listening/submit", answers);
  },
  markQuestion: (questionId, isMarked) => {
    return axiosInstance.put(`/listening/questions/${questionId}/mark`, {
      isMarked,
    });
  },
};

export const ReadingApi = {
  getReadingQuestions: () => {
    return axiosInstance.get(
      "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=READING"
    );
  },
  getReadingByType: (questionType) => {
    return axiosInstance.get(
      `/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?questionType=${questionType}&skillName=READING`
    );
  },
};

export const AuthApi = {
  login: (credentials) => {
    return axios.post(`https://dev-api-greenprep.onrender.com/api/users/login`, credentials);
  },
  register: (userData) => {
    return axios.post(`https://dev-api-greenprep.onrender.com/api/users/register`, userData);
  },
};
