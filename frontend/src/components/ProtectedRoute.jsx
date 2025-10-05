import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useSelector((state) => state.auth);
    
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;

    // If no user in Redux state but exists in localStorage, use that
    const activeUser = user || userData;

    if (!activeUser) {
        // No user data found anywhere, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && (!activeUser?.isAdmin || activeUser?.role !== 'admin')) {
        // Not admin, redirect to employee dashboard
        return <Navigate to="/employee" replace />;
    }

    // Authorized, render children
    return children;
};