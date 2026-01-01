"use client";

import Image from "next/image";

export function VideoHero() {
    return (
        <section className="sticky top-0 -z-10 h-[100dvh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/20 z-10" /> {/* Overlay for text readability */}

            {/* Video Placeholder */}
            <div className="relative h-full w-full">
                {/* Fallback Image */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1542352841-526487e4975f?q=80&w=1887&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white" />
        </section>
    );
}
