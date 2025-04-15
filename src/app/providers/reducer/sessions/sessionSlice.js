import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: sessionStorage.getItem("sessionId") || null,
  requestId: sessionStorage.getItem("requestId") || null,
  participantID: sessionStorage.getItem("sessionParticipantId") || null,
  topicId: sessionStorage.getItem("topidId") || null,
};

const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    updateSessionId(state, { payload }) {
      state.sessionId = payload.SessionID;
      state.requestId = payload.ID;
    },
    updateParticipantId(state, { payload }) {
      state.participantID = payload;
    },
    updateTopicData(state, { payload }) {
      state.topicId = payload.examSet;
    },
  },
});
const { reducer, actions } = sessionSlice;
export const { updateSessionId, updateParticipantId, updateTopicData } = actions;
export default reducer;
