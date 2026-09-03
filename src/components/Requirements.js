const requirements = [
    {
      id: 1,
      text: "Mengisi Form Pendaftaran Magang yang dapat diminta kepada Admin MagangJogja.",
    },
    {
      id: 2,
      text: "Membawa surat keterangan atau surat pengantar dari sekolah atau kampus.",
    },
    {
      id: 3,
      text: "Direstui orang tua atau sudah mendapatkan izin dari orang tua.",
    },
    {
      id: 4,
      text: "Memiliki niat positif untuk mencari keterampilan dan pengalaman selama magang.",
    },
    {
      id: 5,
      text: "Mau berlatih hidup mandiri, dewasa, dan jauh dari orang tua.",
    },
    {
      id: 6,
      text: "Mau berinteraksi dengan karyawan serta menjaga nama baik semua pihak.",
    },
  ];
  
  export default function Requirements() {
    return (
      <section id="syarat" className="bg-[#40c79a]">
        {/* Judul section */}
        <div className="border-y-[18px] border-[#df7478] bg-[#ffc857] px-6 py-8">
          <h2 className="text-center text-2xl font-black uppercase tracking-[0.25em] text-white">
            Syarat dan Ketentuan
          </h2>
        </div>
  
        {/* Daftar persyaratan */}
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
          {requirements.map((requirement) => (
            <article
              key={requirement.id}
              className="rounded-3xl bg-white/10 p-7 text-center text-white transition hover:-translate-y-2 hover:bg-white/20"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffc857] text-2xl font-black text-[#176a58]">
                {requirement.id}
              </div>
  
              <p className="mt-5 text-lg font-semibold leading-7">
                {requirement.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }