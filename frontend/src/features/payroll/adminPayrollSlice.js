// src/redux/slices/adminPayrollSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ✅ Fetch all payroll records
export const fetchPayrolls = createAsyncThunk(
    "adminPayroll/fetchPayrolls",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/payroll/all"); // backend route
            return res.data?.data.payrolls;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ✅ Generate payroll for an employee
export const generatePayroll = createAsyncThunk(
    "adminPayroll/generatePayroll",
    async (employeeId, { rejectWithValue }) => {
        try {
            await api.post(`/payroll/run-cycle`, { employeeId });
            // your backend run-cycle might generate all employees or one — adjust if needed
            return { employeeId };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const adminPayrollSlice = createSlice({
    name: "adminPayroll",
    initialState: {
        payrolls: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        updatePayrollStatus: (state, action) => {
            const { id, status } = action.payload;
            const existing = state.payrolls.find((p) => p._id === id);
            if (existing) {
                existing.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayrolls.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPayrolls.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payrolls = action.payload;
            })
            .addCase(fetchPayrolls.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // .addCase(generatePayroll.fulfilled, (state, action) => {
            //     // Optionally update payrolls state after generating
            // });
    },
});

export const { updatePayrollStatus } = adminPayrollSlice.actions;
export default adminPayrollSlice.reducer;
