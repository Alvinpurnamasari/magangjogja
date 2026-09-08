import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ContactManager from "@/components/admin/ContactManager";

export default async function AdminContactPage( ) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    const { data: isAdmin } =await supabase.rpc("is_admin");

    if (!isAdmin) {
        redirect("/");
    }

    const { data: settings, error } = await supabase
        .from("site_settings")
        .select(
            `
            id,
            contact_phone,
            whatsapp_message,
            contact_address,
            logo_url,
            contact_background_url
            `
        )
        .eq("id", 1)
        .single();

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <Link href="/admin" className="font-bold text-[#38b98b] hover:underline">
                ← Kembali ke Dashboard
                </Link>

                <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg md:p-10">
                    <p className="font-bold text-[#38b98b]">Kelola Konten</p>
                    <h1 className="mt-1 text-3xl font-black text-[#17233b]">
                        Kontak
                    </h1>
                
                <p className="mt-2 text-gray-600">
                    Ubah nomer whatsapp, pesan otomatis, alamat, logo, dan gambar latar
                </p>

                {error ?(
                    <div className="mt-8 rounded-xl bg-red-100 p-4 text-red-600">
                        Data kontak gagal dimuat: {error.message}
                    </div>
                ) : (
                    <ContactManager initialSettings={settings} />
                )}
                </div>
            </div>
        </main>
    );
}