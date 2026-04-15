import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Softex Celware Tech Blog",
    template: "%s | Softex Celware Tech Blog",
  },
  description:
    "Excel VBA・GAS・Next.jsの開発テクニックを実務経験から解説。コピペで使えるコード付き。",
  metadataBase: new URL("https://tech.softex-celware.com"),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Softex Celware Tech Blog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
