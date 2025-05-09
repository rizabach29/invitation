import { Petrona, Source_Sans_3 } from "next/font/google";

export const heading = Petrona({
  weight: ["400", "700"],
  variable: "--font-heading",
  subsets: ["latin"],
});

export const paragraph = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});
