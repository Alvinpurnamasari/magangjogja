export default function Navbar() {
    return (
      <header className="sticky top-0 z-50 bg-[#38b98b]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#beranda"
            className="text-2xl font-black lowercase text-white md:text-4xl"
          >
            magangjogja.com
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