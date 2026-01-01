"use client";

import { useState, useEffect } from "react";

import { ScrollReveal } from "../ui/ScrollReveal";

const navLinks = [
    { name: "프로젝트", href: "#" },
    { name: "저널", href: "#" },
    { name: "소개", href: "#" },
    { name: "문의", href: "#" },
];

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
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-sm text-primary shadow-sm"
                : "bg-transparent text-white"
                }`}
        >
            <div className="mx-auto flex w-full max-w-[1400px] items-center px-6 py-6 md:px-10">
                {/* Left: Navigation (flex-1 ensures it takes equal space) */}
                <div className="hidden flex-1 md:flex items-center">
                    <nav className="flex gap-8">
                        {navLinks.map((link, index) => (
                            <ScrollReveal key={link.name} delay={index * 0.1}>
                                <a
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors ${isScrolled
                                        ? "text-gray-600 hover:text-primary"
                                        : "text-white/80 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </a>
                            </ScrollReveal>
                        ))}
                    </nav>
                </div>

                {/* Center: Logo */}
                <div className="flex flex-1 justify-center">
                    <ScrollReveal>
                        <a href="/" className="text-xl font-bold tracking-tight text-inherit whitespace-nowrap">
                            chulwan & nara<span className="inline-block w-[1.5ch]" aria-hidden="true" />
                        </a>
                    </ScrollReveal>
                </div>

                {/* Right: CTA Button (flex-1 ensures it takes equal space) */}
                <div className="hidden flex-1 items-center justify-end md:flex">
                    <ScrollReveal delay={0.4}>
                        <a
                            href="#"
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${isScrolled
                                ? "bg-primary text-white hover:bg-primary/90"
                                : "bg-white text-primary hover:bg-white/90"
                                }`}
                        >
                            시작하기
                        </a>
                    </ScrollReveal>
                </div>
            </div>
        </header>
    );
}
