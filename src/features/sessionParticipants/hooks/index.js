import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { SessionParticipantsApi } from "../api";
import { useSelector } from "react-redux";

export const useGetAssessmentHistory = () => {
  const { userId } = useSelector((state) => state.auth);

    return useQuery({
      queryKey: ["AssessmentHistory"],
      queryFn: async () => {
          const {data} = await SessionParticipantsApi.getHistoryParticipants(userId);
          return data.data;
      },
    });
  };