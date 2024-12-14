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
  title: "Unique Store Bd | Quality Is Here",
  description: " Unique Store Bd. Authentic পণ্য কিনুন এবং দ্রুত ডেলিভারি পান। Authentic Tws, Xiaomi পণ্য, ঘড়ি, Smartwatch, Microphones,Headphone,Earbuds, WiFi Smart Switches, Home Automation পণ্য, Headphones, YouTube পণ্য কিনুন।বাংলাদেশের অনলাইন শপিংয়ের জন্য Unique Store BD Authentic পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা। এখনই কিনুন এবং উপভোগ করুন।.",
robots:{
index: true,
follow: true
},
keywords:"Unique Store Bd, Quality Is Here, Ecommerce Website, Unique Shop Bd,Next Js",
openGraph:{
title: "Unique Store Bd | Quality Is Here", 
description: " Unique Store Bd. Authentic পণ্য কিনুন এবং দ্রুত ডেলিভারি পান। Authentic Tws, Xiaomi পণ্য, ঘড়ি, Smartwatch, Microphones,Headphone,Earbuds, WiFi Smart Switches, Home Automation পণ্য, Headphones, YouTube পণ্য কিনুন।বাংলাদেশের অনলাইন শপিংয়ের জন্য Unique Store BD Authentic পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা। এখনই কিনুন এবং উপভোগ করুন।.",
images:["https://i.ibb.co.com/WBVg5rv/image.png"],
url:"https://uniquestorebd.vercel.app/",
},

  // verification: {
  //   other: {
  //     "google-site-verification": "0qTCYg37Xn4zPyJD_ECxvtKhF8S7Nfi_VfzBfVb0fBo",
      
  //   },
  // }
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
