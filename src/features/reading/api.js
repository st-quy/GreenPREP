import axiosInstance from "@shared/config/axios";

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