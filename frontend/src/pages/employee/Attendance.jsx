import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendance,
  clockIn,
  clockOut,
} from "../../features/attendance/attendanceSlice";

const Attendance = () => {
  const dispatch = useDispatch();

  const { attendanceData, isLoading, error } = useSelector(
    (state) => state.attendance
  );

  // Fetch attendance only if not already loaded
  useEffect(() => {
    if (!attendanceData || attendanceData.length === 0) {
      dispatch(fetchAttendance());
    }
  }, [dispatch, attendanceData]);

  const handleCheckIn = () => {
    dispatch(clockIn());
  };

  const handleCheckOut = () => {
    dispatch(clockOut());
  };

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Attendance</h1>

      {/* Today's Status */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Status:</p>
            <div className="flex justify-between space-x-4 mt-2">
              <button
                onClick={handleCheckIn}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Check In
              </button>
              <button
                onClick={handleCheckOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 bg-gray-50 border-b">
          Attendance History
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check Out
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.clockIn ? record.clockIn.time : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.clockOut ? record.clockOut.time : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
