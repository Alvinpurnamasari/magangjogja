export default function Contact() {
  return (
    <footer
      className="relative flex min-h-[800px] w-full flex-col bg-[#ffa63f] bg-cover bg-bottom bg-no-repeat px-6 pt-20 text-center text-white md:aspect-[2000/1299] md:min-h-0"
      style={{
        backgroundImage: "url('/images/beges.png')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-4xl font-black lowercase md:text-6xl">
          magangjogja.com
        </h2>

        <p className="mt-8 text-xl font-black uppercase">
          More Info
        </p>

        <h3 className="mt-1 text-2xl font-black">
          Kontak
        </h3>

        <a
          href="https://wa.me/6289529002944"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-4xl font-black text-[#d73472] transition hover:scale-105"
        >
          0895 2900 2944
        </a>

        <p className="mx-auto mt-5 max-w-4xl text-lg font-bold leading-8">
          Alamat kantor pusat Jl. Janti Gg. Arjuna No. 59, Karangjambe,
          Banguntapan, Bantul, Yogyakarta 55198
        </p>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/20 py-5">
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} MagangJogja. All rights reserved.
        </p>
      </div>
    </footer>
  );
}