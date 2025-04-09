import { useMutation, useQuery } from "@tanstack/react-query"
import { SpeakingApi } from "../api"
import { message } from "antd";

export const useCreateAnswer = () => {
    return useMutation({
        mutationFn: async (params) => {
            const { data } = await SpeakingApi.postAnswers(params)
            return data.data;
        },
        onError({ response }) {
            message.error(response?.data?.message || "Post answer error");
        },
    });
}

export const useGetSpeaking = () => {
    return useQuery({
        queryKey: ["speakingData"],
        queryFn: async () => await SpeakingApi.getSpeaking(),
    });
}