"use client";

import { useState, useEffect } from "react";

import { ScrollReveal } from "../ui/ScrollReveal";


export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Change style when scrolled past the viewport height (minus a small buffer)
            const heroHeight = window.innerHeight - 80;
            setIsScrolled(window.scrollY > heroHeight);
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once on mount
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 pt-[env(safe-area-inset-top)] ${isScrolled
                ? "bg-white backdrop-blur-sm text-primary shadow-sm"
                : "bg-transparent text-white"
                }`}
        >
            <div className="mx-auto flex w-full max-w-[1400px] items-center px-6 py-6 md:px-10">
                {/* Center: Logo */}
                <div className="flex w-full items-center justify-between">
                    <ScrollReveal>
                        <a href="/" className="text-sm font-medium tracking-tight text-inherit whitespace-nowrap">
                            철완&나라
                        </a>
                    </ScrollReveal>
                    <ScrollReveal delay={0.1}>
                        <div className="text-sm font-medium tracking-tight text-inherit whitespace-nowrap">
                            5월 2일 12:30 노블발렌티 대치
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </header>
    );
}
