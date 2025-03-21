import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIndex: 0,
  totalItems: 0,
  type: '', // 'grammar', 'listening', 'writing', etc.
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    nextItem: (state) => {
      if (state.currentIndex < state.totalItems - 1) {
        state.currentIndex += 1;
      }
    },
    previousItem: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    resetNavigation: (state) => {
      state.currentIndex = 0;
    },
  },
});

export const {
  setCurrentIndex,
  setTotalItems,
  setType,
  nextItem,
  previousItem,
  resetNavigation,
} = navigationSlice.actions;

export default navigationSlice.reducer; 