"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface LightboxProps {
    images: { src: string; alt: string; aspect?: string }[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const thumbnailScrollRef = useRef<HTMLDivElement>(null);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // Update currentIndex when initialIndex changes (when opening lightbox)
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentIndex]); // Added currentIndex dependancy just in case, though functional updates handle it.

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        scrollToThumbnail((currentIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        scrollToThumbnail((currentIndex - 1 + images.length) % images.length);
    };

    const scrollToThumbnail = (index: number) => {
        if (thumbnailScrollRef.current) {
            const thumbnail = thumbnailScrollRef.current.children[index] as HTMLElement;
            if (thumbnail) {
                thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    };

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
    };

    // Drag down to close logic
    const onDragEnd = (_: unknown, info: PanInfo) => {
        if (info.offset.y > 100) {
            onClose();
        }
    };


    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    if (typeof window === 'undefined') return null;

    // Use specific ID or body for portal
    const portalRoot = document.body;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex flex-col bg-white"
            >
                {/* Header / Close Button */}
                <div className="absolute top-6 right-6 z-50 md:right-10">
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-black backdrop-blur-sm transition-colors hover:bg-black/10"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Main Image Area with Swipe */}
                <div className="relative flex-1 flex items-center justify-center p-4 md:p-10 overflow-hidden">
                    <div
                        className="relative h-full w-full max-h-[80vh] max-w-[1200px]"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.7}
                            onDragEnd={onDragEnd}
                            transition={{ duration: 0.3 }}
                            className="h-full w-full cursor-grab active:cursor-grabbing"
                        >
                            <Image
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                fill
                                className="object-contain"
                                priority
                                draggable={false}
                            />
                        </motion.div>
                    </div>

                    {/* Navigation Buttons (Desktop) */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg transition-transform hover:scale-110 active:scale-95 md:left-8 hidden md:block z-30"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg transition-transform hover:scale-110 active:scale-95 md:right-8 hidden md:block z-30"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Safe area for mobile taps to navigate */}
                    <div className="absolute inset-y-0 left-0 w-1/6 z-20 md:hidden" onClick={prevImage} />
                    <div className="absolute inset-y-0 right-0 w-1/6 z-20 md:hidden" onClick={nextImage} />
                </div>

                {/* Bottom Thumbnail Slider (iOS Style) */}
                <div className="absolute bottom-8 left-0 right-0 z-40 h-10 md:h-12">
                    <div
                        ref={thumbnailScrollRef}
                        className="mx-auto flex h-full w-full max-w-3xl items-center justify-center gap-1.5 overflow-x-auto px-4 scrollbar-hide"
                    >
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCurrentIndex(i);
                                    scrollToThumbnail(i);
                                }}
                                className={`relative h-full aspect-[2/3] md:aspect-square flex-shrink-0 overflow-hidden rounded-sm transition-all duration-300 ${i === currentIndex
                                    ? "scale-110 opacity-100"
                                    : "opacity-40 hover:opacity-100 scale-95"
                                    }`}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>,
        portalRoot
    );
}
