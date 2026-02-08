import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ImageProtection } from "@/components/ImageProtection";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={clsx(
          inter.className,
          "antialiased bg-white text-primary font-sans",
        )}
      >
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}
