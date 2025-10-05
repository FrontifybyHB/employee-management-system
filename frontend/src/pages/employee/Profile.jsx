import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeData } from '../../features/employee/employeeSlice';

const EmployeeDashboard = () => {
    // const [employee, setEmployee] = useState(null);

    const dispatch = useDispatch();
    const { employeeData, isLoading, error } = useSelector((state) => state.employee);

    useEffect(() => {
        // Only fetch if we don't have the employee data yet
        if (!employeeData) {
            dispatch(fetchEmployeeData());
        }
    }, [dispatch, employeeData]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 w-full">
            <h2 className="text-2xl font-semibold mb-6">Employee Details</h2>
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg">
                <div className="space-y-3">
                    <p><span className="font-semibold">Email:</span> {employeeData.user.email}</p>
                    <p><span className="font-semibold">Name:</span> {`${employeeData.firstName} ${employeeData.lastName}`}</p>
                    <p><span className="font-semibold">Role:</span> {employeeData.user.role}</p>
                    <p><span className="font-semibold">Username:</span> {employeeData.user.username}</p>
                    <p><span className="font-semibold">Employee ID:</span> {employeeData.id}</p>
                    <p><span className="font-semibold">Joining Date:</span> {employeeData.joiningDate}</p>
                    <p><span className="font-semibold">Department:</span> {employeeData.department}</p>
                    <p><span className="font-semibold">Base Saleary:</span> {employeeData.salary.base}</p>
                    <p><span className="font-semibold">Allowance Saleary:</span> {employeeData.salary.allowance}</p>
                    <p><span className="font-semibold">Deductions:</span> {employeeData.salary.deductions}</p>

                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
