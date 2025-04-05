import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthApi } from "../api"; // You'll need to create this
import { message } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@shared/lib/constants/auth";
import { useNavigate } from "react-router-dom";
import { login } from "@app/providers/reducer/auth/authSlice";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await AuthApi.login(credentials);
      localStorage.setItem(ACCESS_TOKEN, data.data.access_token);
      localStorage.setItem(REFRESH_TOKEN, data.data.refresh_token);
      dispatch(login());
      navigate("/");
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.register(params);
      navigate("/login");
      message.success(data.message);
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
    },
  });
};


export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.forgotPassword(params);
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.resetPassword(params);
      message.success(data.message);
      navigate("/reset-success");
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
      navigate("/reset-password");
    },
  });
};
