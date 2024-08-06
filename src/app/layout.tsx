import type { Metadata, Viewport } from "next";
import { Inter, Vazirmatn } from "next/font/google";

import { cn } from "@/lib/utils";

import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import NextauthProvider from "@/components/providers/nextauth-provider";
import ReactQueryProvider from "@/components/providers/query-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ToasterProvider from "@/components/providers/toaster-provider";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "auto",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: {
    default: "کد بلاگ",
    template: "%s | کد بلاگ",
  },
  description:
    "کد بلاگ یک مکان برای آگاهی از آخرین خبر ها و تکنولوژی های برنامه نویسی",
  keywords: ["Blog", "Programming", "Code"],
  authors: [
    {
      name: "Iman Talebizadeh",
    },
  ],
  creator: "Iman Talebizadeh",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "light" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={cn("font-vazirmatn", inter.variable, vazirmatn.variable)}
      >
        <ReactQueryProvider>
          <NextauthProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <div className="flex min-h-screen w-full flex-col">
                <Navbar />

                <div className="container grid flex-1 grid-cols-1 grid-rows-1">
                  {children}
                </div>

                <Footer />
              </div>

              <ToasterProvider />
            </ThemeProvider>
          </NextauthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
