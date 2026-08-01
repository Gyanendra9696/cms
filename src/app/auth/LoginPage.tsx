import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthFrontendService } from "../../core/auth/services/auth-frontend.service";
import { AuthLayout } from "./AuthLayout";

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
    <AuthLayout>
        {/* Premium Card with 28px Radius */}
        <div style={{ width: "100%", maxWidth: "420px", background: "white", padding: "30px 35px", borderRadius: "28px", boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08)", border: "1px solid #f1f5f9", boxSizing: "border-box" }}>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ width: "110px", height: "110px", borderRadius: "50%", background: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px auto" }}>
              <img 
                src="/assets/logo/logo.png" 
                alt="Logo" 
                style={{ width: "85%", height: "85%", objectFit: "contain" }} 
              />
            </div>
            <h2 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>Welcome Back</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Sign in to continue to Enterprise CMMS</p>
          </div>

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
              <Link to="/forgot-password" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>
                Forgot Password?
              </Link>
            </div>

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
    </AuthLayout>
  );
};
