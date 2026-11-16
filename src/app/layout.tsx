import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Ticker from "@/components/ticker";
import Footer from "@/components/footer";
import ToastProvider from "@/components/toast-provider";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার বাজারভিত্তিক আজকের দাম — প্রতিদিন সকালে আপডেট।",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Best-effort fetch for navbar links + ticker; the app still renders if the
  // upstream API is unreachable (mirrors are tried inside lib/api).
  let categories: Category[] = [];
  let products: Product[] = [];
  try {
    [categories, products] = await Promise.all([getCategories(), getProducts()]);
  } catch {
    // ignore — pages fetch their own data with loading/error states
  }

  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <header>
          <Navbar categories={categories} />
          <Ticker products={products} />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
