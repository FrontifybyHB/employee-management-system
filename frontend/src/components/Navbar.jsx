import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { clearEmployeeData } from '../features/employee/employeeSlice';
import api from '../utils/api';

const Navbar = ({ heading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeData } = useSelector((state) => state.employee);

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      await api.post('/auth/logout');

      // Clear both auth and employee data
      dispatch(logout());
      dispatch(clearEmployeeData());

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still logout user locally in case of API error
      dispatch(logout());
      dispatch(clearEmployeeData());
      navigate('/login');
    }
  };

  return (
    <nav className="bg-teal-600 p-4">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">{heading}</div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {employeeData ? employeeData?.user.username : "Admin"}</span>
          <button
            onClick={handleLogout}
            className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;