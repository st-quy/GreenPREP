import axiosInstance from "@shared/config/axios";

export const SpeakingApi = {
  getSpeaking: () => {
    return axiosInstance.get(
      "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=SPEAKING"
    );
  },
};
