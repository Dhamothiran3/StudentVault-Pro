import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");
setIsLoading(true);

signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    setIsLoading(false);
    navigate("/dashboard");
  })
  .catch((error) => {
    setIsLoading(false);
    setError("Invalid email or password");
    console.log(error);
  });
  };

  return (
    <div className="login-page-wrapper">
      {/* Dynamic Background Glows */}
      <div className="login-bg-glow login-bg-glow-1"></div>
      <div className="login-bg-glow login-bg-glow-2"></div>
      <div className="login-bg-glow login-bg-glow-3"></div>

      {/* Glassmorphism Card */}
      <div className="glass-login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="brand-icon-wrapper">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect x="9" y="11" width="6" height="4" rx="1" />
            </svg>
          </div>
          <h1 className="login-brand-title">Student Vault Pro</h1>
          <p className="login-brand-subtitle">
            Secure portal for your academic credentials
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="login-error-alert" role="alert">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <div className="input-field-wrapper">
              <span className="input-icon-left">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="email-input"
                type="email"
                className="styled-input"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <div className="input-field-wrapper">
              <span className="input-icon-left">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                className="styled-input styled-input-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-options-row">
            <label className="remember-me-label">
              <input
                type="checkbox"
                className="styled-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              className="forgot-password-link"
              onClick={(e) => {
                e.preventDefault();
                alert("Password reset instructions will be sent to your email.");
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="btn-spinner"></span>
            ) : (
              <>
                <span>Sign In</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="login-card-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="create-account-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;