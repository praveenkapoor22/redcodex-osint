import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "redcodex@admin") {
      onLogin(true);
    } else {
      setError("Invalid admin password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">RedcodeX</h1>
        <p className="admin-login-subtitle">
          OSINT Admin Access
        </p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {error && <div className="login-error">{error}</div>}

        <button onClick={handleLogin}>Login</button>

        <div className="login-footer">
          Authorized access only
        </div>
      </div>
    </div>
  );
}