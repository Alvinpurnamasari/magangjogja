import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#38b98b]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#beranda" aria-label="Kembali ke halaman utama">
          <Image
            src="/images/M1.png"
            alt="MagangJogja.com"
            width={552}
            height={63}
            priority
            className="h-auto w-[260px] md:w-[350px]"
          />
        </a>

        <div className="hidden items-center gap-8 font-bold text-white md:flex">
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