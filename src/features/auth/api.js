import axiosInstance from "@shared/config/axios";

export const AuthApi = {
  login: (credentials) => {
    return axiosInstance.post("/users/login", credentials);
  },
  register: (params) => {
    return axiosInstance.post("/users/register", params);
  },
  forgotPassword: (params) => {
    return axiosInstance.post("/users/forgot-password", params);
  },
  resetPassword: (params) => {
    return axiosInstance.post("/users/reset-password", params);
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
