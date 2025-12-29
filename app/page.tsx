import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Details } from "@/components/sections/Details";
import { RSVP } from "@/components/sections/RSVP";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-white text-primary">
      <Header />
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
