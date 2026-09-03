import Image from "next/image";

export default function FloatingBadge() {
  return (
    <div className="fixed bottom-6 right-3 z-[60] md:bottom-10 md:right-6">
      <a
        href="#tentang"
        aria-label="Lihat informasi kontak MagangJogja"
        className="block cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <Image
          src="/images/free-tanpa-biaya-788941.png"
          alt="Gratis 100 persen tanpa biaya"
          width={280}
          height={280}
          className="h-auto w-32 drop-shadow-2xl md:w-52 lg:w-64"
          priority
        />
      </a>
    </div>
  );
}