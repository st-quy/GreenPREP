import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestion: 1,
  totalQuestions: 25,
  markedQuestions: [],
  answeredQuestions: {}, // Store answers for each question
  testData: null,
  loading: false,
  error: null
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    toggleMarkedQuestion: (state, action) => {
      const questionId = action.payload;
      const index = state.markedQuestions.indexOf(questionId);
      if (index === -1) {
        state.markedQuestions.push(questionId);
      } else {
        state.markedQuestions.splice(index, 1);
      }
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answeredQuestions[questionId] = answer;
    },
    fetchTestDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTestDataSuccess: (state, action) => {
      state.loading = false;
      state.testData = action.payload;
      state.totalQuestions = action.payload.Parts[0].Questions.length;
    },
    fetchTestDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { 
  setCurrentQuestion, 
  toggleMarkedQuestion, 
  setAnswer,
  fetchTestDataStart,
  fetchTestDataSuccess,
  fetchTestDataFailure
} = navigationSlice.actions;

export const selectNavigation = (state) => state.navigation;

export default navigationSlice.reducer;
