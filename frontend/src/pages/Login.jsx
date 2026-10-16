import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.access_token;

      if (!token) {
        throw new Error("Login token was not returned.");
      }

      login(token);

      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT PANEL */}

      <div className="auth-brand-panel">

        <div className="auth-brand">

          <div className="auth-brand-icon">
            <Leaf size={25} />
          </div>

          <div>
            <strong>AyurScan</strong>
            <span>Plant Intelligence</span>
          </div>

        </div>

        <div className="auth-brand-content">

          <div className="auth-small-label">
            <Sparkles size={14} />
            AI-POWERED PLANT INTELLIGENCE
          </div>

          <h1>
            Discover the
            <br />
            <span>wisdom of plants.</span>
          </h1>

          <p>
            Identify medicinal plants with AI and
            explore their traditional Ayurvedic
            information in one place.
          </p>

        </div>

        <div className="auth-features">

          <div>
            <ShieldCheck size={18} />
            <span>
              Confidence-aware plant identification
            </span>
          </div>

          <div>
            <Leaf size={18} />
            <span>
              Traditional medicinal information
            </span>
          </div>

        </div>

      </div>

      {/* LOGIN PANEL */}

      <div className="auth-form-panel">

        <div className="auth-form-container">

          <Link
            to="/"
            className="auth-back"
          >
            ← Back to AyurScan
          </Link>

          <div className="auth-form-header">

            <div className="auth-mobile-logo">
              <Leaf size={20} />
            </div>

            <span>WELCOME BACK</span>

            <h2>
              Sign in to AyurScan
            </h2>

            <p>
              Continue exploring medicinal plant intelligence.
            </p>

          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            <div className="auth-field">

              <label>
                Email address
              </label>

              <div className="auth-input-wrapper">

                <Mail size={17} />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            <div className="auth-field">

              <label>
                Password
              </label>

              <div className="auth-input-wrapper">

                <LockKeyhole size={17} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </button>

          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-register-text">

            Don't have an account?

            <Link to="/register">
              Create an account
            </Link>

          </p>

          <div className="auth-note">
            <ShieldCheck size={15} />
            <span>
              Your account is protected with secure authentication.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;