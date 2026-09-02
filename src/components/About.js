import Image from "next/image";

export default function About() {
  return (
    <section id="tentang" className="bg-[#40c79a] px-6 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[0.3em] text-[#176a58]">
            Tentang Kami
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase leading-tight text-white md:text-6xl">
            Belajar dan Bertumbuh Bersama
          </h2>

          <p className="mt-7 text-lg font-semibold leading-8 text-white">
            MagangJogja merupakan program dari Seven Inc yang memberikan
            kesempatan kepada siswa SMK dan mahasiswa untuk mendapatkan
            pengalaman kerja secara langsung.
          </p>

          <p className="mt-4 text-lg leading-8 text-white/90">
            Peserta akan mendapatkan pendampingan serta kesempatan untuk
            mengembangkan keterampilan, membangun relasi, dan mengenal dunia
            kerja melalui berbagai bidang yang tersedia.
          </p>

          <a
            href="https://wa.me/6289529002944"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-block rounded-full bg-[#ff9f3d] px-8 py-4 font-black uppercase text-white transition hover:bg-[#ed8524]"
          >
            Daftar Sekarang
          </a>
        </div>

        <div className="relative min-h-[450px]">
          <Image
            src="/images/beges.png"
            alt="Peserta MagangJogja"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}