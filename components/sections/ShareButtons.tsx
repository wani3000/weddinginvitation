"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { ScrollReveal } from "../ui/ScrollReveal";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.invite-chulwan-nara.com";
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "";

export function ShareButtons() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_APP_KEY) {
        window.Kakao.init(KAKAO_APP_KEY);
      }
    };

    if (window.Kakao) {
      initKakao();
    } else {
      const timer = setInterval(() => {
        if (window.Kakao) {
          initKakao();
          clearInterval(timer);
        }
      }, 500);
      return () => clearInterval(timer);
    }
  }, []);

  const shareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오 SDK가 초기화되지 않았습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "박철완 ♥ 서나라 결혼합니다",
        description: "26년 5월 2일 토요일 오후 12시 30분\n노블발렌티 대치",
        imageUrl: `${SITE_URL}/img/1200x630.png`,
        link: {
          mobileWebUrl: SITE_URL,
          webUrl: SITE_URL,
        },
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: {
            mobileWebUrl: SITE_URL,
            webUrl: SITE_URL,
          },
        },
      ],
    });
  };

  const shareGeneral = async () => {
    const shareData = {
      title: "박철완 ♥ 서나라 결혼합니다",
      text: "26년 5월 2일 토요일 오후 12시 30분\n노블발렌티 대치",
      url: SITE_URL,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유를 취소한 경우
      }
    } else {
      await navigator.clipboard.writeText(SITE_URL);
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    }
  };

  return (
    <section className="bg-white px-4 py-12">
      <ScrollReveal className="mx-auto flex max-w-md flex-col items-center gap-4">
        <p className="text-sm text-gray-500">공유하기</p>
        <div className="flex gap-4">
          <button
            onClick={shareKakao}
            className="flex items-center gap-2 rounded-full bg-[#FEE500] px-6 py-3 text-sm font-medium text-[#191919] transition-opacity hover:opacity-80"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M128 36C70.562 36 24 72.713 24 118.244c0 29.308 19.149 55.076 48.024 69.647l-10.27 37.994c-.907 3.358 2.903 6.07 5.834 4.153l44.36-30.072c5.253.744 10.633 1.134 16.052 1.134 57.438 0 104-36.713 104-82.856C232 72.713 185.438 36 128 36z"
                fill="#191919"
              />
            </svg>
            카카오톡 공유
          </button>

          <button
            onClick={shareGeneral}
            className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Share2 size={16} />
            공유하기
          </button>
        </div>
      </ScrollReveal>

      {toast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-6 py-3 text-sm text-white shadow-lg">
          링크가 복사되었습니다
        </div>
      )}
    </section>
  );
}
