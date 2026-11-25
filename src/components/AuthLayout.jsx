export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth">
      <aside className="brand">
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
        <div className="logo"><span className="logo-mark" />Keyhold</div>
        <div className="brand-copy">
          <h2>Your account, locked down and effortless.</h2>
          <p>Passwords are hashed, sessions are signed, and your profile lives in your own database.</p>
        </div>
      </aside>
      <main className="panel">
        <div className="card">
          <h1>{title}</h1>
          <p className="sub">{subtitle}</p>
          {children}
        </div>
      </main>
    </div>
  );
}
