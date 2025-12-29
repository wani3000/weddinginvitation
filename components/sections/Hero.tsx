"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const heroImages = [
    {
        src: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1500&auto=format&fit=crop", // Flask/Science
        alt: "Experimental Design",
    },
    {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500&auto=format&fit=crop", // Portrait
        alt: "Fashion Portrait",
    },
    {
        src: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1500&auto=format&fit=crop", // Bottle/Product
        alt: "Product Design",
    },
    {
        src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1500&auto=format&fit=crop", // Texture
        alt: "Texture",
    },
    {
        src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1500&auto=format&fit=crop", // Abstract
        alt: "Abstract Art",
    },
];

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] w-full pt-32 pb-20 md:pt-48">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">

                {/* Top Section: Heading + Link */}
                <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <ScrollReveal width="100%">
                        <h1 className="max-w-4xl font-sans text-6xl font-semibold leading-[0.95] tracking-tight text-primary md:text-8xl lg:text-9xl">
                            Creative agency <br />
                            focused on clarity
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} width="auto" className="md:mb-4">
                        <a
                            href="#contact"
                            className="group flex items-center gap-2 text-xl font-medium text-primary transition-colors hover:opacity-70"
                        >
                            Start project
                            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </a>
                    </ScrollReveal>
                </div>

                {/* Carousel Section */}
                <div className="relative -mr-[50vw] w-[150vw] md:-mr-0 md:w-full">
                    <motion.div style={{ x }} className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide md:overflow-visible md:pb-0">
                        {heroImages.map((img, i) => (
                            <ScrollReveal key={i} delay={0.3 + (i * 0.1)} className="shrink-0 first:pl-0">
                                <div className="group relative aspect-[3/4] w-[80vw] overflow-hidden rounded-sm bg-gray-100 sm:w-[400px]">
                                    <div className="absolute right-4 top-4 z-10 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Plus className="h-6 w-6" />
                                    </div>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 768px) 80vw, 400px"
                                        priority={i < 2}
                                    />
                                </div>
                            </ScrollReveal>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
