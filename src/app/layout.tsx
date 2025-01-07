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
  metadataBase: new URL("https://Unique Store BD.vercel.app/"),
  title: "Unique Store BD  | Quality Is Here",
  description: "Online Shopping BD.  Unique Store BD.  Enjoy hassle-free online shopping from Unique Store BD. Find genuine products,  TWS earbuds, unique gadgets, home appliances, and daily essentials",
  keywords:
  "Unique Store BD, UNIQUE STORE Bd,  Online Shopping in Bangladesh, Online Shopping Store, Buy Online, Shop Online, Electric Accessories, TWS, Unique Gadgets, Home Appliances, Daily Needs.",
  robots: {
    index: true,
    follow: true,
  },


 
  openGraph: {
    title: "Unique Store BD | Quality Is Here",
    description: "Online Shopping BD.  Unique Store BD.  Enjoy hassle-free online shopping from Unique Store BD. Find genuine products,  TWS earbuds, unique gadgets, home appliances, and daily essentials",
    images: ["https://i.ibb.co.com/WBVg5rv/image.png"],
    url: "https://Unique Store BD.vercel.app/",
  },

  verification: {
    other: {
      "google-site-verification": "ZEjE-cLJCoXI1DyyLXq-ErqHg540Nq9mlZO3cq1A2Bs",
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
