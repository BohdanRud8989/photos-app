import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header, ErrorBoundary, ErrorView } from "./components";

import "./globals.scss";

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
  title: "Masonry Grid app",
  description: "Masonry Grid pet project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main>
          <ErrorBoundary FallbackComponent={ErrorView}>
            <Header />
            <section id="content">{children}</section>
          </ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
