import { useState } from "react";
import "../styles/adminLogin.css";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      setError("Invalid credentials. Use admin/admin123");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🌿</div>
        <h2>Liberica Farm System</h2>
        <p>Admin Login</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;