"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function VideoHero() {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // 초기 뷰포트 높이를 저장하고 화면 크기에 따라 조정
    const setHeight = () => {
      const initialHeight = window.innerHeight;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;

      let adjustedHeight = initialHeight;
      if (isDesktop) {
        adjustedHeight = initialHeight * 0.7; // 데스크탑: 70vh
      } else if (isTablet) {
        adjustedHeight = initialHeight * 0.8; // 태블릿: 80vh
      }

      setViewportHeight(adjustedHeight);
      document.documentElement.style.setProperty(
        "--initial-vh",
        `${adjustedHeight}px`,
      );
    };

    // 초기 설정
    setHeight();

    // 리사이즈 및 오리엔테이션 변경 시 재계산
    window.addEventListener("resize", setHeight);
    window.addEventListener("orientationchange", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("orientationchange", setHeight);
    };
  }, []);

  return (
    <section
      className="sticky top-0 -z-10 w-full overflow-hidden bg-white"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : "100vh",
        minHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
        maxHeight: viewportHeight ? `${viewportHeight}px` : "100vh",
      }}
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1542352841-526487e4975f?q=80&w=1887&auto=format&fit=crop"
          className="h-full w-full object-cover"
        >
          <source src="/video/main.mp4" type="video/mp4" />
          <source src="/video/main.mov" type="video/quicktime" />
        </video>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <div className="relative h-[218px] w-[218px] md:h-[240px] md:w-[240px] lg:h-[280px] lg:w-[280px]">
          <Image
            src="/icon/hero.png"
            alt="Hero Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
