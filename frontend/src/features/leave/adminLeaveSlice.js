// features/leave/adminLeaveSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaveRequests: [],
    isLoading: false,
    error: null,
};

const adminLeaveSlice = createSlice({
    name: "adminLeave",
    initialState,
    reducers: {
        fetchLeaveStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchLeaveSuccess: (state, action) => {
            state.isLoading = false;
            state.leaveRequests = action.payload;
        },
        fetchLeaveFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateLeaveStatus: (state, action) => {
            const { id, status } = action.payload;
            const idx = state.leaveRequests.findIndex((req) => req._id === id);
            if (idx !== -1) {
                state.leaveRequests[idx].status = status;
            }
        },
    },
});

export const {
    fetchLeaveStart,
    fetchLeaveSuccess,
    fetchLeaveFailure,
    updateLeaveStatus,
} = adminLeaveSlice.actions;

export default adminLeaveSlice.reducer;
