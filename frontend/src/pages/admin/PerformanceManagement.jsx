import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPerformanceRecords,
  addPerformanceReview,
  updateGoalStatus,
} from "../../features/performance/adminPerformanceSlice";

const PerformanceManagement = () => {
  const dispatch = useDispatch();
  const { records, isLoading, error } = useSelector(
    (state) => state.adminPerformance
  );

  useEffect(() => {
    if (records.length === 0) {
      dispatch(fetchPerformanceRecords());
    }
  }, [dispatch, records.length]);

  const handleAddReview = (employeeId) => {
    const reviewData = {
      reviewPeriod: "Q3 2025",
      rating: 4,
      status: "completed",
    };
    dispatch(addPerformanceReview({ employeeId, reviewData }));
  };

  const handleUpdateGoalStatus = (employeeId, goalId, status) => {
    dispatch(updateGoalStatus({ employeeId, goalId, status }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Performance Management</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Review Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record._id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.reviewPeriod}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{record.rating}/5</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      record.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <button
                    onClick={() => handleAddReview(record.employeeId)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Add Review
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateGoalStatus(record.employeeId, record.goalId, "completed")
                    }
                    className="text-green-600 hover:text-green-900"
                  >
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceManagement;
