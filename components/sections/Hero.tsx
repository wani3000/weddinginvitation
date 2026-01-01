"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const heroImages = [
    {
        src: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1500&auto=format&fit=crop",
        alt: "실험적 디자인",
        slug: "experimental-design",
    },
    {
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500&auto=format&fit=crop",
        alt: "패션 포트레이트",
        slug: "fashion-portrait",
    },
    {
        src: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1500&auto=format&fit=crop",
        alt: "제품 디자인",
        slug: "product-design",
    },
];



export function Hero() {
    // ... (existing state and refs)
    const containerRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // ... (existing scroll logic)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} className="relative w-full pt-24 pb-20 md:min-h-[120vh] md:pt-48">
            <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
                {/* ... (Top Section remains unchanged) */}
                <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
                    <ScrollReveal width="100%">
                        <h1 className="font-serif text-[34px] font-medium leading-[1.33] tracking-tight text-primary md:text-[46px] lg:text-[58px]">
                            7번의 봄을 지나, <br />
                            평생의 계절을 <br />
                            약속합니다.
                        </h1>
                    </ScrollReveal>
                </div>

                {/* Carousel Section */}
                <div className="relative w-full">
                    {/* Mobile Controls */}
                    <div className="absolute top-1/2 z-10 -translate-y-1/2 left-4 md:hidden">
                        <button onClick={scrollLeft} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 z-10 -translate-y-1/2 right-4 md:hidden">
                        <button onClick={scrollRight} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95">
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    <motion.div
                        ref={scrollRef}
                        style={{ x: typeof window !== 'undefined' && window.innerWidth > 768 ? x : 0 }}
                        className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:gap-6 md:overflow-visible md:pb-0"
                    >
                        {heroImages.map((img, i) => (
                            <ScrollReveal key={i} delay={0.3 + (i * 0.1)} className="shrink-0 snap-center first:pl-0">
                                <Link href={`/works/${img.slug}`} className="block group relative aspect-[4/5] w-[85vw] overflow-hidden rounded-xl bg-gray-100 sm:w-[400px] md:rounded-sm cursor-pointer">
                                    <div className="absolute right-4 top-4 z-10 text-primary opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                                        <Plus className="h-6 w-6" />
                                    </div>
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 85vw, 400px"
                                        priority={i === 0}
                                    />
                                </Link>
                            </ScrollReveal>
                        ))}
                    </motion.div>
                </div>




            </div>
        </section>
    );
}
