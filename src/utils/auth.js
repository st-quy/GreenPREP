import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'https://dev-api-greenprep.onrender.com/api';

export const getAccessToken = () => {
  try {
    const token = localStorage.getItem('access_token');
    return token ? token : null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getUserFromToken = () => {
  try {
    const token = getAccessToken();
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Hàm helper để tạo config với token
const getAuthConfig = () => {
  const token = getAccessToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Lấy thông tin user từ API
export const getDataFromApi = async (userId) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_URL}/users/${userId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Cập nhật thông tin user
export const updateDataFromApi = async (userId, userData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Cập nhật mật khẩu
export const changePasswordFromApi = async (userId, { oldPassword, newPassword }) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(
      `${API_URL}/users/${userId}/change-password`,
      {
        oldPassword,
        newPassword
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

 

