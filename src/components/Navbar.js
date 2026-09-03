import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#38b98b]">
      <nav className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-5 xl:flex-row xl:justify-between">
        <a href="#beranda">
          <Image
            src="/images/M1.png"
            alt="MagangJogja.com"
            width={552}
            height={63}
            priority
            className="h-auto w-[280px] md:w-[350px]"
          />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center font-bold text-white">
          <a
            href="#syarat"
            className="transition hover:text-yellow-300"
          >
            Syarat & Ketentuan
          </a>

          <a
            href="#posisi"
            className="transition hover:text-yellow-300"
          >
            Posisi Magang
          </a>

          <a
            href="#fasilitas"
            className="transition hover:text-yellow-300"
          >
            Fasilitas
          </a>

          <a
            href="#tentang"
            className="transition hover:text-yellow-300"
          >
            Tentang Kami
          </a>
        </div>
      </nav>
    </header>
  );
}