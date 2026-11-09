"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  

async function onSubmit(e) {
  e.preventDefault();
  setBusy(true);
  setError("");
  const res = await signIn("credentials", { email, password, redirect: false });
  if (res?.error) {
    setBusy(false);
    return setError("Incorrect email or password.");
  }
  await getSession(); 
  router.refresh();  
  router.replace("/portal/dashboard");
}

  return (
    <div className="pt-auth">
      <form className="pt-auth-card" onSubmit={onSubmit}>
        <h1>Teacher sign in</h1>
        <p className="pt-sub">Sign in to create and manage your work.</p>
        <div className="pt-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="pt-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="pt-error" role="alert">{error}</p>}
        <button className="pt-btn block" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
