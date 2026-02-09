"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function VideoHero() {
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    // 초기 뷰포트 높이를 저장하고 고정
    const initialHeight = window.innerHeight;
    setViewportHeight(initialHeight);

    // CSS 변수로도 설정 (추가 보험)
    document.documentElement.style.setProperty(
      "--initial-vh",
      `${initialHeight}px`,
    );
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
        <div className="relative h-[218px] w-[218px] md:h-[282px] md:w-[282px]">
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
