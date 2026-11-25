import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../api";

const fmt = (d) => (d ? new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—");

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user.name, phone: user.phone || "", bio: user.bio || "" });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await updateProfile(form);
      setToast({ ok: true, text: "Profile saved" });
    } catch (err) {
      setToast({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="dash">
      <header className="top">
        <div className="logo dark"><span className="logo-mark" />Keyhold</div>
        <button className="btn ghost" onClick={logout}>Log out</button>
      </header>

      <section className="hero">
        <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div>
          <h1>Hi, {user.name.split(" ")[0]}</h1>
          <p>{user.email}</p>
        </div>
      </section>

      <section className="stats">
        <div><b>{user.loginCount}</b><span>Total logins</span></div>
        <div><b>{fmt(user.lastLogin)}</b><span>Last login</span></div>
        <div><b>{fmt(user.createdAt)}</b><span>Member since</span></div>
        <div><b className="cap">{user.role}</b><span>Account type</span></div>
      </section>

      <section className="edit">
        <h2>Your profile</h2>
        <form onSubmit={save}>
          <div className="row">
            <label>Full name<input name="name" value={form.name} onChange={change} required /></label>
            <label>Phone<input name="phone" placeholder="+92 300 1234567" value={form.phone} onChange={change} /></label>
          </div>
          <label>Bio<textarea name="bio" rows="3" maxLength="200" placeholder="Tell us a little about yourself" value={form.bio} onChange={change} /></label>
          <button className="btn narrow" disabled={busy}>{busy ? <span className="spinner" /> : "Save changes"}</button>
        </form>
      </section>

      {toast && <div className={`toast ${toast.ok ? "ok" : "bad"}`}>{toast.text}</div>}
    </div>
  );
}
