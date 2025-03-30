import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider, store } from "@/components/index";
import TopMain from "@/components/TopMain";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

// Font optimization with font-display swap
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

// Enhanced SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://uniquestorebd.shop'),
  title: {
    template: "%s | Unique Store BD",
    default: "Unique Store BD - Best Online Shopping in Bangladesh",
  },
  description: "Buy authentic Products - Table Lamps, TWS earbuds, smart watches, home appliances & tech gadgets in Bangladesh. Best prices with warranty, fast delivery & easy returns.",
  keywords: [
    "Unique Store BD",
    "Online Shopping Bangladesh",
    "Original TWS Earbuds",
    "Smart Watches BD",
    "Home Appliances",
    "Tech Gadgets Bangladesh",
    "Table Lamp Price Bd",
    "Authentic Products BD",
    "Online Store Bangladesh",
    "Rechargeable Fan"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    title: "Unique Store BD - Best Online Shopping in Bangladesh",
    description: "Shop original TWS earbuds, smart watches, home appliances & tech gadgets at best prices in Bangladesh with warranty & fast delivery.",
    url: "https://uniquestorebd.shop",
    siteName: "Unique Store BD",
    images: [
      {
        url: "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png",
        width: 1200,
        height: 630,
        alt: "Unique Store BD - Best Online Shopping in Bangladesh",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unique Store BD - Authentic Gadgets & Electronics",
    description: "Shop 100% original tech products at best prices in Bangladesh",
    creator: "@UniqueStoreBD",
    images: [
      "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png"
    ],
  },
  verification: {
    google: "H1QKSH2SYxJ7TemokhY7BFgKgZN-iJT1B51u-CZ4wpw",
    other: {
      "facebook-domain-verification": ["your-facebook-verification-code"],
    },
  },
  alternates: {
    canonical: "https://uniquestorebd.shop",
  },
  category: "ecommerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <GoogleTagManager gtmId="GTM-N9P2439Z" />
      <head>
        {/* Preload critical resources */}
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

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Comprehensive Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Unique Store BD",
              url: "https://uniquestorebd.shop",
              logo: "https://res.cloudinary.com/dxmvrhcjx/image/upload/v1736267263/hm8yhv7pehnbxw4klxym.png",
              description: "Authentic gadgets and electronics online store in Bangladesh",
              address: {
                "@type": "PostalAddress",
                streetAddress: "House 01, Road 01, Sector 01, Uttara, Dhaka",
                addressLocality: "Dhaka",
                addressRegion: "Dhaka",
                postalCode: "1200",
                addressCountry: "BD"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+8801608257876",
                contactType: "customer service",
                email: "uniquestorebd23@gmail.com",
                areaServed: "BD",
                availableLanguage: ["en", "bn"]
              },
              sameAs: [
                "https://www.facebook.com/uniquestorebd23",
                "https://www.instagram.com/uniquestorebd",
                "https://www.linkedin.com/company/uniquestorebd"
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "09:00",
                closes: "21:00"
              },
              priceRange: "$$"
            })
          }}
        />

        {/* Search Console Verification */}
        <meta name="google-site-verification" content="H1QKSH2SYxJ7TemokhY7BFgKgZN-iJT1B51u-CZ4wpw" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9P2439Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            aria-hidden="true"
          ></iframe>
        </noscript>

        <Provider store={store}>
          <Header />
          <main className="min-h-[calc(100vh-160px)]">
            {children}
          </main>
          <Toaster 
            richColors 
            duration={1500} 
            position="top-right" 
            closeButton 
            toastOptions={{
              classNames: {
                toast: 'font-sans',
              },
            }} 
          />
          <div className="mt-8">
            <TopMain />
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}