import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components for better performance
const Login = lazy(() => import("../pages/auth/Login.jsx"));
const Register = lazy(() => import("../pages/auth/Register.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard.jsx"));
const EmployeeDashboard = lazy(() => import("../pages/employee/Dashboard.jsx"));
const EmployeeProfile = lazy(() => import("../pages/employee/Profile.jsx"));
const Attendance = lazy(() => import("../pages/employee/Attendance.jsx"));
const LeaveManagement = lazy(() => import("../pages/employee/Leave.jsx"));
const PayrollManagement = lazy(() => import("../pages/employee/Payroll.jsx"));
// const PerformanceReview = lazy(() => import('../pages/employee/Performance.jsx'));
const EmployeeManagement = lazy(() => import("../pages/admin/EmployeeManagement.jsx")
);
const AdminAttendance = lazy(() =>
  import("../pages/admin/AttendanceManagement.jsx")
);
const AdminLeave = lazy(() => import("../pages/admin/LeaveManagement.jsx"));
const AdminPayroll = lazy(() => import("../pages/admin/PayrollManagement.jsx"));
const AdminPerformance = lazy(() =>
  import("../pages/admin/PerformanceManagement.jsx")
);

export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/employee" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes with Layout */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="leave" element={<AdminLeave />} />
              <Route path="payroll" element={<AdminPayroll />} />
              <Route path="performance" element={<AdminPerformance />} />
            </Route>

            {/* Employee Routes with Layout */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute>
                  <EmployeeLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leave" element={<LeaveManagement />} />
              <Route path="payroll" element={<PayrollManagement />} />
              {/* <Route path="performance" element={<PerformanceReview />} /> */}
            </Route>

            {/* Catch all route */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      404 - Page Not Found
                    </h2>
                    <p className="text-gray-600">
                      The page you are looking for doesn't exist.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
