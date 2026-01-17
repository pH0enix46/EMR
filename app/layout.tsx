// // //
import type { Metadata } from "next";
import { Josefin_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Master of Design",
  description: "Master of Design",
  icons: {
    icon: "/design.png",
  },
};

import { ThemeProvider } from "@/app/_context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefin.variable} ${vibes.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
