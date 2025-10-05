import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeData } from '../../features/employee/employeeSlice';
import { FaUserCheck, FaCalendarAlt, FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';

const routes = [
  { name: 'Attendance', icon: FaUserCheck, path: '/attendance' },
  { name: 'Leave', icon: FaCalendarAlt, path: '/leave' },
  { name: 'Payroll', icon: FaFileInvoiceDollar, path: '/payroll' },
  { name: 'Performance', icon: FaChartLine, path: '/performance' },
  // Add all other routes here
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { employeeData, isLoading, error } = useSelector((state) => state.employee);
  
  useEffect(() => {
    if (!employeeData) dispatch(fetchEmployeeData());
  }, [dispatch, employeeData]);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, {employeeData?.user?.username}
        </h1>
        <p className="text-gray-600 mt-2">Here's a summary of your activity and performance</p>
      </div>

      {/* Quick Access / Route Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <div key={route.name} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center mb-4">
                <Icon className="text-blue-600 text-2xl mr-3" />
                <h3 className="text-lg font-semibold">{route.name}</h3>
              </div>
              {/* Show summary info dynamically */}
              {route.name === 'Attendance' && (
                <p className={`text-sm ${employeeData?.attendance?.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>
                  {employeeData?.attendance?.status === 'present' ? 'Present Today' : 'Not Checked In'}
                </p>
              )}
              {route.name === 'Leave' && (
                <p className="text-3xl font-bold text-blue-600">{employeeData?.leave?.balance || 0} days</p>
              )}
              {route.name === 'Payroll' && (
                <p className="text-sm text-gray-600">{employeeData?.payroll?.currentMonth || 'No data'}</p>
              )}
              {route.name === 'Performance' && (
                <div className="flex items-center text-yellow-500">
                  <span className="text-xl mr-1">★</span>
                  <span>{employeeData?.performance?.rating || 'N/A'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Sections */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          {employeeData?.activities?.length === 0 ? (
            <p className="text-gray-500">No recent activity</p>
          ) : (
            <div className="divide-y divide-gray-200">
              {employeeData?.activities?.map((activity) => (
                <div key={activity._id} className="py-2">
                  <p className="text-sm text-gray-700">{activity.description}</p>
                  <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-gray-600">Total Leaves Taken</span>
              <span className="font-semibold">{employeeData?.leave?.taken || 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Pending Goals</span>
              <span className="font-semibold">{employeeData?.performance?.pendingGoals || 0}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Completed Goals</span>
              <span className="font-semibold">{employeeData?.performance?.completedGoals || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
