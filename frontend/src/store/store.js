import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import employeeReducer from '../features/employee/employeeSlice';
import attendanceReducer from '../features/attendance/attendanceSlice';
import leaveReducer from '../features/leave/leaveSlice';
import payrollReducer from '../features/payroll/payrollSlice';
import performanceReducer from '../features/performance/performanceSlice';
import adminEmployeeReducer from '../features/employee/adminEmployeeSlice';
import adminAttendanceReducer from '../features/attendance/adminAttendanceSlice'
import adminLeaveReducer from '../features/leave/adminLeaveSlice'
import adminPayrollReducer from '../features/payroll/adminPayrollSlice'
import adminPerformanceReducer from '../features/performance/adminPerformanceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    attendance: attendanceReducer,
    leave: leaveReducer,
    payroll: payrollReducer,
    performance: performanceReducer,
    adminEmployees: adminEmployeeReducer, // for admin overview
    adminAttendance: adminAttendanceReducer,
    adminLeave: adminLeaveReducer,
    adminPayroll: adminPayrollReducer,
    adminPerformance: adminPerformanceReducer,



  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Exported for use in components
export const RootState = store.getState;
export const AppDispatch = store.dispatch;