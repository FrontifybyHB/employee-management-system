import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { fetchEmployeeStart, fetchEmployeeSuccess, fetchEmployeeFailure } from '../features/employee/employeeSlice';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// import Dashboard from '../pages/employee/Dashboard.jsx';

const EmployeeLayout = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchEmployeeStart());
      try {
        const response = await api.get('/employees/me');
        dispatch(fetchEmployeeSuccess(response.data.data));
      } catch (err) {
        dispatch(fetchEmployeeFailure(err.message));
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar heading={"Employee EMS"} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
