"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AccountManager({ currentEmail }) {
  const router = useRouter();
  const supabase = createClient();

  const [newEmail, setNewEmail] = useState(currentEmail || "");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  async function verifyCurrentPassword(password) {
    const { error } = await supabase.auth.signInWithPassword({
      email: currentEmail,
      password,
    });

    if (error) {
      throw new Error("Password saat ini salah.");
    }
  }

  async function handleUpdateEmail(event) {
    event.preventDefault();
    setEmailMessage("");
  
    const cleanEmail = newEmail.trim().toLowerCase();
  
    if (!cleanEmail) {
      setEmailMessage("Email baru harus diisi.");
      return;
    }
  
    if (cleanEmail === currentEmail?.toLowerCase()) {
      setEmailMessage(
        "Email baru masih sama dengan email lama."
      );
      return;
    }
  
    setEmailLoading(true);
  
    try {
      const response = await fetch("/api/admin/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: "",
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(
          result.error || "Email gagal diubah."
        );
      }
  
      setEmailMessage(
        "Email admin berhasil diubah. Silakan login kembali."
      );
  
      await supabase.auth.signOut();
  
      router.replace(
        "/admin/login?message=email-updated"
      );
      router.refresh();
    } catch (error) {
      setEmailMessage(
        error.message || "Email gagal diubah."
      );
      setEmailLoading(false);
    }
  }
  
  async function handleUpdatePassword(event) {
    event.preventDefault();
    setPasswordMessage("");

    if (!currentPassword) {
      setPasswordMessage("Masukkan password saat ini.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "Password baru minimal 8 karakter."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "Konfirmasi password baru tidak sama."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordMessage(
        "Password baru tidak boleh sama dengan password lama."
      );
      return;
    }

    setPasswordLoading(true);

    try {
      await verifyCurrentPassword(currentPassword);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();

      router.replace(
        "/admin/login?message=password-updated"
      );
      router.refresh();
    } catch (error) {
      setPasswordMessage(
        error.message || "Password gagal diubah."
      );
      setPasswordLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleUpdateEmail}
        className="rounded-3xl bg-white p-7 shadow-md"
      >
        <h2 className="text-2xl font-black text-gray-800">
          Ubah Email
        </h2>

        <p className="mt-2 text-gray-600">
          Email saat ini:{" "}
          <span className="font-bold">
            {currentEmail}
          </span>
        </p>

        <label className="mt-6 block font-bold text-gray-700">
          Email baru
        </label>

        <input
          type="email"
          value={newEmail}
          onChange={(event) =>
            setNewEmail(event.target.value)
          }
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
          required
        />



        {emailMessage && (
          <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
            {emailMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={emailLoading}
          className="mt-5 rounded-xl bg-[#38b98b] px-6 py-3 font-bold text-white transition hover:bg-[#2da87c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {emailLoading
            ? "Menyimpan..."
            : "Ubah Email"}
        </button>
      </form>

      <form
        onSubmit={handleUpdatePassword}
        className="rounded-3xl bg-white p-7 shadow-md"
      >
        <h2 className="text-2xl font-black text-gray-800">
          Ubah Password
        </h2>

        <p className="mt-2 text-gray-600">
          Setelah password berhasil diubah, kamu akan
          diminta login kembali.
        </p>

        <label className="mt-6 block font-bold text-gray-700">
          Password saat ini
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(event) =>
            setCurrentPassword(event.target.value)
          }
          autoComplete="current-password"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
          required
        />

        <label className="mt-4 block font-bold text-gray-700">
          Password baru
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(event) =>
            setNewPassword(event.target.value)
          }
          autoComplete="new-password"
          minLength={8}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
          required
        />

        <label className="mt-4 block font-bold text-gray-700">
          Konfirmasi password baru
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          autoComplete="new-password"
          minLength={8}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
          required
        />

        {passwordMessage && (
          <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700">
            {passwordMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={passwordLoading}
          className="mt-5 rounded-xl bg-[#38b98b] px-6 py-3 font-bold text-white transition hover:bg-[#2da87c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {passwordLoading
            ? "Menyimpan..."
            : "Ubah Password"}
        </button>
      </form>
    </div>
  );
}