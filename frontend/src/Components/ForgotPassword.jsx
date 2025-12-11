import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Simple CAPTCHA validation (for demonstration)
    if (captchaValue.toLowerCase() !== "abcd") {
      setError("Invalid CAPTCHA");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Password reset email sent. Please check your inbox.");
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
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit} autoComplete="off" className="form-group">
          <label htmlFor="email">Enter your registered email address:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="captcha">Enter CAPTCHA: abcd</label>
          <input
            type="text"
            className="form-control"
            value={captchaValue}
            onChange={(e) => setCaptchaValue(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Send Reset Email
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
        {message && <span className="success-msg">{message}</span>}
      </div>
    </div>
  );
}

export default ForgotPassword;
