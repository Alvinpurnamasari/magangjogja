"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const defaultSettings = {
  contact_phone: "6289529002944",
  whatsapp_message:
    "Hai admin magangjogja.com, saya ingin bertanya mengenai program magang.",
  contact_address:
    "Alamat kantor pusat Jl. Janti Gg. Arjuna No. 59, Karangjambe, Banguntapan, Bantul, Yogyakarta 55198",
  logo_url: "/images/M1.png",
  contact_background_url: "/images/beges.png",
};

function normalizePhone(phone) {
  let number = String(phone ?? "").replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = `62${number.slice(1)}`;
  }

  return number;
}

function formatPhone(phone) {
  const number = normalizePhone(phone);
  const localNumber = number.startsWith("62")
    ? `0${number.slice(2)}`
    : number;

  return localNumber.replace(
    /^(\d{4})(\d{4})(\d+)$/,
    "$1 $2 $3"
  );
}

export default function Contact() {
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const [logoVisible, setLogoVisible] = useState(false);

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    async function loadContact() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("site_settings")
        .select(
          `
            contact_phone,
            whatsapp_message,
            contact_address,
            logo_url,
            contact_background_url
          `
        )
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Data kontak gagal dimuat:", error.message);
        return;
      }

      if (data) {
        setSettings({
          contact_phone:
            data.contact_phone || defaultSettings.contact_phone,
          whatsapp_message:
            data.whatsapp_message ||
            defaultSettings.whatsapp_message,
          contact_address:
            data.contact_address ||
            defaultSettings.contact_address,
          logo_url: data.logo_url || defaultSettings.logo_url,
          contact_background_url:
            data.contact_background_url ||
            defaultSettings.contact_background_url,
        });
      }
    }

    loadContact();
  }, []);

  useEffect(() => {
    const logo = logoRef.current;
  
    if (!logo) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLogoVisible(true);
          observer.unobserve(logo);
        }
      },
      {
        threshold: 0.3,
      }
    );
  
    observer.observe(logo);
  
    return () => observer.disconnect();
  }, []);

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

  const whatsappNumber = normalizePhone(
    settings.contact_phone
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    settings.whatsapp_message
  )}`;

  return (
    <footer
      id="tentang"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[800px] w-full scroll-mt-[190px] flex-col bg-[#ffa63f] bg-[length:auto_62%] bg-bottom bg-no-repeat px-4 pt-16 text-center text-white md:aspect-[2000/1299] md:min-h-0 md:scroll-mt-[100px] md:bg-cover md:px-6 md:pt-20"
      style={{
        backgroundImage: `url("${settings.contact_background_url}")`,
      }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Image
          ref={logoRef}
          src={settings.logo_url}
          alt="MagangJogja.com"
          width={552}
          height={63}
          unoptimized
          className={`mx-auto h-auto w-[320px] md:w-[550px] lg:w-[700px] 
          ${logoVisible ? "contact-logo-show" : "scale-0 opacity"}`}
        />

        <div
          ref={textRef}
          className="origin-center transition-transform duration-300 ease-out will-change-transform"
        >
          <p className="mt-8 text-xl font-black uppercase">
            More Info
          </p>

          <h3 className="mt-1 text-2xl font-black">
            Kontak
          </h3>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-3xl font-black text-[#d73472] transition-all duration-200 hover:scale-105 hover:text-black active:scale-95 active:text-black md:text-4xl"
          >
            {formatPhone(settings.contact_phone)}
          </a>

          <p className="mx-auto mt-5 max-w-4xl text-lg font-bold leading-8">
            {settings.contact_address}
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