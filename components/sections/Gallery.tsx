"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Lightbox } from "../ui/Lightbox";

// 전체 24장의 갤러리 이미지
const allGalleryImages = Array.from({ length: 24 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  const ext = i === 7 || i === 10 ? "png" : "jpg"; // gallery_08.png, gallery_11.png
  return {
    title: `Wedding Gallery ${num}`,
    category: "Wedding",
    src: `/img/gallery/gallery_${num}.${ext}`,
    alt: `Wedding Photo ${num}`,
    aspect: "aspect-[2/3]",
  };
});

// 메인에 표시할 6장 (처음 6장)
const projects = allGalleryImages.slice(0, 6);

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] items-start">
          {projects.map((project, i) => (
            <div key={i}>
              <ScrollReveal delay={i * 0.1} width="100%">
                <div
                  className="group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div
                    className={`relative w-full overflow-hidden bg-gray-200 ${project.aspect || "aspect-[2/3]"}`}
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        images={allGalleryImages}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
