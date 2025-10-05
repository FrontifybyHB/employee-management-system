import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayrolls } from "../../features/payroll/payrollSlice";
import { fetchEmployeeData } from "../../features/employee/employeeSlice";

const Payroll = () => {
  const dispatch = useDispatch();

  const { payrollData, isLoading: loadingPayrolls, error: payrollError } = useSelector(
    (state) => state.payroll
  );
  const { employeeData, isLoading: loadingEmployee, error: employeeError } = useSelector(
    (state) => state.employee
  );

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch employee data if not available
  useEffect(() => {
    if (!employeeData) {
      dispatch(fetchEmployeeData());
    }
  }, [dispatch, employeeData]);

  // Fetch payrolls only if not available in the store
  useEffect(() => {
    if (!payrollData || payrollData.length === 0) {
      dispatch(fetchPayrolls());
    }
  }, [dispatch, payrollData]);

  // Show loading or error states
  if (loadingEmployee || loadingPayrolls)
    return <div className="p-6 text-gray-500">Loading...</div>;
  if (employeeError)
    return <div className="p-6 text-red-600">Employee Error: {employeeError}</div>;
  if (payrollError)
    return <div className="p-6 text-red-600">Payroll Error: {payrollError}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Payroll</h1>

      {payrollData.length === 0 ? (
        <p className="text-gray-500">No payroll records available yet.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData.map((record) => {
                const period = `${monthNames[record.month - 1]} ${record.year}`;
                const status = record.paidOn ? "paid" : "pending";

                const netSalary = () => {
                  const basic = employeeData?.salary?.base || 0;
                  const allowance = employeeData?.salary?.allowance || 0;
                  const deductions = employeeData?.salary?.deductions || 0;
                  const tax = Math.round(basic * 0.1); // 10% tax
                  return basic + allowance - deductions - tax;
                };

                return (
                  <tr key={record.id}>
                    <td className="px-6 py-4">{period}</td>
                    <td className="px-6 py-4">{employeeData?.salary?.base || 0}</td>
                    <td className="px-6 py-4 text-red-600">{employeeData?.salary?.deductions || 0}</td>
                    <td className="px-6 py-4 text-green-600">{netSalary()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() =>
                          window.open(`/api/employee/payroll/payslip/${record.id}`, "_blank")
                        }
                      >
                        Download Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payroll;
