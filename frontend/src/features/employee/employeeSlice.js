import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    // Single employee (logged in user) data
    employeeData: null,
    // List of employees for admin/management
    employees: [],
    currentEmployee: null,
    isLoading: false,
    error: null
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        // Current logged-in employee actions
        fetchEmployeeStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEmployeeSuccess: (state, action) => {
            state.isLoading = false;
            state.employeeData = action.payload;
            state.error = null;
        },
        fetchEmployeeFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        clearEmployeeData: (state) => {
            state.employeeData = null;
            state.isLoading = false;
            state.error = null;
        },

        // Employee list actions
        fetchEmployeesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchEmployeesSuccess: (state, action) => {
            state.isLoading = false;
            state.employees = action.payload;
            state.error = null;
        },
        fetchEmployeesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setCurrentEmployee: (state, action) => {
            state.currentEmployee = action.payload;
        }
    }
});

export const {
    // Current employee actions
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFailure,
    clearEmployeeData,
    // Employee list actions
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
    setCurrentEmployee,
} = employeeSlice.actions;

// Thunk action to fetch current employee data
export const fetchEmployeeData = () => async (dispatch) => {
    dispatch(fetchEmployeeStart());
    try {
        const response = await api.get('/employees/me');
        dispatch(fetchEmployeeSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchEmployeeFailure(error.response?.data?.message || 'Failed to fetch employee data'));
    }
};

// Thunk action to fetch all employees
export const fetchEmployees = () => async (dispatch) => {
    dispatch(fetchEmployeesStart());
    try {
        const response = await api.get('/employees');
        dispatch(fetchEmployeesSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchEmployeesFailure(error.response?.data?.message || 'Failed to fetch employees'));
    }
};

export default employeeSlice.reducer;