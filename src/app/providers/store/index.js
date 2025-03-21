import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/auth/authSlice";
import timeSlice from "../reducer/timeSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    countdown: timeSlice
  },
});

export default store;
