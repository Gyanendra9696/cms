import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", fontFamily: "Inter, Arial, sans-serif", margin: 0, padding: 0, backgroundColor: "#f8fafc", overflow: "hidden", boxSizing: "border-box" }}>
      {/* Left Branding Panel */}
      <div style={{ 
        flex: 1, 
        backgroundImage: "linear-gradient(135deg, rgba(0, 30, 80, 0.8), rgba(0, 50, 120, 0.6)), url('/assets/images/login-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        padding: "60px", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        color: "white",
        boxSizing: "border-box"
      }}>
        {/* Hero Section */}
        <div style={{ marginTop: "60px" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "900", margin: "0 0 10px 0", letterSpacing: "-1px" }}>CMS ERP</h1>
          <p style={{ fontSize: "20px", fontWeight: "300", opacity: 0.9, margin: "0 0 30px 0" }}>Enterprise Maintenance Management System</p>
          <h2 style={{ fontSize: "28px", fontWeight: "600", margin: "0 0 10px 0" }}>Predict. Prevent. Perform.</h2>
          <p style={{ fontSize: "16px", fontWeight: "300", opacity: 0.8, maxWidth: "400px" }}>Intelligent Maintenance & Asset Management for Modern Enterprises.</p>
        </div>

        {/* Feature Panel */}
        <div style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "20px",
          padding: "25px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {[
            { icon: "🛡️", title: "Reliable Assets", desc: "Improve equipment reliability" },
            { icon: "📅", title: "Preventive Maintenance", desc: "Reduce unexpected failures" },
            { icon: "📈", title: "Better Performance", desc: "Increase operational efficiency" },
            { icon: "📊", title: "Real-time Monitoring", desc: "Track assets instantly" }
          ].map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "12px", alignItems: "start" }}>
              <div style={{ fontSize: "24px" }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "14px" }}>{item.title}</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ fontSize: "12px", opacity: 0.7, textAlign: "center" }}>
          Version 1.0.0 | Development | © 2026 CMS ERP
        </div>
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", boxSizing: "border-box" }}>
        {children}
      </div>
    </div>
  );
};
