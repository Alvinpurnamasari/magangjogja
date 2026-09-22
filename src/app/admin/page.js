import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

const menus = [
  {
    title: "Halaman Utama",
    description: "Ubah judul, deskripsi, dan gambar utama.",
    href: "/admin/hero",
  },
  {
    title: "Syarat dan Ketentuan",
    description: "Tambah, edit, dan hapus persyaratan magang.",
    href: "/admin/requirements",
  },
  {
    title: "Formasi Magang",
    description: "Tambah, edit, dan hapus formasi magang.",
    href: "/admin/positions",
  },
  {
    title: "Fasilitas",
    description: "Kelola seluruh fasilitas peserta magang.",
    href: "/admin/facilities",
  },
  {
    title: "Kontak",
    description: "Ubah nomor WhatsApp, alamat, dan logo.",
    href: "/admin/contact",
  },
  {
    title: "Pengaturan Akun",
    description: "Ubah email dan password login admin.",
    href: "/admin/account",
  },
];

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-[#38b98b] px-6 py-5 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-black md:text-3xl">
              Admin MagangJogja
            </h1>

            <p className="mt-1 text-sm text-white/80">
              {user.email}
            </p>
          </div>

          <LogoutButton />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="font-bold text-[#38b98b]">
            Dashboard
          </p>

          <h2 className="mt-1 text-3xl font-black text-gray-800">
            Kelola Konten Website
          </h2>

          <p className="mt-2 text-gray-600">
            Pilih bagian website yang ingin diubah.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="rounded-3xl bg-white p-7 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-xl font-black text-gray-800">
                {menu.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                {menu.description}
              </p>

              <p className="mt-6 font-black text-[#38b98b]">
                Kelola →
              </p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          target="_blank"
          className="mt-10 inline-block rounded-xl bg-[#ff9f3d] px-6 py-3 font-black text-white transition hover:bg-[#ed8d2e]"
        >
          Lihat Website
        </Link>
      </section>
    </main>
  );
}