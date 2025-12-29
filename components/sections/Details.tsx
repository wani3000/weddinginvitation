"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

const services = [
    {
        title: "Strategy",
        description: "Brand positioning, market research, and content strategy to build a solid foundation."
    },
    {
        title: "Design",
        description: "Visual identity, UI/UX design, and interactions that delight and engage users."
    },
    {
        title: "Development",
        description: "Robust frontend and backend solutions using modern frameworks aligned with your goals."
    }
];

export function Details() {
    return (
        <section className="px-4 py-20 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
                <ScrollReveal>
                    <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                        A comprehensive approach to digital building.
                    </h2>
                </ScrollReveal>

                <div className="flex flex-col gap-12">
                    {services.map((service, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} className="group">
                            <div className="border-t border-gray-200 pt-8 transition-colors group-hover:border-black">
                                <h3 className="mb-4 text-2xl font-medium">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
