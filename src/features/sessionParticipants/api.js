import axiosInstance from "@shared/config/axios";

export const SessionParticipantsApi = {
  getHistoryParticipants: (userId) => {
    return axiosInstance.get(`/session-participants/user/${userId}`);
  },
};




