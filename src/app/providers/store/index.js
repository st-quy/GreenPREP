import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/auth/authSlice";
import timeSlice from "../reducer/timeSlice";
import sessionSlice from "../reducer/sessions/sessionSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    countdown: timeSlice,
    session: sessionSlice
  },
});

export default store;
