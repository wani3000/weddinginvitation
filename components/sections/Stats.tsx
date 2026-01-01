"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

const stats = [
    { value: "100%", label: "고객 만족도" },
    { value: "30+", label: "디자인 수상" },
    { value: "120", label: "완료된 프로젝트" },
];

export function Stats() {
    return (
        <section className="px-4 py-16 md:py-24">
            <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-3">
                {stats.map((stat, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="flex flex-col items-center text-center">
                            <span className="block font-serif text-5xl md:text-6xl lg:text-7xl">
                                {stat.value}
                            </span>
                            <span className="mt-4 block text-sm font-medium uppercase tracking-widest text-gray-500">
                                {stat.label}
                            </span>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
