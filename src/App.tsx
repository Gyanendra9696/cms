import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './app/auth/LoginPage';
import { ForgotPasswordPage } from './app/auth/ForgotPasswordPage';
import { RoleDashboardResolver } from './app/dashboard/RoleDashboardResolver';
import { MainLayout } from './app/layout';
import { PlaceholderPage } from './app/common/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<RoleDashboardResolver />} />
          <Route path="/organization" element={<PlaceholderPage title="Organization" />} />
          <Route path="/campuses" element={<PlaceholderPage title="Campuses" />} />
          <Route path="/departments" element={<PlaceholderPage title="Departments" />} />
          <Route path="/masters" element={<PlaceholderPage title="Masters" />} />
          <Route path="/access-control" element={<PlaceholderPage title="Access Control" />} />
          <Route path="/audit-logs" element={<PlaceholderPage title="Audit Logs" />} />
          <Route path="/security-center" element={<PlaceholderPage title="Security Center" />} />
          <Route path="/backup-restore" element={<PlaceholderPage title="Backup & Restore" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
