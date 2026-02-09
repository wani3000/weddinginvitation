"use client";

import Image from "next/image";
import { ScrollReveal } from "../ui/ScrollReveal";

export function Intro() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-end md:gap-24">
        {/* Left Content */}
        <div className="flex-1">
          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-[28px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px]">
              26년 5월 2일 토요일 <br />
              오후 12시 30분, <br />
              <br />
              서로의 풍경이 <br />
              되어주던 우리가 <br />
              이제 부부가 됩니다.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mt-8">
            <p className="max-w-md text-lg text-gray-600 whitespace-pre-line">
              7년이라는 긴 시간 동안 서로의 곁을 지키며 같은 곳을
              바라보았습니다.{"\n\n"}
              이성적인 듬직함과 감성적인 따뜻함으로 서로의 부족한 점을 채워주며
              닮아간 저희 두 사람,{"\n\n"}
              싱그러운 5월의 햇살 아래 사랑의 결실을 맺으려 합니다. 저희의
              새로운 시작을 함께 축복해 주시면 감사하겠습니다.
            </p>
          </ScrollReveal>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <ScrollReveal delay={0.3} width="100%">
            <div
              className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100"
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src="/img/section2/2-1.jpg"
                alt="Wedding Photo"
                fill
                className="object-cover select-none"
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
