import { createClient } from "@/utils/supabase/server";
import ScrollReveal from "@/components/ScrollReveal";

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
        <div className="border-t-[20px] border-t-[#7895c4] border-b-[18px] border-b-[#df7478] bg-[#ffc857] px-6 py-8">
          <h2 className="text-center text-2xl font-black uppercase tracking-[0.25em] text-white">
            Syarat dan Ketentuan
          </h2>
        </div>

        {/*Daftar persyaratan*/}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
          {requirements?.map((requirement, index) => (
            <ScrollReveal 
            key={requirement.id} 
            delay={(index % 3) * 120}
            direction={
              index % 3 === 0
              ? "left"
              : index % 3 === 2
                ? "right" 
                : "up"
            }
            className="h-full">
             <article className="flex min-h-[240px] h-full flex-col items-center justify-center rounded-3xl bg-white/10 p-7 text-white transition hover:-translate-y-2 hover:bg-white/20">
              <div
              className="mx-auto flex shrink-0 items-center justify-center rounded-full bg-[#ffc857] text-2xl font-black leading-none text-[#176a58]"
              style={{
                width: "56px",
                height: "56px",
                minWidth: "56px",
                minHeight: "56px",
              }}>
                {index + 1}
              </div>

              <p className="mt-5 text-lg font-semibold leading-7">
                {requirement.title}
              </p>
             </article>
            </ScrollReveal>
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
        <div className="flex h-8 w-full">
          <div className="flex-1 bg-[#38b98b]"/>
          <div className="flex-1 bg-[#e9b83f]"/>
          <div className="flex-1 bg-[#df7478]"/>
          <div className="flex-1 bg-[#7895c4]"/>
          <div className="flex-1 bg-[#a67ac1]"/>
        </div>
      </section>
    );
}