// features/admin/adminEmployeeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [],
    isLoading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
    },
};

const adminEmployeeSlice = createSlice({
    name: "adminEmployees",
    initialState,
    reducers: {
        fetchAdminEmployeesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchAdminEmployeesSuccess: (state, action) => {
            state.isLoading = false;
            state.employees = action.payload.data;
            state.pagination = {
                page: action.payload.page,
                limit: action.payload.limit,
                total: action.payload.total,
            };
        },
        fetchAdminEmployeesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchAdminEmployeesStart,
    fetchAdminEmployeesSuccess,
    fetchAdminEmployeesFailure,
} = adminEmployeeSlice.actions;

export default adminEmployeeSlice.reducer;
