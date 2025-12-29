"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";

const projects = [
    {
        title: "Waterline Residence",
        category: "Architecture",
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1500&auto=format&fit=crop",
        aspect: "aspect-[3/4]",
    },
    {
        title: "Nordic Center",
        category: "Interior",
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1500&auto=format&fit=crop",
        aspect: "aspect-[4/3]",
    },
    {
        title: "Urban Loft",
        category: "Design",
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1500&auto=format&fit=crop",
        aspect: "aspect-[3/4]",
    },
    {
        title: "Glass House",
        category: "Concept",
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1500&auto=format&fit=crop",
        aspect: "aspect-[4/5]",
    },
];

export function Gallery() {
    return (
        <section className="px-4 py-20 md:py-32 bg-off-white">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal className="mb-16 text-center">
                    <h2 className="font-serif text-4xl md:text-5xl">Latest Works</h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} width="100%">
                            <div className="group cursor-pointer">
                                <div className={`relative w-full overflow-hidden bg-gray-200 ${project.aspect}`}>
                                    <Image
                                        src={project.src}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <h3 className="text-xl font-medium">{project.title}</h3>
                                    <span className="text-sm text-gray-500">{project.category}</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
