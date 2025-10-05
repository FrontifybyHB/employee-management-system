import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../utils/api";
import {
  fetchLeaveStart,
  fetchLeaveSuccess,
  fetchLeaveFailure,
  updateLeaveStatus,
} from "../../features/leave/adminLeaveSlice";

const LeaveManagement = () => {
  const { leaveRequests, isLoading, error } = useSelector(
    (state) => state.adminLeave
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      dispatch(fetchLeaveStart());
      try {
        const response = await api.get("/leave/all");
        dispatch(fetchLeaveSuccess(response.data.data.leaves));
      } catch (err) {
        dispatch(fetchLeaveFailure(err.message));
      }
    };

    // Only fetch if slice is empty
    if (!leaveRequests || leaveRequests.length === 0) {
      fetchLeaveRequests();
    }
  }, [dispatch, leaveRequests]);

  const handleApproveLeave = async (id) => {
    try {
      await api.put(`/leave/approve/${id}`, {
        status: "Approved",
      });
      dispatch(updateLeaveStatus({ id, status: "Approved" }));
    } catch (err) {
      console.error("Error approving leave:", err);
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      await api.put(`/leave/approve/${id}`, {
        status: "Rejected",
        rejectionReason: "Not eligible for leave", // You can collect this from a form/input
      });
      dispatch(updateLeaveStatus({ id, status: "Rejected" }));
    } catch (err) {
      console.error("Error rejecting leave:", err);
    }
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Leave Management</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.employee?.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(request.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(request.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApproveLeave(request.id)}
                        className="text-green-600 hover:text-green-900 mr-4 border p-1"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectLeave(request.id)}
                        className="text-red-600 hover:text-red-900 border p-1"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
