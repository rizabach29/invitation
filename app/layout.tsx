import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "./smoothscroll-provider";
import TranisitionPage from "./(components)/transition-page";

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
        className={`${geistSans.variable} ${geistMono.variable} no-scrollbar antialiased bg-amber-50`}
      >
        <TranisitionPage />
        <SmoothScrollProvider>
          <div className="min-h-screen relative">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
