import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    payrollData: [],      // All payroll records
    currentPayroll: null, // Specific payroll detail if needed
    isLoading: false,
    error: null,
};

const payrollSlice = createSlice({
    name: 'payroll',
    initialState,
    reducers: {
        // Fetch all payrolls
        fetchPayrollStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchPayrollSuccess: (state, action) => {
            state.isLoading = false;
            state.payrollData = action.payload;
            state.error = null;
        },
        fetchPayrollFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Add a new payroll
        addPayrollStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addPayrollSuccess: (state, action) => {
            state.isLoading = false;
            state.payrollData.push(action.payload);
            state.error = null;
        },
        addPayrollFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Update payroll
        updatePayrollStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updatePayrollSuccess: (state, action) => {
            state.isLoading = false;
            const index = state.payrollData.findIndex(pay => pay.id === action.payload.id);
            if (index !== -1) state.payrollData[index] = action.payload;
            state.error = null;
        },
        updatePayrollFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Set current payroll
        setCurrentPayroll: (state, action) => {
            state.currentPayroll = action.payload;
        },

        // Clear payroll state
        clearPayrollData: (state) => {
            state.payrollData = [];
            state.currentPayroll = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    fetchPayrollStart,
    fetchPayrollSuccess,
    fetchPayrollFailure,
    addPayrollStart,
    addPayrollSuccess,
    addPayrollFailure,
    updatePayrollStart,
    updatePayrollSuccess,
    updatePayrollFailure,
    setCurrentPayroll,
    clearPayrollData,
} = payrollSlice.actions;

// Thunks

// Fetch all payrolls
export const fetchPayrolls = () => async (dispatch) => {
    dispatch(fetchPayrollStart());
    try {
        const response = await api.get('/payroll/my-payrolls'); // Adjust endpoint
        dispatch(fetchPayrollSuccess(response.data.data.payrolls));
    } catch (error) {
        dispatch(fetchPayrollFailure(error.response?.data?.message || 'Failed to fetch payrolls'));
    }
};

// Add new payroll
export const addPayroll = (payrollPayload) => async (dispatch) => {
    dispatch(addPayrollStart());
    try {
        const response = await api.post('/payroll', payrollPayload); // Adjust endpoint
        dispatch(addPayrollSuccess(response.data.data));
    } catch (error) {
        dispatch(addPayrollFailure(error.response?.data?.message || 'Failed to add payroll'));
    }
};

// Update payroll
export const updatePayroll = (payrollId, updatePayload) => async (dispatch) => {
    dispatch(updatePayrollStart());
    try {
        const response = await api.put(`/payroll/${payrollId}`, updatePayload); // Adjust endpoint
        dispatch(updatePayrollSuccess(response.data.data));
    } catch (error) {
        dispatch(updatePayrollFailure(error.response?.data?.message || 'Failed to update payroll'));
    }
};

export default payrollSlice.reducer;
