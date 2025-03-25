import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/auth/authSlice";
import timeSlice from "../reducer/timeSlice";
import navigationReducer from "@features/navigation/navigationSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    countdown: timeSlice,
    navigation: navigationReducer,
  },
});

export default store;
