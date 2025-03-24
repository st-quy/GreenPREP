import axiosInstance from "@shared/config/axios";
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
    return axiosInstance.get("/listening/questions");
  },
  submitTest: (answers) => {
    return axiosInstance.post("/listening/submit", answers);
  },
  markQuestion: (questionId, isMarked) => {
    return axiosInstance.put(`/listening/questions/${questionId}/mark`, { isMarked });
  }
}; 
