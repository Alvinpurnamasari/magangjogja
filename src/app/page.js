import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Requirements from "@/components/Requirements";
import Positions from "@/components/Positions";
import Facilities from "@/components/Facilities";
import About from "@/components/About";
import Contact from "@/components/Contact";
import FloatingBadge from "@/components/FloatingBadge";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Requirements />
      <Positions />
      <Facilities />
      <About />
      <Contact />
      <FloatingBadge />
    </main>
  );
}