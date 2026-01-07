"use client";

import { ScrollReveal } from "../ui/ScrollReveal";

export function Footer() {
    return (
        <footer className="bg-primary px-4 py-16 text-white md:py-24">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
                <ScrollReveal className="flex-1">
                    <h3 className="font-serif text-base">철완&나라</h3>
                    <div className="mt-4 flex flex-col gap-1">
                        <p className="max-w-xs text-gray-400">
                            7번의 봄을 지나, 평생의 계절을 약속합니다
                        </p>
                        <p className="text-base text-gray-500">
                            5월 2일 12:30 노블발렌티 대치
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </footer>
    );
}
