import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { AuthFrontendService } from "../../core/auth/services/auth-frontend.service";

type AlertType = 'danger' | 'warning' | 'success';

interface Alert {
  type: AlertType;
  message: string;
}

const alertStyles = {
  danger: { background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c" },
  warning: { background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" },
  success: { background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534" },
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);
  const authService = new AuthFrontendService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (alert) setAlert(null);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Empty field validation
    if (!email.trim()) {
      setAlert({ type: 'warning', message: "Please enter your Login ID or Email Address." });
      return;
    }

    // 2. Email format validation (if it looks like an email)
    if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAlert({ type: 'danger', message: "Please enter a valid email address." });
      return;
    }

    setAlert(null);
    setLoading(true);
    
    const response = await authService.forgotPassword(email);

    switch (response.code) {
      case 'SUCCESS':
        setAlert({ type: 'success', message: "Password reset instructions have been sent to your registered email address." });
        break;
      case 'USER_NOT_FOUND':
        setAlert({ type: 'danger', message: "The Login ID or Email Address you entered is not registered. Please verify your credentials or contact your System Administrator." });
        break;
      case 'ACCOUNT_INACTIVE':
        setAlert({ type: 'warning', message: "Your account is currently inactive. Please contact your System Administrator." });
        break;
      case 'ACCOUNT_LOCKED':
        setAlert({ type: 'danger', message: "Your account is currently locked. Please contact your System Administrator." });
        break;
      case 'SERVICE_UNAVAILABLE':
        setAlert({ type: 'warning', message: response.message });
        break;
      case 'SERVER_ERROR':
      default:
        setAlert({ type: 'danger', message: "An error occurred. Please try again later." });
        break;
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
        <div style={{ width: "100%", maxWidth: "420px", background: "white", padding: "30px 35px", borderRadius: "28px", boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.08)", border: "1px solid #f1f5f9", boxSizing: "border-box" }}>
          
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ width: "110px", height: "110px", borderRadius: "50%", background: "white", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px auto" }}>
              <img 
                src="/assets/logo/logo.png" 
                alt="Logo" 
                style={{ width: "85%", height: "85%", objectFit: "contain" }} 
              />
            </div>
            <h2 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: "800", color: "#0f172a" }}>Forgot Password</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Enter your registered Login ID or Email Address. We'll send password reset instructions to your registered email.</p>
          </div>

          {alert && (
            <div style={{ marginBottom: "16px", padding: "10px 14px", ...alertStyles[alert.type], fontSize: "12px", borderRadius: "10px", lineHeight: "1.4", fontWeight: "500" }}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Login ID / Email Address
              </label>
              <input
                type="text"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your Login ID or Email Address"
                style={{ width: "100%", height: "50px", padding: "0 16px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "12px", fontSize: "13px", boxSizing: "border-box", outline: "none" }}
              />
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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            
            <Link
              to="/login"
              style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%", 
                height: "50px", 
                background: "#f1f5f9", 
                color: "#475569", 
                border: "none", 
                borderRadius: "12px", 
                fontSize: "14px", 
                fontWeight: "700", 
                textDecoration: "none",
                marginTop: "4px" 
              }}
            >
              Back to Login
            </Link>
          </form>
        </div>
    </AuthLayout>
  );
};
