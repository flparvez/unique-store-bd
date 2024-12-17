// app/layout.tsx
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Provider, store } from '@/components/index';
import TopMain from '@/components/TopMain';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Importing fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://uniquestorebd.vercel.app/'),
  title: 'Unique Store Bd | Quality Is Here',
  description:
    'Enjoy hassle-free online shopping from Unique Store Bd. Find genuine products, TWS earbuds, unique gadgets, home appliances, and daily essentials.',
  robots: {
    index: true,
    follow: true,
  },
  keywords:
    'Online Shopping in Bangladesh, Online Shopping Store, Buy Online, Shop Online, Unique Store BD, Electric Accessories, TWS, Unique Gadgets, Home Appliances, Daily Needs.',
  openGraph: {
    title: 'Unique Store Bd | Quality Is Here',
    description:
      'Enjoy hassle-free online shopping from Unique Store Bd. Find genuine products, TWS earbuds, unique gadgets, home appliances, and daily essentials.',
    images: ['https://i.ibb.co.com/WBVg5rv/image.png'],
    url: 'https://uniquestorebd.vercel.app/',
  },
  verification: {
    other: {
      'google-site-verification': 'ZEjE-cLJCoXI1DyyLXq-ErqHg540Nq9mlZO3cq1A2Bs',
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          {/* Google Tag Manager (Head) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NWBLSZ7R');  // Replace with your GTM container ID
              `,
            }}
          />
          {/* Main Content */}
          <main className="mt-7">{children}</main>
          <Toaster richColors duration={1500} position="top-right" />
          <div className="mb-8">
            <TopMain />
          </div>
          <Footer />
        </Provider>

        {/* Google Tag Manager (Noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWBLSZ7R"// Replace with your GTM container ID
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>


      </body>
    </html>
  );
}
