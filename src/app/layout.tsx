import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlexLab - Interactive CSS Flexbox Playground",
  description:
    "An interactive CSS Flexbox playground for developers. Experiment with all flexbox properties, see live previews, and generate production-ready CSS code instantly.",
  keywords: [
    "CSS",
    "Flexbox",
    "playground",
    "developer tool",
    "CSS generator",
    "flex layout",
    "web development",
  ],
  authors: [{ name: "FlexLab" }],
  openGraph: {
    title: "FlexLab - Interactive CSS Flexbox Playground",
    description:
      "Experiment with all CSS Flexbox properties, see live previews, and generate production-ready CSS code instantly.",
    type: "website",
    locale: "en_US",
    siteName: "FlexLab",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexLab - Interactive CSS Flexbox Playground",
    description:
      "Experiment with all CSS Flexbox properties, see live previews, and generate production-ready CSS code instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
