// src/redux/slices/adminPerformanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ✅ Fetch all performance records
export const fetchPerformanceRecords = createAsyncThunk(
    "adminPerformance/fetchPerformanceRecords",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post("/performance/goals");
            // ⚡ Adjust this endpoint if backend has a dedicated "get all performance records" route
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Add review / set goals for an employee
export const addPerformanceReview = createAsyncThunk(
    "adminPerformance/addPerformanceReview",
    async ({ employeeId, reviewData }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/performance/goals`, {
                employeeId,
                ...reviewData,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Update goal status
export const updateGoalStatus = createAsyncThunk(
    "adminPerformance/updateGoalStatus",
    async ({ employeeId, goalId, status }, { rejectWithValue }) => {
        try {
            const res = await api.put(
                `/performance/goal/status/${employeeId}/${goalId}`,
                { status }
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const adminPerformanceSlice = createSlice({
    name: "adminPerformance",
    initialState: {
        records: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPerformanceRecords.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPerformanceRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.records = action.payload;
            })
            .addCase(fetchPerformanceRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addPerformanceReview.fulfilled, (state, action) => {
                state.records.push(action.payload);
            })
            .addCase(updateGoalStatus.fulfilled, (state, action) => {
                const updated = action.payload;
                state.records = state.records.map((rec) =>
                    rec._id === updated._id ? updated : rec
                );
            });
    },
});

export default adminPerformanceSlice.reducer;
