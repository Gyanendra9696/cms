import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFrontendService } from "../../core/auth/services/auth-frontend.service";
import "./LoginPage.css";

const authService = new AuthFrontendService();

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      await authService.login({ identifier: email, password }, { organizationId: 'default' });
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid username or password. Please verify your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-content">
          <h1>CMS ERP</h1>
          <h3>Enterprise Maintenance Management System</h3>
          <p>Better Assets.<br/>Smoother Operations.<br/>Stronger Tomorrows.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>✔ Asset Management</li>
            <li>✔ Preventive Maintenance</li>
            <li>✔ Inventory Management</li>
            <li>✔ Work Orders</li>
          </ul>
        </div>
      </div>
      <div className="login-right">
        <img src="/assets/logo/logo.png" alt="Logo" className="logo-img" />
        <h2>CMS ERP</h2>
        <p>Enterprise Maintenance Management System</p>
        <div className="login-card">
          {error && <div style={{ color: "red" }}>{error}</div>}
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Login ID / Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember Me
            </label>
            <a href="#forgot">Forgot Password?</a>
            <button type="submit" disabled={loading} style={{ background: "linear-gradient(to right, #0055aa, #0077ff)", color: "white" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
        <footer>
          <p>Version 1.0.0</p>
          <p>© CMS ERP</p>
          <p>Secure • Reliable • Enterprise Ready</p>
        </footer>
      </div>
    </div>
  );
};
