import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "./smoothscroll-provider";
import Player from "./(components)/music";
import Footer from "./(components)/footer";
import Header from "./(components)/header";

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
        className={`${geistSans.variable} ${geistMono.variable} no-scrollbar antialiased`}
      >
        <SmoothScrollProvider>
          <div className="min-h-screen relative pt-24">
            <div className={` text-center w-full flex gap-2 justify-center`}>
              <p
                className={`font-medium text-stone-600 text-xl mix-blend-hard-light left-0`}
              >
                12
              </p>
              <p
                className={`font-medium text-stone-600 text-xl mix-blend-hard-light left-0`}
              >
                AUG
              </p>
              <p
                className={`font-medium text-stone-600 text-xl mix-blend-hard-light left-0`}
              >
                25
              </p>
            </div>
            <Header />
            {children}
            <Player url="https://cdn.pixabay.com/audio/2024/10/08/audio_095d37d4a6.mp3" />
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
