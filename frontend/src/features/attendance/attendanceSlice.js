import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    attendanceData: [],       // All attendance records
    todayAttendance: null,    // Today’s check-in/check-out
    isLoading: false,
    error: null,
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        // Fetch attendance
        fetchAttendanceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchAttendanceSuccess: (state, action) => {
            state.isLoading = false;
            state.attendanceData = action.payload;
            state.error = null;
        },
        fetchAttendanceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Fetch today’s attendance
        fetchTodayAttendanceStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchTodayAttendanceSuccess: (state, action) => {
            state.isLoading = false;
            state.todayAttendance = action.payload;
            state.error = null;
        },
        fetchTodayAttendanceFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Check-in
        checkInStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        checkInSuccess: (state, action) => {
            state.isLoading = false;
            state.todayAttendance = action.payload;
            state.attendanceData.push(action.payload);
            state.error = null;
        },
        checkInFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Check-out
        checkOutStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        checkOutSuccess: (state, action) => {
            state.isLoading = false;
            state.todayAttendance = action.payload;
            // Update attendanceData with today's record
            const index = state.attendanceData.findIndex(
                record => record.date === action.payload.date
            );
            if (index !== -1) state.attendanceData[index] = action.payload;
            state.error = null;
        },
        checkOutFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearAttendanceData: (state) => {
            state.attendanceData = [];
            state.todayAttendance = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    fetchAttendanceStart,
    fetchAttendanceSuccess,
    fetchAttendanceFailure,
    fetchTodayAttendanceStart,
    fetchTodayAttendanceSuccess,
    fetchTodayAttendanceFailure,
    checkInStart,
    checkInSuccess,
    checkInFailure,
    checkOutStart,
    checkOutSuccess,
    checkOutFailure,
    clearAttendanceData,
} = attendanceSlice.actions;

// Thunks

// Fetch all attendance records
export const fetchAttendance = () => async (dispatch) => {
    dispatch(fetchAttendanceStart());
    try {
        const response = await api.get('/attendance/summary'); // Adjust endpoint
        dispatch(fetchAttendanceSuccess(response.data.data.attendance));
    } catch (error) {
        dispatch(fetchAttendanceFailure(error.response?.data?.message || 'Failed to fetch attendance'));
    }
};

// Fetch today’s attendance
export const fetchTodayAttendance = () => async (dispatch) => {
    dispatch(fetchTodayAttendanceStart());
    try {
        const response = await api.get('/attendance/today'); // Adjust endpoint
        dispatch(fetchTodayAttendanceSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchTodayAttendanceFailure(error.response?.data?.message || 'Failed to fetch today attendance'));
    }
};

// Check-in
export const clockIn = () => async (dispatch) => {
    dispatch(checkInStart());
    try {
        const response = await api.post('/attendance/clock-in'); // Adjust endpoint
        dispatch(checkInSuccess(response.data.data));
    } catch (error) {
        dispatch(checkInFailure(error.response?.data?.message || 'Check-in failed'));
    }
};

// Check-out
export const clockOut = () => async (dispatch) => {
    dispatch(checkOutStart());
    try {
        const response = await api.post('/attendance/clock-out'); // Adjust endpoint
        dispatch(checkOutSuccess(response.data.data));
    } catch (error) {
        dispatch(checkOutFailure(error.response?.data?.message || 'Check-out failed'));
    }
};

export default attendanceSlice.reducer;
