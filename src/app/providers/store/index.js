import { configureStore } from "@reduxjs/toolkit";
import timeSlice from "../reducer/timeSlice";
const store = configureStore({
  reducer: {
    countdown: timeSlice,
  },
});

export default store;
