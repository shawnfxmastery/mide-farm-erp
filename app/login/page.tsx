"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Unable to get user.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) {
        alert(profileError.message);
        return;
      }

      console.log("Logged in as:", profile.role);

      router.push("/dashboard-v2");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">

        <div className="mb-8 flex flex-col items-center">

          <Image
            src="/logo.png"
            alt="Mide's Farm Logo"
            width={150}
            height={150}
            priority
            className="rounded-2xl"
          />

          <h1 className="mt-5 text-center text-3xl font-extrabold text-green-400 sm:text-4xl">
            Mide's Farm ERP
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
            className="mt-2 text-sm font-semibold text-green-400 hover:text-green-300 hover:underline"
          >
            www.midesfarm.com
          </a>

          <p className="mt-2 text-xs text-slate-500">
            Version 2.0
          </p>

        </div>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input
              autoFocus
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="midesfarm@outlook.com"
              className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none ring-1 ring-slate-700 transition focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Password
            </label>

            <div className="relative">

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
                className="w-full rounded-xl bg-slate-800 p-4 pr-14 text-white outline-none ring-1 ring-slate-700 transition focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "🔐 Sign In"}
          </button>

          <p className="pt-3 text-center text-xs text-slate-500">
            © 2026 Mide's Farm & Poultry
            <br />
            All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}