"use client";

import { useState } from "react";
import { ScrollReveal } from "../ui/ScrollReveal";

const accountInfo = [
    {
        name: "신랑 김철완",
        bank: "국민은행",
        account: "123456-78-901234",
        holder: "김철완"
    },
    {
        name: "신부 이나라",
        bank: "신한은행", 
        account: "987654-32-109876",
        holder: "이나라"
    }
];

export function Account() {
    const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

    const handleCopyAccount = async (account: string) => {
        try {
            await navigator.clipboard.writeText(account);
            setCopiedAccount(account);
            setTimeout(() => setCopiedAccount(null), 2000);
        } catch (err) {
            console.error('계좌번호 복사에 실패했습니다:', err);
        }
    };

    return (
        <section className="px-4 py-20 bg-gray-50 md:py-32">
            <div className="mx-auto max-w-4xl text-center">
                <ScrollReveal>
                    <h2 className="font-serif text-[28px] font-medium leading-tight tracking-tight md:text-[36px] lg:text-[42px]">
                        마음 전하실 곳
                    </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={0.1} className="mt-6">
                    <p className="text-lg text-gray-600">
                        참석이 어려우신 분들을 위해 계좌번호를 안내드립니다.
                    </p>
                </ScrollReveal>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {accountInfo.map((info, index) => (
                        <ScrollReveal key={info.name} delay={0.2 + index * 0.1}>
                            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-medium text-gray-900 mb-6">
                                    {info.name}
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">은행</span>
                                        <span className="font-medium">{info.bank}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">예금주</span>
                                        <span className="font-medium">{info.holder}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className="text-gray-600">계좌번호</span>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-lg font-medium">
                                                {info.account}
                                            </span>
                                            <button
                                                onClick={() => handleCopyAccount(info.account)}
                                                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                                                    copiedAccount === info.account
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            >
                                                {copiedAccount === info.account ? "복사완료" : "복사"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.5} className="mt-8">
                    <p className="text-sm text-gray-500">
                        축하의 마음만으로도 충분합니다. 💝
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
