import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../utils/api";
import {
  fetchAdminAttendanceStart,
  fetchAdminAttendanceSuccess,
  fetchAdminAttendanceFailure,
  setAdminAttendanceFilters,
} from "../../features/attendance/adminAttendanceSlice";

const AttendanceManagement = () => {
  const { records, isLoading, error, pagination, filters } = useSelector(
    (state) => state.adminAttendance
  );
  const dispatch = useDispatch();

  // Local filter state
  const [startDate, setStartDate] = useState(filters.startDate || "");
  const [endDate, setEndDate] = useState(filters.endDate || "");
  const [page, setPage] = useState(pagination.page || 1);
  const [limit] = useState(pagination.limit || 50);
  const [sort, setSort] = useState(filters.sort || "date");

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      dispatch(fetchAdminAttendanceStart());
      try {
        const response = await api.get("/attendance/all-employees-summary", {
          params: { startDate, endDate, page, limit, sort },
        });

        console.log(response.data)

        dispatch(
          fetchAdminAttendanceSuccess({
            data: response.data.attendance,
            page: response.data.pagination.currentPage,
            limit: response.data.limit,
            total: response.data.pagination.totalItems,
          })
        );
      } catch (err) {
        dispatch(fetchAdminAttendanceFailure(err.message));
      }
    };

    // Fetch only if slice is empty
    if (!records || records.length === 0) {
      fetchAttendanceRecords();
    }
  }, [dispatch, records, startDate, endDate, page, limit, sort]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(setAdminAttendanceFilters({ startDate, endDate, sort }));
    setPage(1); // reset page on filter change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Attendance Management</h1>

      {/* Filters */}
      <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="date">Date</option>
          <option value="employeeName">Employee Name</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Apply Filters
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record._id}>
                <td className="px-6 py-4">{record.employee.firstName}</td>
                <td className="px-6 py-4">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {record.clockIn ? record.clockIn.time : "-"}
                </td>
                <td className="px-6 py-4">
                  {record.clockOut ? record.clockOut.time : "-"}
                </td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-2 inline-flex text-xs font-semibold rounded-full 
                      ${
                        record.status === "present"
                          ? "bg-green-100 text-green-800"
                          : record.status === "absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {record.status}
                  </span>
                </td> */}
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
          Page {pagination.page} of{" "}
          {Math.ceil(pagination.total / pagination.limit) || 1}
        </span>
        <button
          disabled={records.length < limit}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AttendanceManagement;
