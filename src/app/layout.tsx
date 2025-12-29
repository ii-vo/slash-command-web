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
  metadataBase: new URL("https://slash-command.com"),
  title: {
    default: "Slash Command — Claude Code Plugin",
    template: "%s | Slash Command",
  },
  description:
    "A Claude Code plugin for structured development workflows — planning, implementation, and documentation.",
  keywords: [
    "Claude Code",
    "plugin",
    "workflow",
    "planning",
    "AI development",
    "developer tools",
  ],
  authors: [{ name: "ii-vo", url: "https://github.com/ii-vo" }],
  creator: "ii-vo",
  openGraph: {
    title: "Slash Command",
    description:
      "Claude Code plugin for structured development workflows",
    url: "https://slash-command.com",
    siteName: "Slash Command",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slash Command",
    description:
      "Claude Code plugin for structured development workflows",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
