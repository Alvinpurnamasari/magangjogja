import { createClient } from "@/utils/supabase/server";

export default async function Requirements() {
  const supabase = await createClient();

  const { data: requirements, error} = await supabase
    .from ("requirements")
    .select("id, title, sort_order")
    .order("sort_order", {ascending: true});

    if (error) {
      console.error("Gagal mengambil syarat dan ketentuan:", error.message);
    }

    return (
      <section id="syarat" className="bg-[#40c79a]">

        {/*Judul section*/}
        <div className="border-y-[18px] border-[#df7478] bg-[#ffc857] px-6 py-8">
          <h2 className="text-center text-2xl font-black uppercase tracking-[0.25em] text-white">
            Syarat dan Ketentuan
          </h2>
        </div>

        {/*Daftar persyaratan*/}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
          {requirements?.map((requirement, index) => (
            <article key={requirement.id} className="rounded-3xl bg-white/10 p-7 text-center text-white transition hover:-translate-y-2 hover:bg-white/20">
              <div className="mx-auto flex !h-4 !w-14 min-h-14 min-w-14 shrink-0 items-center justify-center rounded-full bg-[#ffc857] text-2xl font-black leading-none text-[176a58]">
                {index + 1}
              </div>

              <p className="mt-5 text-lg font-semibold leading-7">
                {requirement.title}
              </p>
            </article>
          ))}

          {!error && requirements?.length === 0 && (
            <p className="col-span-full text-center font-semibold text-white">
              Belum ada syarat dan ketentuan
            </p>
          )}

          {error && (
            <p className="col-span-full text-center font-semibold text-white">
              Syarat dan ketentuan gagal dimuat
            </p>
          )}
        </div>
      </section>
    );
}