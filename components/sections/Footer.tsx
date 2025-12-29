"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

export function Footer() {
    return (
        <footer className="bg-primary px-4 py-16 text-white md:py-24">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                <ScrollReveal width="auto" className="flex-1">
                    <h3 className="font-serif text-2xl">Orchid.</h3>
                    <p className="mt-4 max-w-xs text-gray-400">
                        A minimalist template for clarity and impact.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={0.1} width="auto" className="flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:gap-8">
                    <a href="#" className="hover:text-white">About</a>
                    <a href="#" className="hover:text-white">Works</a>
                    <a href="#" className="hover:text-white">Services</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </ScrollReveal>

                <ScrollReveal delay={0.2} width="auto" className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Orchid Template.
                </ScrollReveal>
            </div>
        </footer>
    );
}
