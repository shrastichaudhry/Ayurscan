import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <Link to="/" className="auth-brand">
          <div className="auth-brand-icon">
            <Leaf size={25} />
          </div>
          <div>
            <strong>AyurScan</strong>
            <span>Plant Intelligence</span>
          </div>
        </Link>

        <div className="auth-brand-content">
          <div className="auth-small-label">
            <Sparkles size={14} /> START YOUR PLANT JOURNEY
          </div>

          <h1>
            Curiosity grows
            <br />
            <span>into knowledge.</span>
          </h1>

          <p>
            Create your account to explore plant profiles, save favorites
            and keep track of your identifications.
          </p>
        </div>

        <div className="auth-features">
          <div>
            <ShieldCheck size={18} />
            <span>Your personal plant collection</span>
          </div>
          <div>
            <Leaf size={18} />
            <span>Traditional plant knowledge in one place</span>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-container">
          <Link to="/" className="auth-back">
            ← Back to AyurScan
          </Link>

          <div className="auth-form-header">
            <div className="auth-mobile-logo">
              <Leaf size={20} />
            </div>
            <span>CREATE YOUR ACCOUNT</span>
            <h2>Join AyurScan</h2>
            <p>A fresh way to explore medicinal plants.</p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="register-name">Full name</label>
              <div className="auth-input-wrapper">
                <UserRound size={17} />
                <input
                  id="register-name"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email address</label>
              <div className="auth-input-wrapper">
                <Mail size={17} />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrapper">
                <LockKeyhole size={17} />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              <small className="field-hint">
                Use at least 6 characters.
              </small>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>ALREADY REGISTERED?</span>
          </div>

          <p className="auth-register-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <div className="auth-note">
            <ShieldCheck size={15} />
            <span>
              Your account is used to manage your saved plants and scan
              history.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}