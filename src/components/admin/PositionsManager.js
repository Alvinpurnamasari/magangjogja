"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function PositionsManager({ initialPositions }) {
  const supabase = createClient();

  const [positions, setPositions] = useState(initialPositions);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function uploadImage(file) {
    if (!file) {
      return null;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();
    const fileName = `positions/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from("website-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleAdd(event) {
    event.preventDefault();

    if (!newTitle.trim()) {
      setMessage("Nama formasi magang harus diisi.");
      return;
    }

    if (!newImage) {
      setMessage("Pilih gambar formasi terlebih dahulu.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const imageUrl = await uploadImage(newImage);

      const highestOrder = positions.reduce(
        (highest, position) =>
          Math.max(highest, position.sort_order ?? 0),
        0
      );

      const { data, error } = await supabase
        .from("positions")
        .insert({
          title: newTitle.trim(),
          image_url: imageUrl,
          sort_order: highestOrder + 1,
          is_active: true,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setPositions((current) => [...current, data]);
      setNewTitle("");
      setNewImage(null);

      const fileInput = document.getElementById(
        "new-position-image"
      );

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage("Formasi magang berhasil ditambahkan.");
    } catch (error) {
      setMessage(`Gagal menambahkan posisi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(position) {
    setEditingId(position.id);
    setEditTitle(position.title);
    setEditImage(null);
    setMessage("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle("");
    setEditImage(null);
  }

  async function handleSaveEdit(position) {
    if (!editTitle.trim()) {
      setMessage("Nama formasi magang harus diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let imageUrl = position.image_url;

      if (editImage) {
        imageUrl = await uploadImage(editImage);
      }

      const { data, error } = await supabase
        .from("positions")
        .update({
          title: editTitle.trim(),
          image_url: imageUrl,
        })
        .eq("id", position.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setPositions((current) =>
        current.map((item) =>
          item.id === position.id ? data : item
        )
      );

      cancelEdit();
      setMessage("Formasi magang berhasil diperbarui.");
    } catch (error) {
      setMessage(`Gagal memperbarui posisi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(position) {
    try {
      const newStatus = !position.is_active;
  
      const { error } = await supabase
        .from("positions")
        .update({
          is_active: newStatus,
        })
        .eq("id", position.id);
  
      if (error) {
        throw new Error(error.message);
      }
  
      setPositions((current) =>
        current.map((item) =>
          item.id === position.id
            ? {
                ...item,
                is_active: newStatus,
              }
            : item
        )
      );
  
      setMessage(
        newStatus
          ? `"${position.title}" berhasil ditampilkan.`
          : `"${position.title}" berhasil disembunyikan.`
      );
    } catch (error) {
      window.alert(`Gagal mengubah status: ${error.message}`);
    }
  }

  async function handleDelete(position) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus formasi "${position.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("positions")
        .delete()
        .eq("id", position.id);

      if (error) {
        throw new Error(error.message);
      }

      setPositions((current) =>
        current.filter((item) => item.id !== position.id)
      );

      setMessage("Formasi magang berhasil dihapus.");
    } catch (error) {
      setMessage(`Gagal menghapus posisi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleAdd}
        className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
      >
        <h2 className="text-xl font-black text-[#17233b]">
          Tambah Formasi Baru
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div>
            <label
              htmlFor="new-position-title"
              className="mb-2 block font-bold text-gray-800"
            >
              Nama Formasi
            </label>

            <input
              id="new-position-title"
              type="text"
              value={newTitle}
              onChange={(event) =>
                setNewTitle(event.target.value)
              }
              placeholder="Contoh: Web Developer"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
            />
          </div>

          <div>
            <label
              htmlFor="new-position-image"
              className="mb-2 block font-bold text-gray-800"
            >
              Gambar Formasi
            </label>

            <input
              id="new-position-image"
              type="file"
              accept="image/svg+xml,image/png,image/jpeg,image/webp"
              onChange={(event) =>
                setNewImage(event.target.files?.[0] ?? null)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#38b98b] px-6 py-3 font-bold text-white transition hover:bg-[#2c9f78] disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Tambah"}
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`mt-5 rounded-xl p-4 font-semibold ${
            message.startsWith("Gagal") ||
            message.includes("harus") ||
            message.startsWith("Pilih")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {positions.map((position, index) => (
          <article
            key={position.id}
            className={`rounded-2xl border p-5 ${
              position.is_active
                ? "border-gray-200 bg-white"
                : "border-gray-300 bg-gray-100 opacity-70"
            }`}
          >
            {editingId === position.id ? (
              <div>
                <div className="relative h-40 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={position.image_url}
                    alt={position.title}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </div>

                <label className="mt-4 block font-bold text-gray-800">
                  Nama Formasi
                </label>

                <input
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(event.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
                />

                <label className="mt-4 block font-bold text-gray-800">
                  Ganti Gambar
                </label>

                <input
                  type="file"
                  accept="image/svg+xml,image/png,image/jpeg,image/webp"
                  onChange={(event) =>
                    setEditImage(event.target.files?.[0] ?? null)
                  }
                  className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-700"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Kosongkan jika tidak ingin mengganti gambar.
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleSaveEdit(position)}
                    className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white"
                  >
                    Simpan
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={cancelEdit}
                    className="rounded-lg bg-gray-500 px-4 py-2 font-bold text-white"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative h-40 overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={position.image_url}
                    alt={position.title}
                    fill
                    unoptimized
                    className="object-contain p-4"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm font-bold text-[#38b98b]">
                    Urutan {index + 1}
                  </p>

                  <h2 className="mt-1 text-xl font-black text-[#17233b]">
                    {position.title}
                  </h2>

                  <p
                    className={`mt-2 text-sm font-bold ${
                      position.is_active
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {position.is_active
                      ? "Ditampilkan"
                      : "Disembunyikan"}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(position)}
                    className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleToggle(position)}
                    className={`rounded-lg px-4 py-2 font-bold text-white ${
                      position.is_active
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  >
                    {position.is_active
                      ? "Sembunyikan"
                      : "Tampilkan"}
                  </button>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleDelete(position)}
                    className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}