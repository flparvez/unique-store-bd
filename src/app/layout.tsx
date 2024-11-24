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
  metadataBase: new URL("https://uniquestoreb.vercel.app/"),
  keywords:["unique store","Unique Store Bd","quality is here"],
  title: "Unique Store Bd- Quality Is Here",
  description: "Unique Store Bd | Ecommerce Application - by parvez",
  verification: {
    other: {
      // "google-site-verification": "0qTCYg37Xn4zPyJD_ECxvtKhF8S7Nfi_VfzBfVb0fBo",
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
          <main>{children}</main>
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
