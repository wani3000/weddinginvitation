"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Lightbox } from "../ui/Lightbox";

const projects = [
    {
        title: "워터라인 레지던스",
        category: "건축",
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1500&auto=format&fit=crop",
        alt: "워터라인 레지던스",
        aspect: "aspect-[3/4]",
    },
    {
        title: "노르딕 센터",
        category: "인테리어",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1500&auto=format&fit=crop",
        alt: "노르딕 센터",
        aspect: "aspect-[4/3]",
    },
    {
        title: "어반 로프트",
        category: "디자인",
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1500&auto=format&fit=crop",
        alt: "어반 로프트",
        aspect: "aspect-[3/4]",
    },
    {
        title: "글래스 하우스",
        category: "컨셉",
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&auto=format&fit=crop",
        alt: "글래스 하우스",
        aspect: "aspect-[4/5]",
    },
    {
        title: "미니멀 스튜디오",
        category: "인테리어",
        src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1500&auto=format&fit=crop",
        alt: "미니멀 스튜디오",
        aspect: "aspect-square",
    },
    {
        title: "콘크리트 빌라",
        category: "건축",
        src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1500&auto=format&fit=crop",
        alt: "콘크리트 빌라",
        aspect: "aspect-video",
    },
];

export function Gallery() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section className="px-4 py-20 md:py-32 bg-off-white">
            <div className="mx-auto max-w-6xl">
                {/* Grid Layout with Aligned Tops */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
                    {projects.map((project, i) => (
                        <div key={i}>
                            <ScrollReveal delay={i * 0.1} width="100%">
                                <div
                                    className="group cursor-pointer"
                                    onClick={() => openLightbox(i)}
                                >
                                    <div className={`relative w-full overflow-hidden bg-gray-200 ${project.aspect || 'aspect-square'}`}>
                                        <Image
                                            src={project.src}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </div>

            <Lightbox
                images={projects}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </section>
    );
}
