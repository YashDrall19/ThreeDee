import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel-decorative",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yash Drall | Full Stack Developer & AI Engineer — The Hogwarts Chronicles",
  description:
    "An immersive 3D developer portfolio for Yash Drall, full stack engineer specializing in scalable web systems, enterprise CRMs, and AI-powered applications.",
  keywords: [
    "Yash Drall",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Django",
    "Three.js",
    "Portfolio",
    "Harry Potter Portfolio",
  ],
  authors: [{ name: "Yash Drall", url: "https://linkedin.com/in/yashdrall01" }],
  openGraph: {
    title: "Yash Drall — A Wizard Behind the Code",
    description: "Explore the 8 Harry Potter-inspired chapters of Yash Drall's engineering portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${inter.variable} font-sans bg-hogwarts-dark text-hogwarts-parchment antialiased selection:bg-hogwarts-gold selection:text-hogwarts-dark`}
      >
        {children}
      </body>
    </html>
  );
}
