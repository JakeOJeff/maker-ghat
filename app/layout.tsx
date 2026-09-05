import type { Metadata } from "next";
import { Outfit, Parkinsans } from "next/font/google";

import "./styles/tokens.css";
import "./styles/base.css";

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Story | MakerGhat",
  description:
    "The story that built MakerGhat - our mission to make hands-on, maker-centered learning accessible across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${parkinsans.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
