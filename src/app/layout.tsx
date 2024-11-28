import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Provider,store} from "@/components/index"
import TopMain from "@/components/TopMain";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Importing fonts
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
  metadataBase: new URL("https://uniquestorebd.vercel.app/"),
  keywords: [
    "unique store",
    "Unique Store Bd",
    "quality is here",
    "Online Shopping BD",
    "Authentic Products BD",
    "Fast Delivery BD",
    "Original Xiaomi Products BD",
    "Xiaomi BD",
    "Smartwatch BD",
    "Watches BD",
    "Microphones BD",
    "WiFi Smart Switches BD",
    "Home Automation BD",
    "Headphones BD",
    "YouTube Products BD",
    "Quality Products BD",
    "Online Shopping Bangladesh",
    "Ecommerce BD",
    "Buy Original Products BD",
    "Bangladesh Shopping",
    "Tech Gadgets BD",
    "Electronics BD",
    "Smart Devices BD",
    "Affordable Shopping BD"
  ],
  title: "Unique Store Bd | Quality Is Here",
  description: "Online Shopping BD. Unique Store Bd. Authentic পণ্য কিনুন এবং দ্রুত ডেলিভারি পান। Authentic Xiaomi পণ্য, ঘড়ি, Smartwatch, Microphones, WiFi Smart Switches, Home Automation পণ্য, Headphones, YouTube পণ্য কিনুন।বাংলাদেশের অনলাইন শপিংয়ের জন্য Unique Store BD Authentic পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা। এখনই কিনুন এবং উপভোগ করুন।.",
  



  verification: {
    other: {
      "google-site-verification": "K23a8jBRyLQ0qv2vghHcC2eX-myx3WIDq-0IDwFukpY",
   
    },
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <Header />
          <main className="mt-7">{children}</main>
          <Toaster richColors duration={1500} position="top-right" />
          <div className="mb-8">
            <TopMain />
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
