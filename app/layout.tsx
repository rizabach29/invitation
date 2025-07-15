import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Our day",
  description: "Today is our day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} no-scrollbar overflow-x-clip antialiased bg-amber-50`}
      >
        <main className="min-h-screen relative">
          <Suspense>{children}</Suspense>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
