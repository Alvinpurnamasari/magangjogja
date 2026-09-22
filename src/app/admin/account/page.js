import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import AccountManager from "@/components/admin/AccountManager";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: isAdmin } = await supabase.rpc(
    "is_admin"
  );

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/admin"
          className="font-bold text-[#38b98b] hover:underline"
        >
          ← Kembali ke Dashboard
        </Link>

        <div className="mb-8 mt-8">
          <p className="font-bold text-[#38b98b]">
            Pengaturan
          </p>

          <h1 className="mt-1 text-3xl font-black text-gray-800">
            Pengaturan Akun Admin
          </h1>

          <p className="mt-2 text-gray-600">
            Ubah email dan password yang digunakan
            untuk masuk ke halaman admin.
          </p>
        </div>

        <AccountManager currentEmail={user.email} />
      </section>
    </main>
  );
}