"use client";

import { ScrollReveal } from "../ui/ScrollReveal";
import { Badge } from "../ui/Badge";

export function RSVP() {
    return (
        <section className="px-4 py-20 md:py-32">
            <div className="mx-auto max-w-xl text-center">
                <ScrollReveal>
                    <Badge className="mb-6">RSVP</Badge>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <h2 className="mb-12 font-serif text-4xl md:text-5xl">Join us for the celebration</h2>
                </ScrollReveal>

                <form className="flex flex-col gap-6 text-left">
                    <ScrollReveal delay={0.2} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                                placeholder="Michael Scott"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                                placeholder="michael@dundermifflin.com"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="attendance" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                Are you attending?
                            </label>
                            <select
                                id="attendance"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                            >
                                <option>Yes, I will be there</option>
                                <option>Sorry, I can't make it</option>
                            </select>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.5} width="100%">
                        <button
                            type="submit"
                            className="mt-8 w-full rounded-full bg-primary py-4 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Confirm RSVP
                        </button>
                    </ScrollReveal>
                </form>
            </div>
        </section>
    );
}
