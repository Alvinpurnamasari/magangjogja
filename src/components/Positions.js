import Image from "next/image";

const positions = [
  {
    id: 1,
    name: "Administrasi",
    image: "/images/positions/administrasi.svg",
  },
  {
    id: 2,
    name: "UI/UX Designer",
    image: "/images/positions/uiux.svg",
  },
  {
    id: 3,
    name: "Programmer Frontend/Backend",
    image: "/images/positions/programer.svg",
  },
  {
    id: 4,
    name: "Human Resource",
    image: "/images/positions/human.svg",
  },
  {
    id: 5,
    name: "Social Media Specialist",
    image: "/images/positions/sosmed.svg",
  },
  {
    id: 6,
    name: "Photographer /Videographer",
    image: "/images/positions/photograper.svg",
  },
  {
    id: 7,
    name: "Content Writer",
    image: "/images/positions/contentwriter.svg",
  },
  {
    id: 8,
    name: "Marketing & Sales",
    image: "/images/positions/marketing.svg",
  },
  {
    id: 9,
    name: "Desain Grafis",
    image: "/images/positions/desaingrafis.svg",
  },
  {
    id: 10,
    name: "Digital Market",
    image: "/images/positions/digitalmarket.svg",
  },
  {
    id: 11,
    name: "Marcomm/Public Relation",
    image: "/images/positions/marcomm.svg",
  },
  {
    id: 12,
    name: "Host/Presenter",
    image: "/images/positions/gost.svg",
  },
  {
    id: 13,
    name: "TikTok Creator",
    image: "/images/positions/tiktok.svg",
  },
  {
    id: 14,
    name: "Voice Over Talent",
    image: "/images/positions/voiceover.svg",
  },
  {
    id: 15,
    name: "Content Planner",
    image: "/images/positions/contentplaner.svg",
  },
  {
    id: 16,
    name: "Project Manager",
    image: "/images/positions/projectmanajer.svg",
  },
  {
    id: 17,
    name: "LAS",
    image: "/images/positions/las.svg",
  },
  {
    id: 18,
    name: "Animasi",
    image: "/images/positions/animasi.svg",
  },
];

export default function Positions() {
  return (
    <section
      id="posisi"
      className="relative overflow-hidden bg-[#ffc857] px-6 py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
      <div className="text-center text-white">
        <h2 className="font-[family-name:var(--font-luckiest-guy)] text-3xl uppercase leading-[1.1] tracking-[0.15em] md:text-4xl">
          Formasi Magang
          <span className="block">Untuk Kamu</span>
        </h2>

        <p className="mx-auto mt-8 max-w-6xl text-lg font-bold leading-7 md:text-xl">
          Beragam formasi yang kami sediakan sudah siap dengan tim ahli /
          pembimbing yang akan menemani magangmu
        </p>
      </div>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {positions.map((position) => (
            <article
              key={position.id}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-36 items-center justify-center md:h-44">
                <Image
                  src={position.image}
                  alt={position.name}
                  width={150}
                  height={150}
                  className="h-28 w-28 object-contain md:h-36 md:w-36"
                />
              </div>

              <div className="mt-4 flex min-h-20 w-full items-center justify-center rounded-3xl bg-[#38b98b] px-4 py-4 text-center font-[family-name:var(--font-luckiest-guy)] text-sm uppercase leading-tight tracking-wide text-white md:text-xl">
                {position.name}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Badge gratis */}
    
    </section>
  );
}