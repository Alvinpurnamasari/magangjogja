import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-[810px] overflow-hidden bg-[#40c79a] px-4 text-white lg:px-6"
      style={{
        backgroundImage: "url('/images/background-magangjogja.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative mx-auto grid min-h-[810px] max-w-7xl gap-0 lg:grid-cols-2 lg:items-center lg:gap-8">
        {/* Ilustrasi */}
        <div className="relative h-[390px] lg:h-[700px]">
          {/* Ornamen hijau */}
          <Image
            src="/images/bg-magangjogja.png"
            alt=""
            fill
            priority
            className="object-contain opacity-60"
          />

          {/* Karakter ungu */}
          <div className="hero-character-one absolute -top-5 left-6 h-[330px] w-[330px] lg:top-auto lg:-bottom-8 lg:left-0 lg:h-[600px] lg:w-[600px]">
            <Image
              src="/images/kerja-magangjogja.com.png"
              alt="Peserta magang memakai baju ungu"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Karakter merah */}
          <div className="hero-character-two absolute top-0 right-4 h-[340px] w-[340px] lg:top-auto lg:-bottom-12 lg:right-0 lg:h-[620px] lg:w-[620px]">
            <Image
              src="/images/alamat-magangjogja.com.png"
              alt="Peserta magang memakai baju merah"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Tulisan */}
        <div className="relative z-10 -mt-8 pb-16 text-center lg:mt-0 lg:pb-0 lg:text-left">
          <h1 className="font-[family-name:var(--font-luckiest-guy)] text-5xl uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl md:text-7xl lg:text-[96px]">
            Magang
            <span className="block">Kuy!</span>
          </h1>

          <h2 className="mx-auto mt-6 max-w-xl text-base font-black uppercase leading-[1.15] text-[#176a58] lg:mx-0 lg:mt-8 lg:text-lg">
            Kamu siswa SMK atau mahasiswa? Cari tempat PKL, magang, prakerin,
            OJT atau praktik kerja?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base font-bold leading-6 text-white lg:mx-0 lg:mt-7 lg:text-lg">
            Seven Inc membuka kesempatan buat Kamu yang ingin menjajal
            pengalaman kerja di bisnis yang dijalankan Seven Inc.
          </p>
        </div>
      </div>
    </section>
  );
}