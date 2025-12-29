import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Details } from "@/components/sections/Details";
import { RSVP } from "@/components/sections/RSVP";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Intro />
      <Stats />
      <Gallery />
      <Details />
      <RSVP />
      <Footer />
    </main>
  );
}
