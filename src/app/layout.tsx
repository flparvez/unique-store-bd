import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider, store } from "@/components/index";
import TopMain from "@/components/TopMain";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
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
  description:
    " Unique Store Bd. Authentic পণ্য কিনুন এবং দ্রুত ডেলিভারি পান। Authentic Tws, Xiaomi পণ্য, ঘড়ি, Smartwatch, Microphones,Headphone,Earbuds, WiFi Smart Switches, Home Automation পণ্য, Headphones, YouTube পণ্য কিনুন।বাংলাদেশের অনলাইন শপিংয়ের জন্য Unique Store BD Authentic পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা। এখনই কিনুন এবং উপভোগ করুন।.",
  robots: {
    index: true,
    follow: true,
  },
  keywords:
    "Unique Store Bd, Quality Is Here, Ecommerce Website, Unique Shop Bd,Next Js",
  openGraph: {
    title: "Unique Store Bd | Quality Is Here",
    description:
      " Unique Store Bd. Authentic পণ্য কিনুন এবং দ্রুত ডেলিভারি পান। Authentic Tws, Xiaomi পণ্য, ঘড়ি, Smartwatch, Microphones,Headphone,Earbuds, WiFi Smart Switches, Home Automation পণ্য, Headphones, YouTube পণ্য কিনুন।বাংলাদেশের অনলাইন শপিংয়ের জন্য Unique Store BD Authentic পণ্য এবং দ্রুত ডেলিভারির নিশ্চয়তা। এখনই কিনুন এবং উপভোগ করুন।.",
    images: ["https://i.ibb.co.com/WBVg5rv/image.png"],
    url: "https://uniquestorebd.vercel.app/",
  },

  verification: {
    other: {
      // "google-site-verification": "ZEjE-cLJCoXI1DyyLXq-ErqHg540Nq9mlZO3cq1A2Bs",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NWBLSZ7R" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWBLSZ7R"
            height="0"
            width="0"
            style={{display:"none",visibility:"hidden"}}
          ></iframe>
        </noscript>

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
