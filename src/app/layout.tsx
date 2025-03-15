import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider, store } from "@/components/index";
import TopMain from "@/components/TopMain";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

// ✅ Importing custom fonts for better performance
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

// ✅ Optimized SEO Metadata

export const metadata: Metadata = {

  title: {
    template: "%s - Unique Store BD",
    default: "Unique Store BD - Best Online Shopping in Bangladesh",
  },
  description:
    "Buy authentic gadgets, TWS earbuds, home appliances & unique accessories online in Bangladesh at Unique Store BD. Enjoy hassle-free shopping with best prices & fast delivery.",
  keywords:
    "Unique Store BD, Online Shopping BD, TWS Earbuds, Gadgets, Home Appliances, Buy Online, Electric Accessories, Best Shopping BD, Tech Accessories, Unique Gadgets BD, Bangladesh Online Store",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Unique Store BD - Best Online Shopping in Bangladesh",
    description:
      "Shop online in Bangladesh with Unique Store BD. Find original TWS earbuds, home gadgets & more at best prices. Trusted online store with fast delivery & secure payment.",
    images: [
      "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png",
    ],
    url: "https://uniquestorebd.shop/",
    type: "website",
    siteName: "Unique Store BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Store BD - Best Online Shopping in Bangladesh",
    description:
      "Shop online for TWS earbuds, Rechargeable Fan, Table Lamp, gadgets, home appliances & more. Enjoy the best deals & fast delivery from Unique Store BD.",
    images: [
      "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1742060244/ea4imit2icsqfpwahihm.png",
      "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png",
    ],
  },
  verification: {
    other: {
      "google-site-verification": "H1QKSH2SYxJ7TemokhY7BFgKgZN-iJT1B51u-CZ4wpw",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-N9P2439Z" />
      <head>
        {/* ✅ Preload essential fonts and images for faster load times */}
        <link
          rel="preload"
          href="./fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png"
          as="image"
        />

        {/* ✅ JSON-LD Schema Markup for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Unique Store BD",
              url: "https://uniquestorebd.shop/",
              image:
                "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png",
              description:
                "Shop online for TWS earbuds, Rechargeable Fan, Table Lamp, gadgets, home appliances & more. Enjoy the best deals & fast delivery from Unique Store BD.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dhaka",
                addressCountry: "BD",
              },
              sameAs: ["https://www.facebook.com/uniquestorebd23"],
              openingHours: "Mo-Su 09:00-21:00",
              telephone: "+8801608257876",
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9P2439Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Provider store={store}>
          <Header />
          <main className="">{children}</main>
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
