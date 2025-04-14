import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  requestId: null,
  participantID: null,
  topicData: null,
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
      state.topicData = payload.examSet;
    },
  },
});
const { reducer, actions } = sessionSlice;
export const { updateSessionId, updateParticipantId, updateTopicData } = actions;
export default reducer;
