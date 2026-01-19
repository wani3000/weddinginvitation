"use client";

import { useRef } from "react";
import Image from "next/image";
import { Copy } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

const venueDetails = [
    {
        title: "지하철",
        description: "2호선 삼성역 3번 출구 (도보 10분)\n삼성역 3번 출구 앞에서 셔틀버스가 수시로 운행됩니다."
    },
    {
        title: "자가용 / 주차",
        description: "내비게이션: '노블발렌티 대치점' 또는 'S타워' 검색\n주소: 서울 강남구 영동대로 325 S타워\n건물 내 하객 전용 주차장 이용 (무료 주차 지원)"
    },
    {
        title: "화환 안내",
        description: "예식장의 경건한 분위기를 위해 꽃 화환은 홀 내부 반입이 제한됩니다.\n보내주신 화환은 로비 입구(B1)에 일괄 배치해 드리고 있으니, 축하해 주시는 분들의 너른 양해를 부탁드립니다."
    },
    {
        title: "피로연 안내",
        description: "식사 시간: 12:00 ~ 14:00\n예식 30분 전부터 2시간 동안 넉넉하게 식사하실 수 있습니다."
    }
];

export function Details() {
    const address = "서울 강남구 영동대로 325";
    const toastRef = useRef<HTMLDivElement>(null);

    const showToast = () => {
        if (toastRef.current) {
            toastRef.current.style.opacity = "1";
            toastRef.current.style.transform = "translate(-50%, 0)";
            setTimeout(() => {
                if (toastRef.current) {
                    toastRef.current.style.opacity = "0";
                    toastRef.current.style.transform = "translate(-50%, 20px)";
                }
            }, 2000);
        }
    };

    const handleCopy = () => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(address).then(() => {
                showToast();
            }).catch(() => {
                copyFallback(address);
            });
        } else {
            copyFallback(address);
        }
    };

    const copyFallback = (text: string) => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:none;outline:none;box-shadow:none;background:transparent;opacity:0;z-index:-1;";
        textArea.setAttribute("readonly", "");
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        try {
            const success = document.execCommand('copy');
            if (success) showToast();
        } catch (err) {
            console.error('Fallback copy fail', err);
        }
        document.body.removeChild(textArea);
        window.scrollTo(scrollX, scrollY);
    };

    return (
        <section className="px-4 py-20 md:py-32">
            <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
                <ScrollReveal>
                    <div className="flex flex-col gap-10">
                        {/* Title & Intro */}
                        <div className="flex flex-col gap-6">
                            <h2 className="font-serif text-[34px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px]">
                                노블발렌티 대치
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                저희가 약속을 맺는 &apos;노블발렌티 대치&apos;는 단독홀로 운영되어, 복잡함 없이 오직 저희 하객분들만 여유롭게 모실 수 있는 공간입니다. 오셔서 맛있는 식사와 함께 자리를 빛내주시면 감사하겠습니다.
                            </p>
                        </div>

                        {/* Address & Copy + Subway */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-lg text-gray-600">
                                    {address}
                                </span>
                                <div
                                    onClick={handleCopy}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-full border border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100 cursor-pointer select-none"
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                    <span className="font-sans">복사</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative h-6 w-6">
                                    <Image src="/icon/number2.png" alt="2" fill className="object-contain" />
                                </div>
                                <span className="text-lg text-gray-600">삼성역에서 590m</span>
                            </div>
                        </div>

                        {/* Map Navigation Buttons */}
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-4 md:justify-start md:gap-x-8">
                            <a
                                href="https://map.kakao.com/link/search/노블발렌티 대치"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="relative h-6 w-6 overflow-hidden rounded-md">
                                    <Image src="/icon/kakaomap.png" alt="카카오" fill className="object-cover" />
                                </div>
                                <span className="w-[3.5rem] text-center text-lg text-gray-600">카카오</span>
                            </a>
                            <div className="h-4 w-[1px] bg-gray-200" />
                            <a
                                href="https://map.naver.com/v5/search/노블발렌티 대치"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="relative h-6 w-6 overflow-hidden rounded-md">
                                    <Image src="/icon/navermap.png" alt="네이버" fill className="object-cover" />
                                </div>
                                <span className="w-[3.5rem] text-center text-lg text-gray-600">네이버</span>
                            </a>
                            <div className="h-4 w-[1px] bg-gray-200" />
                            <a
                                href="tmap://route?goalname=노블발렌티 대치점&goalx=127.0633&goaly=37.5083"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="relative h-6 w-6 overflow-hidden rounded-md">
                                    <Image src="/icon/tmap.png" alt="티맵" fill className="object-cover" />
                                </div>
                                <span className="w-[3.5rem] text-center text-lg text-gray-600">티맵</span>
                            </a>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="flex flex-col gap-12">
                    {venueDetails.map((detail, i) => (
                        <ScrollReveal key={i} delay={i * 0.1} width="100%">
                            <div className="border-t border-gray-200 pt-8">
                                <h3 className="mb-4 text-2xl font-medium">{detail.title}</h3>
                                <p className="text-gray-600 whitespace-pre-line">{detail.description}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* 토스트 알림 */}
            <div 
                ref={toastRef}
                className="fixed bottom-6 left-1/2 z-50 transition-all duration-300 pointer-events-none"
                style={{ opacity: 0, transform: "translate(-50%, 20px)" }}
            >
                <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-sans text-sm whitespace-nowrap">
                    주소가 복사되었어요
                </div>
            </div>
        </section>
    );
}
