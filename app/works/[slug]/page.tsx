"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

// Mock Data
// Mock Data
const works = {
    "experimental-design": {
        title: "실험적 디자인",
        category: "아트 디렉션",
        client: "개인 프로젝트",
        year: "2024",
        description: "디지털 매체를 통한 형태와 기능의 탐색입니다. 이 프로젝트는 유기적인 형상과 견고한 구조적 요소를 결합하여 전통적인 디자인 패러다임에 도전합니다. 자연과 기술 모두를 대변하는 비주얼 언어를 창조하는 것이 목표였습니다.",
        mainImage: "https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    "fashion-portrait": {
        title: "패션 포트레이트",
        category: "사진",
        client: "보그",
        year: "2023",
        description: "현대 패션의 본질을 담아낸 에디토리얼 포트레이트 시리즈입니다. 의상의 디테일을 살리면서 피사체와의 강렬한 감정적 연결을 유지하기 위해 조명과 질감에 집중했습니다.",
        mainImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
        ]
    },
    "product-design": {
        title: "제품 디자인",
        category: "산업 디자인",
        client: "테크 코프",
        year: "2024",
        description: "새로운 스마트 홈 기기 라인을 위한 미니멀한 제품 디자인입니다. 직관적인 사용성과 현대적인 홈 인테리어에 자연스럽게 녹아드는 디자인에 중점을 두었습니다. 지속 가능한 소재와 효율적인 제조 공정을 활용했습니다.",
        mainImage: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507764923583-b5a03673a381?q=80&w=2000&auto=format&fit=crop"
        ]
    }
};

export default function WorkDetail({ params }: { params: { slug: string } }) {
    const work = works[params.slug as keyof typeof works];

    if (!work) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white text-primary">
            <Header />

            <article className="pt-32 pb-20 md:pt-48">
                <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
                    {/* Header Section */}
                    <div className="mb-12 md:mb-20">
                        <ScrollReveal>
                            <h1 className="mb-12 text-5xl font-semibold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl">
                                {work.title}
                            </h1>
                        </ScrollReveal>

                        <div className="grid grid-cols-2 gap-8 gap-y-12 border-t border-gray-200 pt-8 md:grid-cols-4 md:gap-12">
                            <ScrollReveal delay={0.1}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">클라이언트</span>
                                    <span className="text-lg font-medium">{work.client}</span>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.2}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">서비스</span>
                                    <span className="text-lg font-medium">{work.category}</span>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.3}>
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">연도</span>
                                    <span className="text-lg font-medium">{work.year}</span>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.4}>
                                <div className="flex flex-col gap-2 items-start md:items-end">
                                    <a href="#" className="flex items-center gap-2 text-lg font-medium transition-opacity hover:opacity-70">
                                        웹사이트 방문하기 <ArrowUpRight className="h-5 w-5" />
                                    </a>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Main Image */}
                    <ScrollReveal delay={0.2} width="100%">
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-3xl">
                            <Image
                                src={work.mainImage}
                                alt={work.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </ScrollReveal>

                    {/* Description */}
                    <div className="my-20 md:my-32">
                        <ScrollReveal>
                            <p className="max-w-4xl text-2xl font-medium leading-relaxed md:text-4xl">
                                {work.description}
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                        {work.gallery.map((img, index) => (
                            <ScrollReveal key={index} delay={index * 0.1} width="100%" className={index === 2 ? "md:col-span-2" : ""}>
                                <div className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl ${index === 2 ? "aspect-video" : "aspect-[4/5]"}`}>
                                    <Image
                                        src={img}
                                        alt={`${work.title} gallery ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                </div>
            </article>

            <Footer />
        </main>
    );
}
