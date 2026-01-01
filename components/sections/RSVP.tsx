"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

export function RSVP() {
    return (
        <section className="px-4 py-20 md:py-32">
            <div className="mx-auto max-w-xl text-center">
                <ScrollReveal delay={0.1}>
                    <h2 className="mb-12 font-serif text-[34px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px]">함께 축하해 주세요</h2>
                </ScrollReveal>

                <form className="flex flex-col gap-6 text-left">
                    <ScrollReveal delay={0.2} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                성함
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                                placeholder="홍길동"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                이메일 주소
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                                placeholder="example@email.com"
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4} width="100%">
                        <div className="space-y-2">
                            <label htmlFor="attendance" className="text-sm font-medium uppercase tracking-wide text-gray-500">
                                참석 여부
                            </label>
                            <select
                                id="attendance"
                                className="w-full border-b border-gray-200 bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                            >
                                <option>네, 참석합니다</option>
                                <option>아쉽지만 참석이 어렵습니다</option>
                            </select>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.5} width="100%">
                        <button
                            type="submit"
                            className="mt-8 w-full rounded-full bg-primary py-4 text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            참석 여부 전달하기
                        </button>
                    </ScrollReveal>
                </form>
            </div>
        </section>
    );
}
