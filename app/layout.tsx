import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.invite-chulwan-nara.com";
const OG_IMAGE = `${SITE_URL}/img/1200x630.png`;

export const metadata: Metadata = {
  title: "박철완 ♥ 서나라 결혼합니다",
  description: "26년 5월 2일 토요일 오후 12시 30분\n노블발렌티 대치",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "박철완 ♥ 서나라 결혼합니다",
    description: "26년 5월 2일 토요일 오후 12시 30분\n노블발렌티 대치",
    url: SITE_URL,
    siteName: "박철완 ♥ 서나라 결혼합니다",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "박철완 ♥ 서나라 결혼합니다",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "박철완 ♥ 서나라 결혼합니다",
    description: "26년 5월 2일 토요일 오후 12시 30분\n노블발렌티 대치",
    images: [OG_IMAGE],
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          inter.className,
          "antialiased bg-white text-primary font-sans",
        )}
      >
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2vDnuj0NRGqo0PEWMkT4HO/lbY5cCHDfKNZfWejpCgHUc"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
