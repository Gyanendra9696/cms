import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './app/auth/LoginPage';
import { TechnicianDashboard } from './app/dashboard/TechnicianDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<TechnicianDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
