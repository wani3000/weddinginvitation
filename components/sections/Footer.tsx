"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

export function Footer() {
    return (
        <footer className="bg-primary px-4 py-16 text-white md:py-24">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                <ScrollReveal className="flex-1">
                    <h3 className="font-serif text-2xl lowercase">chulwan & nara</h3>
                    <p className="mt-4 max-w-xs text-gray-400">
                        7번의 봄을 지나, 평생의 계절을 약속합니다
                    </p>
                </ScrollReveal>
                <ScrollReveal delay={0.2} className="text-sm text-gray-500">
                    © {new Date().getFullYear()} chulwan & nara.
                </ScrollReveal>
            </div>
        </footer>
    );
}
