"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Tractor,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function login() {
    try {
      setErrorMessage("");
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("We could not sign you in. Please check your email and password.");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setErrorMessage("Your sign-in could not be confirmed. Please try again.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setErrorMessage("Your account profile could not be loaded. Please try again.");
        return;
      }

      console.log("Logged in as:", profile.role);

      router.push("/dashboard-v2");
      router.refresh();
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f8f4] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-[32px] border border-emerald-950/10 bg-white shadow-[0_24px_80px_rgba(21,64,45,0.14)] lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[#0d3b2e] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-lime-300/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20"><Tractor size={22} /></span>
            <div><p className="text-sm font-semibold tracking-wide text-emerald-100">MIDE&apos;S FARM &amp; POULTRY</p><p className="text-xs text-emerald-200/70">Management workspace</p></div>
          </div>
          <div className="relative my-auto">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-lime-300">Farm intelligence, in one place</p>
            <h1 className="max-w-md text-5xl font-semibold leading-tight tracking-tight">Run today&apos;s farm with tomorrow&apos;s clarity.</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-emerald-100/80">A single operational view for your flock, egg production, inventory, sales and farm finances.</p>
            <div className="mt-10 space-y-4 text-sm text-emerald-50">
              <p className="flex items-center gap-3"><span className="rounded-xl bg-white/10 p-2"><BarChart3 size={17} /></span>Live production &amp; flock performance</p>
              <p className="flex items-center gap-3"><span className="rounded-xl bg-white/10 p-2"><ShieldCheck size={17} /></span>Inventory and sales reconciliation</p>
              <p className="flex items-center gap-3"><span className="rounded-xl bg-white/10 p-2"><Tractor size={17} /></span>Built to grow with every farm house</p>
            </div>
          </div>
          <p className="relative text-xs text-emerald-100/60">Secure farm operations portal · Version 2.0</p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12">
      <div className="relative w-full max-w-md">

        <div className="mb-8 flex flex-col items-center">

          <Image
            src="/logo.png"
            alt="Mide's Farm Logo"
            width={150}
            height={150}
            priority
            className="rounded-2xl"
          />

          <h1 className="mt-5 text-center text-3xl font-extrabold tracking-tight text-emerald-800 sm:text-4xl">
            Mide&apos;s Farm ERP
          </h1>

          <p className="mt-2 text-center text-slate-400">
            Farm Management System
          </p>

          <p className="mt-1 text-center text-slate-500">
            Sign in to continue
          </p>

          <a
            href="https://midesfarm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            www.midesfarm.com
          </a>

          <p className="mt-2 text-xs text-slate-500">
            Version 2.0
          </p>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              autoFocus
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="midesfarm@outlook.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="relative">

              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    login();
                  }
                }}
                placeholder="********"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-14 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-emerald-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {errorMessage && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}

          <button
            onClick={login}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-4 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing you in…" : "Sign in securely"}
            {!loading && <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />}
          </button>

          <p className="pt-3 text-center text-xs text-slate-500">
            © 2026 Mide&apos;s Farm & Poultry
            <br />
            All rights reserved.
          </p>

        </div>

      </div>
        </section>
      </div>
    </main>
  );
}
