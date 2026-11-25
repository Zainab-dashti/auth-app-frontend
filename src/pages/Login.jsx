import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to see your dashboard.">
      <form onSubmit={submit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <label>Email
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>Password
          <PasswordInput name="password" placeholder="Your password" value={form.password} onChange={change} required autoComplete="current-password" />
        </label>
        <button className="btn" disabled={busy}>{busy ? <span className="spinner" /> : "Log in"}</button>
      </form>
      <p className="switch">New here? <Link to="/register">Create an account</Link></p>
    </AuthLayout>
  );
}
