"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const imageFields = [
  {
    key: "hero_background_url",
    label: "Background Hero",
  },
  {
    key: "hero_character_one_url",
    label: "Karakter Ungu",
  },
  {
    key: "hero_character_two_url",
    label: "Karakter Merah",
  },
];

export default function HeroManager({ initialSettings }) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    hero_title: initialSettings.hero_title ?? "",
    hero_question: initialSettings.hero_question ?? "",
    hero_description: initialSettings.hero_description ?? "",
  });

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleFileChange(event, field) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Ukuran gambar maksimal 10 MB.");
      return;
    }

    setFiles((current) => ({
      ...current,
      [field]: file,
    }));

    setMessage("");
  }

  async function uploadImage(file, field) {
    const extension = file.name.split(".").pop();
    const fileName =
      `hero/${field}-${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("website-images")
      .upload(fileName, file);

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const updates = {
        ...form,
        updated_at: new Date().toISOString(),
      };

      for (const field of imageFields) {
        const file = files[field.key];

        if (file) {
          updates[field.key] = await uploadImage(
            file,
            field.key
          );
        }
      }

      const { error } = await supabase
        .from("site_settings")
        .update(updates)
        .eq("id", 1);

      if (error) {
        throw new Error(error.message);
      }

      setFiles({});
      setMessage("Hero berhasil diperbarui.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage(`Gagal menyimpan Hero: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-7">
      <div>
        <label className="mb-2 block font-bold text-gray-700">
          Judul Hero
        </label>

        <input
          type="text"
          name="hero_title"
          value={form.hero_title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-700">
          Pertanyaan Hero
        </label>

        <textarea
          name="hero_question"
          value={form.hero_question}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-700">
          Deskripsi Hero
        </label>

        <textarea
          name="hero_description"
          value={form.hero_description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {imageFields.map((field) => (
          <div
            key={field.key}
            className="rounded-2xl border border-gray-200 p-5"
          >
            <p className="font-black text-gray-800">
              {field.label}
            </p>

            <div className="mt-4 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              <img
                src={initialSettings[field.key]}
                alt={field.label}
                className="h-full w-full object-contain"
              />
            </div>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(event) =>
                handleFileChange(event, field.key)
              }
              className="mt-4 block w-full text-sm text-gray-600"
            />

            {files[field.key] && (
              <p className="mt-2 text-sm font-semibold text-[#38b98b]">
                File dipilih: {files[field.key].name}
              </p>
            )}
          </div>
        ))}
      </div>

      {message && (
        <p className="rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[#38b98b] px-8 py-3 font-black text-white transition hover:bg-[#2da87c] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}