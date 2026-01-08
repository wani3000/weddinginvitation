"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Copy, ChevronDown } from "lucide-react";

// 신랑측 계좌 정보
const groomAccounts = [
    {
        name: "신랑",
        account: "585402 01 254486",
        bank: "국민은행",
        holder: "이상원"
    },
    {
        name: "신랑 아버지",
        account: "085 21 0539 170",
        bank: "국민은행",
        holder: "이상우"
    },
    {
        name: "신랑 어머니",
        account: "110 362 487586",
        bank: "신한은행",
        holder: "김미자"
    }
];

// 신부측 계좌 정보
const brideAccounts = [
    {
        name: "신부",
        account: "333310183642",
        bank: "카카오뱅크",
        holder: "김수연"
    },
    {
        name: "신부 아버지",
        account: "11026132669",
        bank: "신한은행",
        holder: "김승건"
    },
    {
        name: "신부 어머니",
        account: "861 21 0179 909",
        bank: "신한은행",
        holder: "이영희"
    }
];

export function Account() {
    const [groomDropdownOpen, setGroomDropdownOpen] = useState(false);
    const [brideDropdownOpen, setBrideDropdownOpen] = useState(false);
    const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

    const handleCopyAccount = async (account: string) => {
        try {
            // 계좌번호에서 공백 제거
            const cleanAccount = account.replace(/\s/g, '');
            await navigator.clipboard.writeText(cleanAccount);
            setCopiedAccount(account);
            setTimeout(() => setCopiedAccount(null), 2000);
        } catch (err) {
            console.error('계좌번호 복사에 실패했습니다:', err);
        }
    };

    const AccountDropdown = ({
        title,
        accounts,
        isOpen,
        setIsOpen
    }: {
        title: string;
        accounts: typeof groomAccounts;
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
    }) => (
        <div className="w-full bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 border-b border-gray-100 transition-colors hover:bg-gray-50/50"
            >
                <span className="text-xl md:text-2xl font-serif text-gray-900">{title}</span>
                <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="py-4 space-y-6">
                            {accounts.map((account, index) => (
                                <div key={index} className="px-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-medium uppercase tracking-widest text-gray-400">
                                            {account.name}
                                        </span>
                                        <button
                                            onClick={() => handleCopyAccount(account.account)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 group"
                                        >
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>{copiedAccount === account.account ? "완료" : "복사"}</span>
                                        </button>
                                    </div>
                                    <div className="space-y-1.5 pl-0.5">
                                        <div className="text-xl md:text-2xl font-mono tracking-tight text-gray-900">
                                            {account.account}
                                        </div>
                                        <div className="text-base text-gray-500 font-light italic">
                                            {account.bank} · {account.holder}
                                        </div>
                                    </div>
                                    {index !== accounts.length - 1 && (
                                        <div className="mt-6 border-t border-gray-50" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <section className="px-6 py-24 md:py-32 bg-white">
            <div className="mx-auto max-w-6xl">
                <ScrollReveal width="100%">
                    <div className="flex flex-col gap-10 mb-20">
                        {/* Title & Intro Group - Matching Details.tsx style */}
                        <div className="flex flex-col gap-6">
                            <h2 className="font-serif text-[34px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px] text-gray-900">
                                마음 전하실 곳
                            </h2>
                            <div className="flex flex-col gap-2">
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                                    멀리서도 축하의 마음을 전하고 싶으신 분들을 위해 계좌번호를 안내드립니다.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                                    소중한 축하를 보내주셔서 감사드리며, 따뜻한 마음에 깊이 감사드립니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                    <ScrollReveal delay={0.2} width="100%">
                        <div className="border-t border-gray-900/10">
                            <AccountDropdown
                                title="신랑측"
                                accounts={groomAccounts}
                                isOpen={groomDropdownOpen}
                                setIsOpen={setGroomDropdownOpen}
                            />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} width="100%">
                        <div className="border-t border-gray-900/10 md:border-t">
                            {/* On desktop, we want both to have a top border. 
                                On mobile, they are stacked so both should have top borders. */}
                            <AccountDropdown
                                title="신부측"
                                accounts={brideAccounts}
                                isOpen={brideDropdownOpen}
                                setIsOpen={setBrideDropdownOpen}
                            />
                        </div>
                    </ScrollReveal>
                    <div className="md:hidden border-t border-gray-900/10" />
                </div>
            </div>
        </section>
    );
}
