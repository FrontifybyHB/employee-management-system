import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayrolls,
  generatePayroll,
} from "../../features/payroll/adminPayrollSlice";

const PayrollManagement = () => {
  const dispatch = useDispatch();
  const { payrolls, isLoading, error } = useSelector(
    (state) => state.adminPayroll
  );

  useEffect(() => {
    if (payrolls.length === 0) {
      dispatch(fetchPayrolls());
    }
  }, [dispatch, payrolls.length]);

  const handleGeneratePayroll = (employeeId) => {
    dispatch(generatePayroll(employeeId)).then(() => {
      dispatch(fetchPayrolls()); // refresh after generation
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Payroll Management</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((record) => (
              <tr key={record._id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(record.paidOn).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.basic}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.deductions}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.netSalary}</td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.status !== "paid" && (
                    <button
                      onClick={() => handleGeneratePayroll(record.payslipUrl)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Generate Payslip
                    </button>
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

export default PayrollManagement;
