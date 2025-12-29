"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

export function Intro() {
    return (
        <section className="px-4 py-20 md:py-32">
            <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-end md:gap-24">

                {/* Left Content */}
                <div className="flex-1">
                    <ScrollReveal>
                        <Badge className="mb-6">Who we are</Badge>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h2 className="font-serif text-4xl font-medium leading-[1.2] tracking-tight md:text-5xl lg:text-6xl">
                            We help brands stand out through powerful, elegant visual storytelling.
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} className="mt-8">
                        <p className="max-w-md text-lg text-gray-600">
                            Our approach is simple: cut through the noise. We believe in the power of whitespace, typography, and purposeful motion to create lasting impressions.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Right Image */}
                <div className="flex-1">
                    <ScrollReveal delay={0.3} width="100%">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                            <Image
                                src="https://images.unsplash.com/photo-1506057527569-3aab4a686728?q=80&w=2940&auto=format&fit=crop"
                                alt="Minimalist plant"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
