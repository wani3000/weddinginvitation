"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const handleGalleryClick = (e: React.MouseEvent) => {
    // 현재 스크롤 위치 저장
    sessionStorage.setItem("mainScrollPosition", window.scrollY.toString());
  };

  return (
    <section id="gallery" className="px-4 pt-12 pb-20 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <ScrollReveal width="100%">
          <Link
            href="/gallery"
            className="block mb-[38px] md:mb-[70px]"
            onClick={handleGalleryClick}
          >
            <div className="flex items-center justify-between cursor-pointer group">
              <h2 className="font-serif text-[28px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px] transition-colors group-hover:text-gray-700">
                갤러리
              </h2>
              <svg
                className="w-5 h-5 md:w-7 md:h-7 text-gray-400 transition-colors group-hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </ScrollReveal>

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
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover select-none"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      draggable={false}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* 전체보기 버튼 */}
        <div className="mt-8 flex justify-center">
          <Link href="/gallery" onClick={handleGalleryClick}>
            <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              전체보기
            </button>
          </Link>
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
