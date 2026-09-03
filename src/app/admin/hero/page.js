import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import HeroManager from "@/components/admin/HeroManager";


export default async function AdminHeroPage() {
    const supabase  = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    const { data: isAdmin } = await supabase.rpc("is_admin");

    if (!isAdmin) {
        redirect("/")
    }

    const { data: settings, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();

    return(
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto maz-w-5xl">
                <Link href="/admin"
                className="font-bold text-[#38b98b] hover:underline">← Kembali ke Dashboard
                </Link>

                <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg md:p-10">
                <h1 className="mt-6 rounded-3xl font-black text-gray-800">
                    Kelola Hero Website
                </h1>

                <p className="mt-2 text-gray-600">
                    Ubah tulisan dan gambar pada bagian utama website
                </p>

                {error? (
                    <p className="mt-6 rounded-xl bg-red-100 p-4 text-red-700">
                        Data Hero gagal dimuat.
                    </p>
                ) : (
                    <HeroManager initialSettings={settings} />
                )}
                </div>

            </div>
        </main>
    );
}