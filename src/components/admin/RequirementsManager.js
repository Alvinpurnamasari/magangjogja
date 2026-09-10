"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function RequirementsManager({
  initialRequirements,
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAdd(event) {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Persyaratan harus diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const highestOrder = initialRequirements.reduce(
      (highest, requirement) =>
        Math.max(highest, requirement.sort_order || 0),
      0
    );

    const { error } = await supabase
      .from("requirements")
      .insert({
        title: title.trim(),
        sort_order: highestOrder + 1,
      });

    if (error) {
      setMessage(`Gagal menambahkan: ${error.message}`);
    } else {
      setTitle("");
      setMessage("Persyaratan berhasil ditambahkan.");
      router.refresh();
    }

    setLoading(false);
  }

  function startEdit(requirement) {
    setEditingId(requirement.id);
    setEditingTitle(requirement.title);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
    setMessage("");
  }

  async function handleUpdate(id) {
    if (!editingTitle.trim()) {
      setMessage("Persyaratan harus diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("requirements")
      .update({
        title: editingTitle.trim(),
      })
      .eq("id", id);

    if (error) {
      setMessage(`Gagal mengubah: ${error.message}`);
    } else {
      setEditingId(null);
      setEditingTitle("");
      setMessage("Persyaratan berhasil diubah.");
      router.refresh();
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus persyaratan ini?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("requirements")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(`Gagal menghapus: ${error.message}`);
    } else {
      setMessage("Persyaratan berhasil dihapus.");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 md:flex-row"
      >
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Masukkan persyaratan baru"
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#38b98b] px-6 py-3 font-bold text-white transition hover:bg-[#2da87c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Tambah"}
        </button>
      </form>

      {message && (
        <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700">
          {message}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {initialRequirements.map((requirement, index) => (
          <div
            key={requirement.id}
            className="rounded-2xl border border-gray-200 p-4"
          >
            {editingId === requirement.id ? (
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(event) =>
                    setEditingTitle(event.target.value)
                  }
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
                />

                <button
                  type="button"
                  onClick={() => handleUpdate(requirement.id)}
                  disabled={loading}
                  className="rounded-xl bg-blue-500 px-5 py-3 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={loading}
                  className="rounded-xl bg-gray-400 px-5 py-3 font-bold text-white hover:bg-gray-500 disabled:opacity-50"
                >
                  Batal
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffc857] font-black text-gray-800">
                    {index + 1}
                  </span>

                  <p className="font-bold text-gray-800">
                    {requirement.title}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(requirement)}
                    disabled={loading}
                    className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(requirement.id)
                    }
                    disabled={loading}
                    className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {initialRequirements.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            Belum ada persyaratan.
          </p>
        )}
      </div>
    </div>
  );
}