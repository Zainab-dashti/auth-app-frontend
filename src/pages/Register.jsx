import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../api";

const strength = (pw) => {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};
const labels = ["Too short", "Weak", "Okay", "Good", "Strong"];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const score = form.password ? strength(form.password) : 0;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords don't match");
    setBusy(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="It takes less than a minute.">
      <form onSubmit={submit}>
        {error && <div className="alert" role="alert">{error}</div>}
        <label>Full name
          <input name="name" placeholder="Ayesha Khan" value={form.name} onChange={change} required autoComplete="name" />
        </label>
        <label>Email
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={change} required autoComplete="email" />
        </label>
        <label>Password
          <PasswordInput name="password" placeholder="At least 6 characters" value={form.password} onChange={change} required minLength={6} autoComplete="new-password" />
        </label>
        {form.password && (
          <div className="meter" data-score={score}>
            <div className="bars">{[1, 2, 3, 4].map((n) => <i key={n} className={n <= score ? "on" : ""} />)}</div>
            <span>{labels[score]}</span>
          </div>
        )}
        <label>Confirm password
          <PasswordInput name="confirm" placeholder="Repeat your password" value={form.confirm} onChange={change} required autoComplete="new-password" />
        </label>
        <button className="btn" disabled={busy}>{busy ? <span className="spinner" /> : "Create account"}</button>
      </form>
      <p className="switch">Already have an account? <Link to="/login">Log in</Link></p>
    </AuthLayout>
  );
}
