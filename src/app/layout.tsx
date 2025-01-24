import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import StyledComponentsRegistry from "./registry";
import {
  Header,
  ErrorBoundary,
  ErrorView,
  WebVitalsListener,
} from "./components";

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
          <WebVitalsListener />
          <StyledComponentsRegistry>
            <ErrorBoundary FallbackComponent={ErrorView}>
              <Header />
              <section id="content">{children}</section>
            </ErrorBoundary>
          </StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
