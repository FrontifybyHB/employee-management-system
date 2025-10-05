import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const initialState = {
    // Single employee's leave
    leaveData: [],
    // Specific leave selected for detail or update
    currentLeave: null,
    isLoading: false,
    error: null,
};

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        // Fetch all leaves
        fetchLeavesStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchLeavesSuccess: (state, action) => {
            state.isLoading = false;
            state.leaveData = action.payload;
            state.error = null;
        },
        fetchLeavesFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Add a new leave
        addLeaveStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        addLeaveSuccess: (state, action) => {
            state.isLoading = false;
            state.leaveData.push(action.payload);
            state.error = null;
        },
        addLeaveFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Update leave status
        updateLeaveStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        updateLeaveSuccess: (state, action) => {
            state.isLoading = false;
            const index = state.leaveData.findIndex(leave => leave.id === action.payload.id);
            if (index !== -1) state.leaveData[index] = action.payload;
            state.error = null;
        },
        updateLeaveFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        // Set current leave
        setCurrentLeave: (state, action) => {
            state.currentLeave = action.payload;
        },

        // Clear leave state
        clearLeaveData: (state) => {
            state.leaveData = [];
            state.currentLeave = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const {
    fetchLeavesStart,
    fetchLeavesSuccess,
    fetchLeavesFailure,
    addLeaveStart,
    addLeaveSuccess,
    addLeaveFailure,
    updateLeaveStart,
    updateLeaveSuccess,
    updateLeaveFailure,
    setCurrentLeave,
    clearLeaveData,
} = leaveSlice.actions;

// Thunk to fetch all leaves
export const fetchLeaves = () => async (dispatch) => {
    dispatch(fetchLeavesStart());
    try {
        const response = await api.get('/leave/my-leaves'); // Adjust endpoint as needed
        dispatch(fetchLeavesSuccess(response.data.data.leaves));
    } catch (error) {
        dispatch(fetchLeavesFailure(error.response?.data?.message || 'Failed to fetch leaves'));
    }
};

// Thunk to add a new leave
export const addLeave = (leavePayload) => async (dispatch) => {
    dispatch(addLeaveStart());
    try {
        const response = await api.post('/leaves/request', leavePayload); // Adjust endpoint as needed
        dispatch(addLeaveSuccess(response.data.data));
    } catch (error) {
        dispatch(addLeaveFailure(error.response?.data?.message || 'Failed to add leave'));
    }
};

// Thunk to update leave status
export const updateLeave = (leaveId, statusPayload) => async (dispatch) => {
    dispatch(updateLeaveStart());
    try {
        const response = await api.put(`/leaves/${leaveId}`, statusPayload); // Adjust endpoint
        dispatch(updateLeaveSuccess(response.data.data));
    } catch (error) {
        dispatch(updateLeaveFailure(error.response?.data?.message || 'Failed to update leave'));
    }
};

export default leaveSlice.reducer;
