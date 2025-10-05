import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  performanceRecords: [],
  isLoading: false,
  error: null,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    fetchPerformanceStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPerformanceSuccess: (state, action) => {
      state.isLoading = false;
      state.performanceRecords = action.payload;
    },
    fetchPerformanceFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPerformanceReview: (state, action) => {
      state.performanceRecords.push(action.payload);
    },
  },
});

export const {
  fetchPerformanceStart,
  fetchPerformanceSuccess,
  fetchPerformanceFailure,
  addPerformanceReview,
} = performanceSlice.actions;
export default performanceSlice.reducer;