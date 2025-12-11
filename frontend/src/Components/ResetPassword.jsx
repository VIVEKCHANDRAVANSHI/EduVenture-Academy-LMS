import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const validatePasswordStrength = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number, one special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePasswordStrength(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        setMessage("Password has been reset successfully. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setError(data);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit} autoComplete="off" className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <br />
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
        {message && <span className="success-msg">{message}</span>}
      </div>
    </div>
  );
}

export default ResetPassword;
