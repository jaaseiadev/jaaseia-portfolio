import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/app/components/motion-provider";
import { PageTransition } from "@/app/components/page-transition";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { portfolio } from "@/app/data/portfolio";
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
  title: `${portfolio.name} — Frontend Developer & Designer`,
  description: portfolio.metaDescription,
};

const themeScript = `
  try {
    const storedTheme = localStorage.getItem("portfolio-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", storedTheme === "dark" || (!storedTheme && systemDark));
  } catch (_) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
            <SiteHeader />
            <PageTransition>{children}</PageTransition>
            <SiteFooter />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
