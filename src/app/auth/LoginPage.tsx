import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthFrontendService } from "../../core/auth/services/auth-frontend.service";

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
      // Retaining existing backend contract (organizationId is required)
      await authService.login({ identifier: email, password }, { organizationId: 'default' });
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid username or password. Please verify your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", fontFamily: "Inter, Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#f8fafc", overflow: "hidden", boxSizing: "border-box" }}>
      
      {/* Left Branding Panel with Illustration */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", padding: "40px 60px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", boxSizing: "border-box" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "white", padding: "8px 16px", borderRadius: "20px", marginBottom: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: "16px" }}>⚙️</span>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#0f172a" }}>CMMS Platform</span>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
            Enterprise CMMS
          </h1>
          <p style={{ fontSize: "14px", color: "#475569", margin: 0, fontWeight: "400" }}>
            Smart Factory Asset & Maintenance Management System
          </p>
        </div>

        {/* Professional Vector Illustration Card */}
        <div style={{ width: "100%", maxWidth: "380px", background: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(10px)", padding: "24px", borderRadius: "24px", border: "1px solid rgba(255, 255, 255, 0.9)", boxShadow: "0 10px 25px rgba(37, 99, 235, 0.08)" }}>
          <img 
            src="/assets/images/login-background.png" 
            alt="Branding" 
            style={{ width: "100%", height: "auto", maxHeight: "190px", objectFit: "cover", marginBottom: "14px" }} 
          />
          <div style={{ fontSize: "12px", color: "#1e293b", fontWeight: "700" }}>
            🏢 Smart Factory &nbsp;|&nbsp; 👷 Mobile Workflows &nbsp;|&nbsp; 📊 Analytics
          </div>
        </div>

        {/* Single Line Footer */}
        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "500" }}>
          Version 1.0.0 &nbsp;|&nbsp; Development &nbsp;|&nbsp; © 2026 Company
        </div>
      </div>

      {/* Right Login Panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box" }}>
        {/* Premium Card with 28px Radius */}
        <div style={{ width: "100%", maxWidth: "420px", background: "white", padding: "30px 35px", borderRadius: "28px", boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08)", border: "1px solid #f1f5f9", boxSizing: "border-box" }}>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img 
              src="/assets/logo/logo.png" 
              alt="Logo" 
              style={{ width: "50px", height: "50px", objectFit: "contain", margin: "0 auto 10px auto" }} 
            />
            <h2 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>Welcome Back</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Sign in to continue to Enterprise CMMS</p>
          </div>

          {/* User-Friendly Clean Error Message */}
          {error && (
            <div style={{ marginBottom: "16px", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "12px", borderRadius: "10px", lineHeight: "1.4", fontWeight: "500" }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Email Address / Login ID
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{ position: "absolute", left: "14px", fontSize: "15px" }}>✉️</span>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or login ID"
                  style={{ width: "100%", height: "50px", padding: "0 16px 0 44px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Password
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <span style={{ position: "absolute", left: "14px", fontSize: "15px" }}>🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ width: "100%", height: "50px", padding: "0 50px 0 44px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "14px", background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: "12px", fontWeight: "600" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "#475569", fontWeight: "500" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "14px", height: "14px", accentColor: "#2563eb" }}
                />
                Remember Me
              </label>
              <a href="#forgot" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                Forgot Password?
              </a>
            </div>

            {/* Premium Button with Loading */}
            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: "100%", 
                height: "50px", 
                background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)", 
                color: "white", 
                border: "none", 
                borderRadius: "12px", 
                fontSize: "14px", 
                fontWeight: "700", 
                cursor: loading ? "not-allowed" : "pointer", 
                boxShadow: "0 6px 15px rgba(37, 99, 235, 0.3)", 
                marginTop: "4px" 
              }}
            >
              {loading ? "Signing in..." : "🔒 Sign In"}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
