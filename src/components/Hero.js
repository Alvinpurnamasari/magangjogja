import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-[810px] overflow-hidden bg-[#40c79a] px-6 text-white"
      style={{
        backgroundImage: "url('/images/background-magangjogja.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative mx-auto grid min-h-[810px] max-w-7xl items-center gap-8 lg:grid-cols-2">
        {/* Ilustrasi sebelah kiri */}
        <div className="relative h-[700px]">
          {/* Ornamen hijau */}
          <Image
            src="/images/bg-magangjogja.png"
            alt=""
            fill
            priority
            className="object-contain opacity-60"
          />

{/* Karakter ungu */}
<div className="hero-character-one absolute -bottom-8 left-0 h-[600px] w-[600px]">
  <Image
    src="/images/kerja-magangjogja.com.png"
    alt="Peserta magang memakai baju ungu"
    fill
    priority
    className="object-contain"
  />
</div>

{/* Karakter merah */}
<div className="hero-character-two absolute -bottom-12 right-0 h-[620px] w-[620px]">
  <Image
    src="/images/alamat-magangjogja.com.png"
    alt="Peserta magang memakai baju merah"
    fill
    priority
    className="object-contain"
  />
</div>
        </div>

       {/* Tulisan sebelah kanan */}
      <div className="relative z-10 pb-16 lg:pb-0">
        <h1 className="font-[family-name:var(--font-luckiest-guy)] text-7xl uppercase leading-[1.05] tracking-[0.04em] text-white md:text-8xl lg:text-[96px]">
          Magang
          <span className="block">Kuy!</span>
        </h1>

        <h2 className="mt-8 max-w-xl text-lg font-black uppercase leading-[1.15] text-[#176a58] md:text-l">
          Kamu siswa SMK atau mahasiswa? Cari tempat PKL, magang, prakerin, OJT
          atau praktik kerja?
        </h2>

        <p className="mt-7 max-w-xl text-lg font-bold leading-6 text-white">
          Seven Inc membuka kesempatan buat Kamu yang ingin menjajal pengalaman
          kerja di bisnis yang dijalankan Seven Inc.
        </p>
      </div>
      </div>
    </section>
  );
}