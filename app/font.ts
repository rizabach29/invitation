import { Source_Sans_3, Birthstone_Bounce, Pacifico } from "next/font/google";

export const heading = Pacifico({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

export const paragraph = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export const script = Birthstone_Bounce({
  weight: ["400", "500"],
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});
