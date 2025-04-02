import axiosInstance from "@shared/config/axios";
import axios from "axios";

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
    return axiosInstance.get(
      "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=LISTENING"
    );
  },
  submitTest: (answers) => {
    return axiosInstance.post("/listening/submit", answers);
  },
  markQuestion: (questionId, isMarked) => {
    return axiosInstance.put(`/listening/questions/${questionId}/mark`, {
      isMarked,
    });
  },
};

export const ReadingApi = {
  getReadingQuestions: () => {
    return axiosInstance.get(
      "/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc?skillName=READING"
    );
  },
  
};

export const AuthApi = {
  login: (credentials) => {
    return axios.post(`https://dev-api-greenprep.onrender.com/api/users/login`, credentials);
  },
  register: (userData) => {
    return axios.post(`https://dev-api-greenprep.onrender.com/api/users/register`, userData);
  },
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post(
        "https://dev-api-greenprep.onrender.com/api/users/forgot-password",
        { email }
      );
      return response.data;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    try {
      const response = await axiosInstance.post(
        "https://dev-api-greenprep.onrender.com/api/users/reset-password",
        { 
          token,
          newPassword
        }
      );
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No token found');
      }

      const decodedToken = await import('jwt-decode').then(module => module.jwtDecode(token));
      const userId = decodedToken.userId;
      
      // Gọi API logout với token trong header
      await axios.post(
        `https://dev-api-greenprep.onrender.com/api/users/logout/${userId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Xóa token khỏi localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      console.error("Logout error:", error);
      // Dù có lỗi vẫn xóa token
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return { success: true, message: 'Logged out successfully' };
    }
  },
};
