const facilities = [
  "Bimbingan dari staff / asisten kami",
  "Ada pelatihan diluar jam kerja",
  "Mendapatkan sertifikat + seragam magangjogja.com",
  "Koneksi Internet Free (bagi yang WFO)",
  "Bagi yang jauh dari luar kota diberikan info kost murah",
  "Free drink (Coffee & Tea)",
  "Mendapat surat rekomendasi",
  "Mendapatkan kesempatan untuk bergabung dan bekerjasama di project-project team kami",
  "Networking & Experience",
];

export default function Facilities() {
  return (
    <section
      id="fasilitas"
      className="bg-[#df7478] bg-cover bg-center px-6 pb-24 pt-28"
      style={{
        backgroundImage: "url('/images/bg.png')",
      }}
    >
      <div className="mx-auto max-w-5xl">
      <div className="mb-16 text-center text-white">
      <h2 className="font-[family-name:var(--font-luckiest-guy)] text-3xl uppercase leading-[1.1] tracking-[0.15em] md:text-4xl">
          Fasilitas yang
          <span className="block">Didapat</span>
        </h2>

        <div className="mx-auto mt-14 h-[3px] w-full max-w-xl bg-[#8b5555]" />
      </div>

        <div className="flex flex-col gap-6">
          {facilities.map((facility) => (
            <article
              key={facility}
              className="flex min-h-16 items-center justify-center rounded-3xl bg-[#ffc857] px-6 py-4 text-center shadow-[0_12px_0_#8b3e35] transition hover:-translate-y-1"
            >
              <p className="text-lg font-black leading-tight text-[#252a35] md:text-2xl">
                {facility}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}