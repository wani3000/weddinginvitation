"use client";

import { useState, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ui/ScrollReveal";
import { Copy, ChevronDown } from "lucide-react";

// 계좌 타입 정의
type AccountInfo = {
  name: string;
  account: string;
  bank: string;
  holder: string;
};

// 신랑측 계좌 정보
const groomAccounts: AccountInfo[] = [
  {
    name: "신랑",
    account: "123456789",
    bank: "국민은행",
    holder: "박철완",
  },
  {
    name: "신랑 아버지",
    account: "987654321",
    bank: "국민은행",
    holder: "박동준",
  },
  {
    name: "신랑 어머니",
    account: "555666777",
    bank: "신한은행",
    holder: "조정순",
  },
];

// 신부측 계좌 정보
const brideAccounts: AccountInfo[] = [
  {
    name: "신부",
    account: "111222333",
    bank: "카카오뱅크",
    holder: "서나라",
  },
  {
    name: "신부 아버지",
    account: "444555666",
    bank: "신한은행",
    holder: "서형교",
  },
  {
    name: "신부 어머니",
    account: "777888999",
    bank: "신한은행",
    holder: "이스잔",
  },
];

// 복사 함수 (컴포넌트 외부)
const copyToClipboard = async (text: string, onSuccess: () => void) => {
  const cleanText = text.replace(/\s/g, "");

  // 현재 스크롤 위치 저장
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(cleanText);
      onSuccess();
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = cleanText;
      // 화면 밖으로 완전히 숨기고 스크롤 영향 방지
      textArea.style.cssText =
        "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:none;outline:none;box-shadow:none;background:transparent;opacity:0;z-index:-1;";
      textArea.setAttribute("readonly", ""); // 키보드 팝업 방지 (모바일)
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);

      // 스크롤 위치 복원
      window.scrollTo(scrollX, scrollY);

      if (success) onSuccess();
    }
  } catch (err) {
    console.error("복사 실패:", err);
    // 에러 발생 시에도 스크롤 위치 복원
    window.scrollTo(scrollX, scrollY);
  }
};

// AccountDropdown을 memo로 감싸서 불필요한 리렌더링 방지
const AccountDropdown = memo(function AccountDropdown({
  title,
  accounts,
  isOpen,
  onToggle,
  onCopy,
  hideBorderBottom = false,
}: {
  title: string;
  accounts: AccountInfo[];
  isOpen: boolean;
  onToggle: () => void;
  onCopy: (account: string, holder: string) => void;
  hideBorderBottom?: boolean;
}) {
  return (
    <div className="w-full bg-white">
      <div
        onClick={onToggle}
        className={`w-full flex items-center justify-between py-6 transition-colors hover:bg-gray-50/50 cursor-pointer ${hideBorderBottom ? "" : "border-b border-gray-100"}`}
      >
        <span className="text-xl md:text-2xl font-sans text-gray-900">
          {title}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      <AnimatePresence initial={false}>
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
                <div key={account.account} className="px-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-sans font-semibold uppercase tracking-widest text-gray-900">
                      {account.name}
                    </span>
                    <div
                      onPointerDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopy(account.account, account.holder);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer select-none"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans">복사</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 pl-0.5">
                    <div className="text-xl md:text-2xl font-sans tracking-tight text-gray-900">
                      {account.account}
                    </div>
                    <div className="text-base text-gray-900 font-sans font-light">
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
});

export function Account() {
  const [groomDropdownOpen, setGroomDropdownOpen] = useState(false);
  const [brideDropdownOpen, setBrideDropdownOpen] = useState(false);
  const toastRef = useRef<HTMLDivElement>(null);
  const toastTextRef = useRef<HTMLSpanElement>(null);

  // useCallback으로 함수 메모이제이션 - 리렌더링 시 새 함수 생성 방지
  const handleCopy = useCallback((account: string, holder: string) => {
    copyToClipboard(account, () => {
      // DOM 직접 조작으로 토스트 표시 (React 상태 변경 없음 = 리렌더링 없음)
      if (toastRef.current && toastTextRef.current) {
        toastTextRef.current.textContent = `${holder} 님의 계좌번호가 복사되었어요`;
        toastRef.current.style.opacity = "1";
        toastRef.current.style.transform = "translate(-50%, 0)";
        setTimeout(() => {
          if (toastRef.current) {
            toastRef.current.style.opacity = "0";
            toastRef.current.style.transform = "translate(-50%, 20px)";
          }
        }, 2000);
      }
    });
  }, []);

  const toggleGroom = useCallback(() => {
    setGroomDropdownOpen((prev) => !prev);
  }, []);

  const toggleBride = useCallback(() => {
    setBrideDropdownOpen((prev) => !prev);
  }, []);

  return (
    <section className="px-6 py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal width="100%">
          <div className="flex flex-col gap-10 mb-20">
            {/* Title & Intro Group - Matching Details.tsx style */}
            <div className="flex flex-col gap-6">
              <h2 className="font-sans text-[28px] font-medium leading-[1.33] tracking-tight md:text-[46px] lg:text-[58px] text-gray-900">
                마음 전하실 곳
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-2xl">
                  멀리서도 축하의 마음을 전하고 싶으신 분들을 위해 계좌번호를
                  안내드립니다.
                </p>
                <p className="text-lg text-gray-600 font-sans leading-relaxed max-w-2xl">
                  소중한 축하를 보내주셔서 감사드리며, 따뜻한 마음에 깊이
                  감사드립니다.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-0">
          <ScrollReveal delay={0.2} width="100%">
            <div className="border-t border-gray-900/10">
              <AccountDropdown
                title="신랑측"
                accounts={groomAccounts}
                isOpen={groomDropdownOpen}
                onToggle={toggleGroom}
                onCopy={handleCopy}
                hideBorderBottom={true}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} width="100%">
            <div className="border-t border-gray-900/10">
              <AccountDropdown
                title="신부측"
                accounts={brideAccounts}
                isOpen={brideDropdownOpen}
                onToggle={toggleBride}
                onCopy={handleCopy}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* 토스트 알림 - 항상 렌더링, CSS로 표시/숨김 (리렌더링 방지) */}
      <div
        ref={toastRef}
        className="fixed bottom-28 left-1/2 z-[9999] transition-all duration-300 pointer-events-none"
        style={{ opacity: 0, transform: "translate(-50%, 20px)" }}
      >
        <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg font-sans text-sm whitespace-nowrap">
          <span ref={toastTextRef}>계좌번호가 복사되었어요</span>
        </div>
      </div>
    </section>
  );
}
