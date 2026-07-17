"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
  try {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  } catch (err) {
    alert("Something went wrong. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

        <div className="mb-8 flex flex-col items-center">

  <Image
  src="/logo.png"
  alt="Mide's Farm Logo"
  width={180}
  height={180}
  priority
  className="rounded-2xl"
/>

  <h1 className="mt-5 text-4xl font-extrabold text-green-400">
    Mide's Farm ERP
  </h1>

  <p className="mt-3 text-slate-400">
    Farm Management System
  </p>

  <p className="mt-1 text-slate-500">
    Sign in to continue
  </p>
  <a
  href="https://midesfarm.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2 text-sm font-semibold text-green-400 transition hover:text-green-300 hover:underline"
>
  www.midesfarm.com
</a>
<p className="mt-2 text-xs text-slate-500">
  Version 1.0
</p>
</div>

        <div className="space-y-6">

          <div>

            <label className="mb-2 block text-slate-400">
              Email
            </label>

            <input
              autoFocus
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-800 p-4 text-white"
              placeholder="midesfarm@outlook.com"
            />

          </div>

          <div>

            <label className="mb-2 block text-slate-400">
              Password
            </label>

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
             }}
             className="w-full rounded-xl bg-slate-800 p-4 text-white"
             placeholder="********"
           />

          </div>

          <button
  onClick={login}
  disabled={loading}
  className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Signing In..." : "🔐 Sign In"}
</button>
          <p className="mt-8 text-center text-xs text-slate-500">
  © 2026 Mide's Farm & Poultry. All rights reserved.
</p>

        </div>

      </div>

    </div>
  );
}