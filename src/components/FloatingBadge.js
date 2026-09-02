import Image from "next/image";

export default function FloatingBadge() {
  return (
    <div className="fixed bottom-6 right-3 z-[60] md:bottom-10 md:right-6">
      <Image
        src="/images/free-tanpa-biaya-788941.png"
        alt="Gratis seratus persen tanpa biaya"
        width={280}
        height={280}
        className="h-auto w-32 drop-shadow-2xl md:w-52 lg:w-64"
        priority
      />
    </div>
  );
}