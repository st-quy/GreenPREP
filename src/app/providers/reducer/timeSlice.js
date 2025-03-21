import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeLeft: localStorage.getItem("countdownTime")
    ? parseInt(localStorage.getItem("countdownTime"), 10)
    : 1800, 
};

const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
        localStorage.setItem("countdownTime", state.timeLeft.toString());
      }
    },
    setTime: (state, action) => {
      state.timeLeft = action.payload;
      localStorage.setItem("countdownTime", state.timeLeft.toString());
    },
  },
});

export const { decrementTime, setTime } = countdownSlice.actions;
export default countdownSlice.reducer;
