import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import RequirementsManager from "@/components/admin/RequirementsManager";

export default async function AdminRequirementsPage() {
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

    const { data: requirements, error } =await supabase
        .from("requirements")
        .select("*")
        .order("sort_order", { ascending: true });

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <Link href="/admin" className="font-bold text-[#38b98b] hover:underline">
                ←  Kembali ke Dashboard
                </Link>

                <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg md:p-10">
                    <p className="font-bold text-[#38b98b]">
                        Kelola Konten
                    </p>

                    <h1 className="mt-1 text-3xl font-black text-gray-800">
                        Syarat dan Ketentuan
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Tambah, ubah, atau hapus persyaratan magang.
                    </p>

                    {error ? (
                        <p className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
                            Data persyaratan gagal dimuat.
                        </p>
                    ) : (
                        <RequirementsManager
                        initialRequirements={requirements ?? []}/>
                    )}
                </div>
            </div>
        </main>
    );
}