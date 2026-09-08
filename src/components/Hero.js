import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

const defaultSettings = {
  hero_title: "MAGANG KUY!",
  hero_question:
    "KAMU SISWA SMK ATAU MAHASISWA? CARI TEMPAT PKL, MAGANG, PRAKERIN, OJT ATAU PRAKTIK KERJA?",
  hero_description:
    "Seven Inc membuka kesempatan buat Kamu yang ingin menjajal pengalaman kerja di bisnis yang dijalankan Seven Inc.",
  hero_background_url: "/images/background-magangjogja.png",
  hero_decoration_url: "/images/bg-magangjogja.png",
  hero_character_one_url: "/images/kerja-magangjogja.com.png",
  hero_character_two_url: "/images/alamat-magangjogja.com.png",
};

export default async function Hero() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("site_settings")
    .select(`
      hero_title,
      hero_question,
      hero_description,
      hero_background_url,
      hero_decoration_url,
      hero_character_one_url,
      hero_character_two_url
    `)
    .eq("id", 1)
    .single();

  const settings = data ?? defaultSettings;

  const [firstTitle, ...remainingTitle] =
    settings.hero_title.trim().split(/\s+/);

  return (
    <section
      id="beranda"
      className="relative min-h-[810px] overflow-hidden bg-[#40c79a] px-4 text-white lg:px-6"
      style={{
        backgroundImage: `url("${settings.hero_background_url}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative mx-auto grid min-h-[810px] max-w-7xl gap-0 lg:grid-cols-2 lg:items-center lg:gap-8">
      <div className="relative h-[500px] md:h-[580px] lg:h-[700px]">
          <Image
            src={settings.hero_decoration_url}
            alt=""
            fill
            priority
            unoptimized
            className="object-contain opacity-60"
          />

        <div className="hero-character-one absolute -top-8 -left-14 h-[450px] w-[450px] sm:left-[2%] md:-top-12 md:left-[10%] md:h-[580px] md:w-[580px] lg:top-auto lg:-bottom-8 lg:left-0 lg:h-[600px] lg:w-[600px]">
            <Image
              src={settings.hero_character_one_url}
              alt="Karakter pertama"
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </div>

          <div className="hero-character-two absolute -top-4 -right-14 h-[460px] w-[460px] sm:right-[2%] md:-top-8 md:right-[8%] md:h-[600px] md:w-[600px] lg:top-auto lg:-bottom-12 lg:right-0 lg:h-[620px] lg:w-[620px]">
            <Image
              src={settings.hero_character_two_url}
              alt="Karakter kedua"
              fill
              priority
              unoptimized
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 -mt-8 pb-16 text-center lg:mt-0 lg:pb-0 lg:text-left">
          <h1 className="font-[family-name:var(--font-luckiest-guy)] text-5xl uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl md:text-7xl lg:text-[96px]">
            {firstTitle}

            {remainingTitle.length > 0 && (
              <span className="block">
                {remainingTitle.join(" ")}
              </span>
            )}
          </h1>

          <h2 className="mx-auto mt-6 max-w-xl text-base font-black uppercase leading-[1.15] text-[#176a58] lg:mx-0 lg:mt-8 lg:text-lg">
            {settings.hero_question}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-bold leading-6 text-white lg:mx-0 lg:mt-7 lg:text-lg">
            {settings.hero_description}
          </p>
        </div>
      </div>
    </section>
  );
}