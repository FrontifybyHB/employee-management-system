// features/attendance/adminAttendanceSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    records: [],
    isLoading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 50,
        total: 0,
    },
    filters: {
        startDate: "",
        endDate: "",
        sort: "date", // default sort
    },
};

const adminAttendanceSlice = createSlice({
    name: "adminAttendance",
    initialState,
    reducers: {
        fetchAdminAttendanceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchAdminAttendanceSuccess: (state, action) => {
            state.isLoading = false;
            state.records = action.payload.data;
            state.pagination = {
                page: action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            };
        },
        fetchAdminAttendanceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setAdminAttendanceFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
    },
});

export const {
    fetchAdminAttendanceStart,
    fetchAdminAttendanceSuccess,
    fetchAdminAttendanceFailure,
    setAdminAttendanceFilters,
} = adminAttendanceSlice.actions;

export default adminAttendanceSlice.reducer;
