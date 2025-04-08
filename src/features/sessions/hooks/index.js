import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { SessionApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionId } from "@app/providers/reducer/sessions/sessionSlice";


export const useGetAllSession = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      try {
        const {data} = await SessionApi.getAll();
        return data.data;
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to fetch profile');
        return null;
      }
    },
  });
};


export const useSessionRequest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (params) => {
      const { data } = await SessionApi.createRequest(params);
      return data;
    },
    onSuccess({data}) {
    dispatch(updateSessionId(data));
    navigate("/waiting-for-approval");
    },
    onError({response}) {
      message.error(response.data.error);
    },
  });
};

export const usePollRequest = (sessionId, requestId) => {
  const navigate = useNavigate();
  const {userId} = useSelector((state) => state.auth);

  return useQuery({
    queryKey: ["pollRequest"],
    queryFn: async () => {
      try {
        const {data} = await SessionApi.pollRequest(sessionId, userId, requestId);
        if (data.data.status === "approved") {
          navigate("/introduction");
        } 
        if (data.data.status === "rejected") {
          navigate("/");
          message.error("Your request has been rejected");
        }
        return data.data;
      } catch (error) {
        message.error(error.response?.data?.message);
        return null;
      }
    },
    enabled: !!sessionId,
    refetchInterval: 1000 // poll every 1 second
  });
};