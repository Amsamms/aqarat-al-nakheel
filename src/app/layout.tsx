import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "عقارات النخيل - عقارات مميزة في الإسكندرية",
  description: "اكتشف الشقق والعقارات المميزة في شاطئ النخيل، العجمي، الإسكندرية. شريكك الموثوق في العقارات في مصر.",
  keywords: "عقارات، الإسكندرية، مصر، شقق، عقارات، العجمي، شاطئ النخيل",
  authors: [{ name: "عقارات النخيل" }],
  openGraph: {
    title: "عقارات النخيل - عقارات مميزة في الإسكندرية",
    description: "اكتشف الشقق والعقارات المميزة في شاطئ النخيل، العجمي، الإسكندرية.",
    url: "https://3aqarat-al-nakheel.vercel.app",
    siteName: "عقارات النخيل",
    locale: "ar_EG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-left" 
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'var(--font-geist-sans)',
              direction: 'rtl',
            },
          }}
        />
      </body>
    </html>
  );
}
