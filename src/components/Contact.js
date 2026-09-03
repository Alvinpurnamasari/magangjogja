"use client";

import Image from "next/image";
import { useRef } from "react";
export default function Contact() {
  const textRef = useRef(null);

  function handleMouseMove(event) {
    const area = event.currentTarget.getBoundingClientRect();
  
    const posisiX =
      (event.clientX - area.left) / area.width - 0.5;
  
    const posisiY =
      (event.clientY - area.top) / area.height - 0.5;
  
    const rotateY = posisiX * 10;
    const rotateX = posisiY * -8;
  
    if (textRef.current) {
      textRef.current.style.transform = `
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translate3d(${posisiX * 12}px, ${posisiY * 8}px, 0)
      `;
    }
  }

  function handleMouseLeave() {
    if (textRef.current) {
      textRef.current.style.transform = `
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        translate3d(0, 0, 0)
      `;
    }
  }
  return (
    
      <footer
        id="tentang"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex min-h-[800px] w-full flex-col bg-[#ffa63f] bg-cover bg-bottom bg-no-repeat px-6 pt-20 text-center text-white md:aspect-[2000/1299] md:min-h-0"
        style={{
          backgroundImage: "url('/images/beges.png')",
        }}
      >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Image
          src="/images/M1.png"
          alt="MagangJogja.com"
          width={552}
          height={63}
          className="mx-auto h-auto w-[320px] md:w-[550px] lg:w-[700px]"
        />

      <div
        ref={textRef}
        className="origin-center will-change-transform transition-transform duration-300 ease-out"
      >
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
          className="mt-3 inline-block text-4xl font-black text-[#d73472] transition-all duration-300 ease-in-out hover:scale-105 hover:text-black"
        >
          0895 2900 2944
        </a>

        <p className="mx-auto mt-5 max-w-4xl text-lg font-bold leading-8">
          Alamat kantor pusat Jl. Janti Gg. Arjuna No. 59, Karangjambe,
          Banguntapan, Bantul, Yogyakarta 55198
        </p>
      </div>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/20 py-5">
        <p className="text-sm font-semibold">
          © {new Date().getFullYear()} MagangJogja. All rights reserved.
        </p>
      </div>
    </footer>
  );
}