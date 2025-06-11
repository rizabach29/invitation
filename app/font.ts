import { Birthstone_Bounce, Pacifico, DM_Serif_Text } from "next/font/google";

export const heading = Pacifico({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

export const paragraph = DM_Serif_Text({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-paragraph",
  display: "swap",
});

export const script = Birthstone_Bounce({
  weight: ["400", "500"],
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});
