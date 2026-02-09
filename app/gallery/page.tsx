"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { allGalleryImages } from "@/lib/constants/gallery";

const SCROLL_RESTORE_DELAY = 100;

export default function GalleryPage() {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleBack = () => {
    router.push("/#gallery");
    setTimeout(() => {
      const savedPosition = sessionStorage.getItem("mainScrollPosition");
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: "instant",
        });
      }
    }, SCROLL_RESTORE_DELAY);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Grid */}
      <main className="px-4 pt-8 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] items-start">
            {allGalleryImages.map((image, i) => (
              <div key={i}>
                <div
                  className="group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <div
                    className={`relative w-full overflow-hidden bg-gray-200 ${image.aspect || "aspect-[2/3]"}`}
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      loading="lazy"
                      className="object-cover select-none transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Lightbox
        images={allGalleryImages}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Floating Back Button */}
      <div className="fixed bottom-[50px] left-0 right-0 z-50">
        <div className="mx-auto flex max-w-lg items-center justify-center px-[26px]">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
