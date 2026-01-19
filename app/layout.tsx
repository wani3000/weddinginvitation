import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "chulwan & nara - 우리의 결혼식",
  description: "본질에 집중하는 명확하고 강력한 임팩트의 미니멀 디자인 템플릿입니다.",
  themeColor: "#ffffff",
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
          "antialiased bg-white text-primary font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
