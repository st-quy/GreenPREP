import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  requestId: null
};

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    updateSessionId(state, { payload }) {
      state.sessionId = payload.SessionID;
      state.requestId = payload.ID;
    },
  },
});
const { reducer, actions } = sessionSlice;
export const { updateSessionId } = actions;
export default reducer;
