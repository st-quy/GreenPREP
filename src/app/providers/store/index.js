import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/auth/authSlice";
import timeSlice from "../reducer/timeSlice";
import writingReducer from "@features/writing/writingredux/reducers/writingReducer";

const store = configureStore({
  reducer: {
    auth: authSlice,
    countdown: timeSlice,
    writing: writingReducer,
  },
});

export default store;
