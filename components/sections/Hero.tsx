"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useState, useEffect } from "react";
import { motion, type PanHandler } from "framer-motion";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const totalImages = heroImages.length;

  // 데스크탑/태블릿 여부 체크
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleDragEnd: PanHandler = (_, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  return (
    <section className="relative w-full pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* 타이틀 영역 */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:mb-16 lg:mb-20 md:flex-row md:items-end">
          <ScrollReveal width="100%">
            <h1 className="font-serif text-[28px] font-medium leading-[1.33] tracking-tight text-primary md:text-[42px] lg:text-[52px]">
              7번의 봄을 지나, <br />
              평생의 계절을 <br />
              약속합니다.
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Carousel Section */}
      <ScrollReveal width="100%">
        <div className="relative w-full overflow-hidden">
          {isDesktop ? (
            /* 데스크탑/태블릿: 무한 자동 슬라이드 - 화면 전체 사용 */
            <div className="relative w-full overflow-hidden">
              <motion.div
                animate={{
                  x: [0, `-${100 * totalImages}%`],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: totalImages * 18, // 각 이미지당 18초로 더 천천히
                    ease: "linear",
                  },
                }}
                className="flex gap-4 lg:gap-6"
              >
                {/* 원본 이미지들 */}
                {heroImages.map((img, i) => (
                  <div
                    key={`original-${i}`}
                    className="w-[400px] md:w-[450px] lg:w-[500px] shrink-0"
                  >
                    <div
                      className="relative aspect-[2/3] overflow-hidden bg-gray-100 rounded-lg"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover select-none"
                        sizes="500px"
                        priority={i === 0}
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
                {/* 무한 루프를 위한 복제 이미지들 */}
                {heroImages.map((img, i) => (
                  <div
                    key={`clone-${i}`}
                    className="w-[400px] md:w-[450px] lg:w-[500px] shrink-0"
                  >
                    <div
                      className="relative aspect-[2/3] overflow-hidden bg-gray-100 rounded-lg"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover select-none"
                        sizes="500px"
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            /* 모바일: 기존 스와이프 방식 */
            <div className="mx-auto w-full">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `calc(50% - 40% - ${currentIndex} * (80% + 10px))`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex cursor-grab active:cursor-grabbing"
                style={{ gap: "10px" }}
              >
                {heroImages.map((img, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="w-[80%] shrink-0 cursor-pointer"
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
          )}
        </div>

        {/* 인디케이터 바 및 숫자 - 모바일에서만 표시 */}
        {!isDesktop && (
          <div className="mt-6 flex items-center justify-center gap-4">
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

            <div className="h-4 w-px bg-gray-200" />

            <div className="font-sans text-sm text-gray-600">
              <span className="font-medium text-gray-900">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              <span>{String(totalImages).padStart(2, "0")}</span>
            </div>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
