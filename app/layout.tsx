import type { Metadata } from "next";
import { Courier_Prime, Special_Elite } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import PageWrapper from "./components/PageWrapper";
import { ThemeProvider } from "./components/ThemeProvider";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  variable: "--font-courier",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  weight: ["400"],
  variable: "--font-typewriter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepak",
  description: "Portfolio website for Deepak Kadian.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${courierPrime.variable} ${specialElite.variable} antialiased selection:bg-accent/30`}
      >
        <ThemeProvider>
          <Navigation />
          <PageWrapper>{children}</PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
