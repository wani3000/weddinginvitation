import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";

import { Gallery } from "@/components/sections/Gallery";
import { Details } from "@/components/sections/Details";
import { RSVP } from "@/components/sections/RSVP";
import { Footer } from "@/components/sections/Footer";

import { VideoHero } from "@/components/sections/VideoHero";

export default function Home() {
  return (
    <main className="relative min-h-screen text-primary">
      <Header />
      <VideoHero />

      <div className="relative z-10 bg-white">
        <Hero />
        <Intro />
        <Gallery />
        <Details />
        <RSVP />
        <Footer />
      </div>
    </main>
  );
}
