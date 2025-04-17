import axiosInstance from "@shared/config/axios";

export const SessionApi = {
  getAll: () => {
    return axiosInstance.get("/sessions/all");
  },
  createRequest: (params) => {
    return axiosInstance.post("/session-requests", params);
  },
  pollRequest: (sessionId, studentId, requestId) => {
    return axiosInstance.get(`/session-requests/${sessionId}/student/${studentId}`, {
      params: {
        requestId,
      },
    });
  },
  postStudentAnswer: (params) => {
    return axiosInstance.post(`/student-answers`, params );
  },
  
};




