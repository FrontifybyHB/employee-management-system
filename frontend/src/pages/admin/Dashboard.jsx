import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { pagination, isLoading, error } = useSelector(
    (state) => state.adminEmployees
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
          <p className="text-3xl font-bold text-blue-600">
            {pagination?.total || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Pending Leaves</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Payroll Processed</h3>
          <p className="text-3xl font-bold text-purple-600">₹5.2L</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Performance Reports</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>
      </div>

      {/* Optional: Quick Links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/employees"
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Manage Employees
          </a>
          <a
            href="/admin/attendance"
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
          >
            Attendance
          </a>
          <a
            href="/admin/leave"
            className="px-4 py-2 bg-orange-600 text-white rounded shadow hover:bg-orange-700"
          >
            Leave Requests
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
