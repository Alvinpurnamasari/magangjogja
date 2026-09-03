"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function FacilitiesManager({
  initialFacilities,
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
      setMessage("Nama fasilitas harus diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const highestOrder = initialFacilities.reduce(
      (highest, facility) =>
        Math.max(highest, facility.sort_order),
      0
    );

    const { error } = await supabase
      .from("facilities")
      .insert({
        title: title.trim(),
        sort_order: highestOrder + 1,
      });

    if (error) {
      setMessage("Fasilitas gagal ditambahkan.");
    } else {
      setTitle("");
      setMessage("Fasilitas berhasil ditambahkan.");
      router.refresh();
    }

    setLoading(false);
  }

  function startEdit(facility) {
    setEditingId(facility.id);
    setEditingTitle(facility.title);
    setMessage("");
  }

  async function handleUpdate(id) {
    if (!editingTitle.trim()) {
      setMessage("Nama fasilitas harus diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("facilities")
      .update({
        title: editingTitle.trim(),
      })
      .eq("id", id);

    if (error) {
      setMessage("Fasilitas gagal diubah.");
    } else {
      setEditingId(null);
      setEditingTitle("");
      setMessage("Fasilitas berhasil diubah.");
      router.refresh();
    }

    setLoading(false);
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus fasilitas ini?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("facilities")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage("Fasilitas gagal dihapus.");
    } else {
      setMessage("Fasilitas berhasil dihapus.");
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
          placeholder="Masukkan fasilitas baru"
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#38b98b] px-6 py-3 font-bold text-white transition hover:bg-[#2da87c] disabled:opacity-50"
        >
          Tambah
        </button>
      </form>

      {message && (
        <p className="mt-4 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700">
          {message}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {initialFacilities.map((facility, index) => (
          <div
            key={facility.id}
            className="rounded-2xl border border-gray-200 p-4"
          >
            {editingId === facility.id ? (
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
                  onClick={() => handleUpdate(facility.id)}
                  disabled={loading}
                  className="rounded-xl bg-blue-500 px-5 py-3 font-bold text-white"
                >
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="rounded-xl bg-gray-400 px-5 py-3 font-bold text-white"
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
                    {facility.title}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(facility)}
                    className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(facility.id)}
                    disabled={loading}
                    className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {initialFacilities.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            Belum ada fasilitas.
          </p>
        )}
      </div>
    </div>
  );
}