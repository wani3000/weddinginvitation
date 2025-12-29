"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

const navLinks = [
    { name: "Works", href: "#" },
    { name: "Journal", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
];

export function Header() {
    return (
        <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-sm transition-all duration-300">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
                <ScrollReveal width="auto">
                    <a href="/" className="text-xl font-bold tracking-tight text-primary">
                        orchid<span className="text-xs align-top">®</span>
                    </a>
                </ScrollReveal>

                <nav className="hidden md:block">
                    <ul className="flex gap-8">
                        {navLinks.map((link, i) => (
                            <ScrollReveal key={link.name} delay={i * 0.1} width="auto">
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-primary hover:text-gray-600"
                                >
                                    {link.name}
                                </a>
                            </ScrollReveal>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
