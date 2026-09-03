"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#38b98b] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="text-center text-3xl font-black text-[#176a58]">
          Login Admin
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Masuk untuk mengelola konten MagangJogja
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
              placeholder="Masukkan password"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-100 px-4 py-3 text-sm font-bold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#ff9f3d] px-5 py-3 font-black text-white transition hover:bg-[#ed8d2e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sedang masuk..." : "Masuk"}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center font-bold text-[#176a58] hover:underline"
        >
          Kembali ke website
        </a>
      </div>
    </main>
  );
}