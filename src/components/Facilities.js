import { createClient } from "@/utils/supabase/server";

export default async function Facilities() {
  const supabase = await createClient();

  const { data: facilities, error } = await supabase
    .from("facilities")
    .select("id, title, sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Gagal mengambil fasilitas:", error.message);
  }

  return (
    <section
      id="fasilitas"
      className="relative bg-[#df7478] bg-cover bg-center px-6 pb-24 pt-28"
      style={{
        backgroundImage: "url('/images/bg.png')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center text-white">
        <h2 className="font-[family-name:var(--font-luckiest-guy)] text-3xl uppercase tracking-[0.15em] text-white md:text-4xl">
          Fasilitas yang
          <span className="block">didapat</span>
        </h2>
        </div>

        <div className="mx-auto mt-8 h-[2px] max-w-xl bg-[#8b3e35]" />

        {error ? (
          <p className="mt-10 text-center font-bold text-white">
            Data fasilitas belum dapat ditampilkan.
          </p>
        ) : (
          <div className="mt-16 space-y-6">
            {facilities?.map((facility) => (
              <article
                key={facility.id}
                className="rounded-3xl bg-[#ffc857] px-6 py-5 text-center shadow-[0_12px_0_#8b3e35] md:px-10"
              >
                <p className="text-lg font-black text-[#25283d] md:text-2xl">
                  {facility.title}
                </p>
              </article>
            ))}

            {facilities?.length === 0 && (
              <p className="text-center font-bold text-white">
                Belum ada fasilitas.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}