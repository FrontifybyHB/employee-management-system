import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAdminEmployeesStart,
  fetchAdminEmployeesSuccess,
  fetchAdminEmployeesFailure,
} from "../../features/employee/adminEmployeeSlice";
import api from "../../utils/api";

const Dashboard = () => {
  const { employees = [], isLoading, pagination, error } = useSelector(
    (state) => state.adminEmployees
  );

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
  const fetchDashboardData = async () => {
    dispatch(fetchAdminEmployeesStart());
    try {
      const response = await api.get("/employees", {
        params: { page, limit, department, role, sort, order },
      });
      
      dispatch(
        fetchAdminEmployeesSuccess({
          data: response.data.data.employees,
          page: response.data.data.pagination.currentPage,
          limit: response.data.limit,
          total: response.data.data.pagination.totalItems,
        })
      );
    } catch (err) {
      dispatch(fetchAdminEmployeesFailure(err.message));
    }
  };

  if (!employees || employees.length === 0) {
    fetchDashboardData();
  }
}, [dispatch]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Employee's</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="createdAt">Created At</option>
          <option value="name">Name</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
          <p className="text-3xl font-bold text-blue-600">
            {pagination.total || 0}
          </p>
        </div>
      </div>

      {/* Employees Table */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border">Joined</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-3 border">{emp.firstName}</td>
                <td className="p-3 border">{emp.user.email}</td>
                <td className="p-3 border">{emp.role}</td>
                <td className="p-3 border">{emp.department}</td>
                <td className="p-3 border">
                  {new Date(emp.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {pagination.currentPage} of{" "}
          {Math.ceil(pagination.itemsPerPage / pagination.limit) || 1}
        </span>
        <button
          disabled={employees.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
