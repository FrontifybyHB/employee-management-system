import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import api from '../utils/api';
import EmployeeLayout from './EmployeeLayout';

const EmployeeDataProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await api.get('/employee/me');
        // Update the Redux store with the latest user data
        dispatch(loginSuccess({ user: response.data }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">Error: {error}</div>;
  }

  return <EmployeeLayout />;
};

export default EmployeeDataProvider;