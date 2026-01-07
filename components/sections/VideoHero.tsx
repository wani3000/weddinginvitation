"use client";

import Image from "next/image";

export function VideoHero() {
    return (
        <section className="sticky top-0 -z-10 h-[100dvh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay for text readability */}

            {/* Video Background */}
            <div className="relative h-full w-full">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1542352841-526487e4975f?q=80&w=1887&auto=format&fit=crop"
                    className="h-full w-full object-cover"
                >
                    <source src="/video/main.mp4" type="video/mp4" />
                    <source src="/video/main.mov" type="video/quicktime" />
                </video>

                {/* Fallback Overlay or Background in case video fails */}
                <div className="absolute inset-0 -z-10 bg-black/20" />
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
                <div className="relative h-[218px] w-[218px] md:h-[282px] md:w-[282px]">
                    <Image
                        src="/icon/hero.png"
                        alt="Hero Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
