import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { SessionApi } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateParticipantId, updateSessionId } from "@app/providers/reducer/sessions/sessionSlice";


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
      try {
        const { data } = await SessionApi.createRequest(params);
        return data;
      } catch ({response}) {
        if (response?.data?.error) {
          message.error("Failed to send request");
          return;
        }
        if (response.data.data.status === "pending") {
          sessionStorage.setItem("sessionId", response.data.data?.SessionID);
          sessionStorage.setItem("requestId", response.data.data?.ID);
          navigate("/waiting-for-approval");
        } else{
          message.error(response.data.message || "Failed to send request");
        }
      }
    },
    onSuccess({data}) {
    sessionStorage.setItem("sessionId", data?.SessionID);
    sessionStorage.setItem("requestId", data?.ID);
    dispatch(updateSessionId(data));
    navigate("/waiting-for-approval");
    },
  });
};

export const usePollRequest = (sessionId, requestId) => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  return useQuery({
    queryKey: ["pollRequest"],
    queryFn: async () => {
      try {
        const {data} = await SessionApi.pollRequest(sessionId, userId, requestId);
        if (data.data.sessionParticipant) {
          sessionStorage.setItem("sessionParticipantId", data.data.sessionParticipant.ID);
          dispatch(updateParticipantId(data.data.sessionParticipant.ID));
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


export const useCreateStudentAnswer = () => {
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await SessionApi.postStudentAnswer(params);
      return data;
    },
    onError({response}) {
      message.error("Failed to submit answer");
    },
  });
};


