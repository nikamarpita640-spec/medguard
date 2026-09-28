import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

import Login from './pages/Login';
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientRecords from './pages/PatientRecords';
import PatientDetails from './pages/PatientDetails';
import MyActivity from './pages/MyActivity';
import EmergencyAccess from './pages/EmergencyAccess';
import Profile from './pages/Profile';
import SecurityDashboard from './pages/security/SecurityDashboard';
import Alerts from './pages/security/Alerts';
import AlertDetails from './pages/security/AlertDetails';
import AccessLogs from './pages/security/AccessLogs';
import Investigations from './pages/security/Investigations';
import Users from './pages/security/Users';
import Rules from './pages/security/Rules';
import AdminDashboard from './pages/admin/AdminDashboard';

const ROLE_HOME = {
  doctor: '/doctor/dashboard',
  nurse: '/doctor/dashboard',
  security: '/security/dashboard',
  admin: '/admin/dashboard',
};

function RoleHomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Doctor / Nurse routes */}
              <Route
                path="/doctor/dashboard"
                element={
                  <ProtectedRoute roles={['doctor', 'nurse']}>
                    <DoctorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/patients" element={<PatientRecords />} />
              <Route path="/patients/:id" element={<PatientDetails />} />
              <Route
                path="/activity"
                element={
                  <ProtectedRoute roles={['doctor', 'nurse']}>
                    <MyActivity />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/emergency-access"
                element={
                  <ProtectedRoute roles={['doctor', 'nurse']}>
                    <EmergencyAccess />
                  </ProtectedRoute>
                }
              />

              {/* Security Officer routes */}
              <Route
                path="/security/dashboard"
                element={
                  <ProtectedRoute roles={['security']}>
                    <SecurityDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/alerts"
                element={
                  <ProtectedRoute roles={['security', 'admin']}>
                    <Alerts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/alerts/:id"
                element={
                  <ProtectedRoute roles={['security', 'admin']}>
                    <AlertDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/logs"
                element={
                  <ProtectedRoute roles={['security', 'admin']}>
                    <AccessLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/investigations"
                element={
                  <ProtectedRoute roles={['security']}>
                    <Investigations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/users"
                element={
                  <ProtectedRoute roles={['security', 'admin']}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/security/rules"
                element={
                  <ProtectedRoute roles={['security']}>
                    <Rules />
                  </ProtectedRoute>
                }
              />

              {/* Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Shared */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<RoleHomeRedirect />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
