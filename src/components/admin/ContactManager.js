"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ContactManager({ initialSettings }) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    contact_phone: initialSettings?.contact_phone ?? "",
    whatsapp_message: initialSettings?.whatsapp_message ?? "",
    contact_address: initialSettings?.contact_address ?? "",
    logo_url: initialSettings?.logo_url ?? "",
    contact_background_url:
      initialSettings?.contact_background_url ?? "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function uploadImage(file, folder) {
    if (!file) {
      return null;
    }

    const extension = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("website-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      let logoUrl = form.logo_url;
      let backgroundUrl = form.contact_background_url;

      if (logoFile) {
        logoUrl = await uploadImage(logoFile, "contact/logo");
      }

      if (backgroundFile) {
        backgroundUrl = await uploadImage(
          backgroundFile,
          "contact/background"
        );
      }

      const updatedData = {
        contact_phone: form.contact_phone.trim(),
        whatsapp_message: form.whatsapp_message.trim(),
        contact_address: form.contact_address.trim(),
        logo_url: logoUrl,
        contact_background_url: backgroundUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("site_settings")
        .update(updatedData)
        .eq("id", 1);

      if (error) {
        throw new Error(error.message);
      }

      setForm((currentForm) => ({
        ...currentForm,
        logo_url: logoUrl,
        contact_background_url: backgroundUrl,
      }));

      setLogoFile(null);
      setBackgroundFile(null);
      setMessage("Data kontak berhasil disimpan.");

      router.refresh();
    } catch (error) {
      setMessage(`Gagal menyimpan data: ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="contact_phone"
          className="mb-2 block font-bold text-gray-800"
        >
          Nomor WhatsApp
        </label>

        <input
          id="contact_phone"
          name="contact_phone"
          type="text"
          value={form.contact_phone}
          onChange={handleChange}
          placeholder="Contoh: 6289529002944"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />

        <p className="mt-2 text-sm text-gray-500">
          Gunakan format 62 tanpa tanda +, spasi, atau tanda hubung.
        </p>
      </div>

      <div>
        <label
          htmlFor="whatsapp_message"
          className="mb-2 block font-bold text-gray-800"
        >
          Pesan WhatsApp
        </label>

        <textarea
          id="whatsapp_message"
          name="whatsapp_message"
          value={form.whatsapp_message}
          onChange={handleChange}
          rows={4}
          placeholder="Pesan yang muncul ketika nomor WhatsApp diklik"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />
      </div>

      <div>
        <label
          htmlFor="contact_address"
          className="mb-2 block font-bold text-gray-800"
        >
          Alamat Kantor
        </label>

        <textarea
          id="contact_address"
          name="contact_address"
          value={form.contact_address}
          onChange={handleChange}
          rows={4}
          placeholder="Masukkan alamat kantor"
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#38b98b]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="mb-4 font-bold text-gray-800">Logo Website</p>

          {form.logo_url && (
            <div className="relative mb-4 h-32 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={form.logo_url}
                alt="Logo website"
                fill
                unoptimized
                className="object-contain p-4"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(event) =>
              setLogoFile(event.target.files?.[0] ?? null)
            }
            className="w-full text-sm text-gray-700"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="mb-4 font-bold text-gray-800">
            Gambar Latar Kontak
          </p>

          {form.contact_background_url && (
            <div className="relative mb-4 h-32 overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={form.contact_background_url}
                alt="Gambar latar kontak"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(event) =>
              setBackgroundFile(event.target.files?.[0] ?? null)
            }
            className="w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl p-4 font-semibold ${
            message.startsWith("Gagal")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-[#38b98b] px-7 py-3 font-bold text-white transition hover:bg-[#2c9f78] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}