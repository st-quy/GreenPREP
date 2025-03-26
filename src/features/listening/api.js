import axiosInstance from "@shared/config/axios";

export const ListeningApi = {
    getQuestions: () => {
      return axiosInstance.get("/listening/questions");
    },
    submitTest: (answers) => {
      return axiosInstance.post("/listening/submit", answers);
    },
    markQuestion: (questionId, isMarked) => {
      return axiosInstance.put(`/listening/questions/${questionId}/mark`, { isMarked });
    }
  }; 