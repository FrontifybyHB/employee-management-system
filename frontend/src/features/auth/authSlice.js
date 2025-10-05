import { createSlice } from '@reduxjs/toolkit';

// Helper functions for local storage
const loadAuthState = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            user: user,
            token: null, // Token will be handled by HTTP-only cookie
            isLoading: false,
            error: null,
        };
    } catch (error) {
        return {
            user: null,
            token: null,
            isLoading: false,
            error: null,
        };
    }
};

const saveAuthState = (user) => {
    try {
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            role: user.role
        }));
    } catch (err) {
        console.error('Error saving auth state to localStorage:', err);
    }
};

const clearAuthState = () => {
    try {
        localStorage.removeItem('user');
    } catch (err) {
        console.error('Error clearing auth state from localStorage:', err);
    }
};

const initialState = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            // Save user data to localStorage
            saveAuthState(action.payload.user);
            // Note: JWT token is automatically handled by cookies
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            clearAuthState();
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            clearAuthState();
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;