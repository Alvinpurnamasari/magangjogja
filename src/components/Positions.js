import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Positions() {
  const supabase = await createClient();

  const { data: positions, error } = await supabase
    .from("positions")
    .select("id, title, image_url, sort_order, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Posisi magang gagal dimuat:", error.message);
  }

  return (
    <section
      id="posisi"
      className="relative overflow-hidden bg-[#ffc857] pt-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20">
        <div className="text-center text-white">
          <h2 className="font-[family-name:var(--font-luckiest-guy)] text-3xl uppercase leading-[1.1] tracking-[0.15em] md:text-4xl">
            Formasi Magang
            <span className="block">Untuk Kamu</span>
          </h2>

          <p className="mx-auto mt-8 max-w-6xl text-lg font-bold leading-7 md:text-xl">
            Beragam formasi yang kami sediakan sudah siap dengan tim ahli /
            pembimbing yang akan menemani magangmu
          </p>
        </div>

        {error ? (
          <div className="mt-14 rounded-2xl bg-red-100 p-5 text-center font-bold text-red-600">
            Posisi magang gagal dimuat.
          </div>
        ) : positions?.length === 0 ? (
          <div className="mt-14 rounded-2xl bg-white/20 p-5 text-center font-bold text-white">
            Belum ada posisi magang yang tersedia.
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {positions?.map((position, index) => (
              <ScrollReveal
                key={position.id}
                delay={(index % 4) * 100}
                direction="up"
                className="h-full"
              >
                <article className="flex h-full flex-col items-center text-center">
                <div className="flex h-36 items-center justify-center md:h-44">
                  <Image
                    src={position.image_url}
                    alt={position.title}
                    width={150}
                    height={150}
                    unoptimized
                    className="h-28 w-28 object-contain md:h-36 md:w-36"
                  />
                </div>

                <div className="mt-4 flex min-h-20 w-full items-center justify-center rounded-3xl bg-[#38b98b] px-4 py-4 text-center font-[family-name:var(--font-luckiest-guy)] text-sm uppercase leading-tight tracking-wide text-white md:text-xl">
                  {position.title}
                </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
        <div className="flex h-8 w-full">
          <div className="w-1/5 bg-[#a67ac1]"/>
          <div className="w-1/5 bg-[#7895c4]"/>
          <div className="w-1/5 bg-[#df7478]"/>
          <div className="w-1/5 bg-[#e9b83f]"/>
          <div className="w-1/5 bg-[#38b98b]"/>
        </div>
    </section>
  );
}