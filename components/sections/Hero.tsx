"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useRef, useState } from "react";
import { motion, PanInfo } from "framer-motion";

const heroImages = [
  {
    src: "/img/section1/1-1.jpg",
    alt: "Wedding Photo 1",
  },
  {
    src: "/img/section1/1-2.jpg",
    alt: "Wedding Photo 2",
  },
  {
    src: "/img/section1/1-3.jpg",
    alt: "Wedding Photo 3",
  },
  {
    src: "/img/section1/1-4.jpg",
    alt: "Wedding Photo 4",
  },
  {
    src: "/img/section1/1-5.jpg",
    alt: "Wedding Photo 5",
  },
  {
    src: "/img/section1/1-6.jpg",
    alt: "Wedding Photo 6",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = heroImages.length;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-24 pb-20 md:pt-48"
    >
      {/* 타이틀 영역 - 패딩 있음 */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-20 md:flex-row md:items-end">
          <ScrollReveal width="100%">
            <h1 className="font-serif text-[28px] font-medium leading-[1.33] tracking-tight text-primary md:text-[46px] lg:text-[58px]">
              7번의 봄을 지나, <br />
              평생의 계절을 <br />
              약속합니다.
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Carousel Section - 전체 너비 사용 (패딩 없음) */}
      <ScrollReveal width="100%">
        <div className="relative w-full overflow-hidden">
          {/* 캐러셀 - 모든 이미지 같은 크기, 슬라이드 방식 */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={{
              x: `calc(50% - 40% - ${currentIndex} * (80% + 10px))`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex cursor-grab active:cursor-grabbing"
            style={{ gap: "10px" }}
          >
            {heroImages.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="shrink-0 cursor-pointer"
                style={{ width: "80%" }}
              >
                <div
                  className="relative aspect-[2/3] overflow-hidden bg-gray-100"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover select-none"
                    sizes="80vw"
                    priority={i === 0}
                    draggable={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 인디케이터 바 및 숫자 */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {/* 인디케이터 바 */}
          <div className="flex items-center gap-1.5">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-gray-900"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* 구분선 */}
          <div className="h-4 w-px bg-gray-200" />

          {/* 숫자 표시 */}
          <div className="font-sans text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1">/</span>
            <span>{String(totalImages).padStart(2, "0")}</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
