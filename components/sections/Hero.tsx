"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-16 md:pt-48 md:pb-32">
            {/* Main Content */}
            <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

                <ScrollReveal width="100%" className="flex justify-center">
                    <Badge className="mb-8">Orchid Template</Badge>
                </ScrollReveal>

                <ScrollReveal delay={0.1} width="100%">
                    <h1 className="mb-8 font-serif text-5xl font-medium leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
                        Creative agency <br /> focused on clarity
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2} width="100%" className="flex justify-center">
                    <p className="mb-10 max-w-xl text-lg text-gray-600 md:text-xl">
                        We build digital experiences that matter. Minimalist design for maximum impact.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3} width="100%" className="flex justify-center">
                    <button className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-white transition-transform hover:scale-105">
                        <span className="text-sm font-medium">Start Project</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </ScrollReveal>
            </div>

            {/* Hero Image */}
            <ScrollReveal delay={0.4} width="100%" className="mt-20 md:mt-32">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[800px] overflow-hidden md:aspect-[16/9]">
                    <Image
                        src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=2938&auto=format&fit=crop"
                        alt="Minimalist Architecture"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            </ScrollReveal>
        </section>
    );
}
