import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Poppins } from 'next/font/google';
import './globals.css';
import QueryProvider from './components/QueryProvider';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import CartProvider from '@/providers/CartProvider';
import VisitorProvider from './components/VisitorProvider';
import SEO from '@/components/SEO';
import Script from 'next/script';
const OpenSans = localFont({
  src: [
    {
      path: './fonts/OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './fonts/OpenSans-SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: './fonts/OpenSans-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/OpenSans-ExtraBold.ttf',
      weight: '800',
      style: 'extrabold',
    },
  ],
  variable: '--Opensans',
});
const Inter = localFont({
  src: [
    {
      path: './fonts/inter/Inter_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter_28pt-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './fonts/inter/Inter_28pt-SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
    {
      path: './fonts/inter/Inter_28pt-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/inter/Inter_28pt-ExtraBold.ttf',
      weight: '800',
      style: 'extrabold',
    },
  ],
  variable: '--Opensans',
});
const ProtestRiot = localFont({
  src: [
    {
      path: './fonts/ProtestRiot-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--ProtestRiot',
});
const SegoeUi = localFont({
  src: [
    {
      path: './fonts/Segoe UI Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/Segoe UI.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--SegoeUi',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--Poppins',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title:
    'Maaoz Official Store | Premium Bags & Stationery – Free Shipping & Quality Guaranteed',
  description:
    'Explore Maaoz Official Store for premium bags, stylish stationery, and more. Enjoy unbeatable prices, quality products, and free shipping on all orders. Shop now!',
  keywords:
    'premium bags, stylish stationery, tote bags, leather bags, office stationery, notebooks, bags shop, stationery shop, fashion accessories, bags online, Maaoz Official Store, high-quality bags, designer bags',
  openGraph: {
    title:
      'Maaoz Official Store | Premium Bags & Stationery – Free Shipping & Quality Guaranteed',
    description:
      'Explore Maaoz Official Store for premium bags, stylish stationery, and more. Enjoy unbeatable prices, quality products, and free shipping on all orders.',
    url: 'https://maaozofficialstore.shop',
    type: 'website',
    images: '/images/hero-banner.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Maaoz Official Store | Premium Bags & Stationery – Free Shipping & Quality Guaranteed',
    description:
      'Shop premium bags and stylish stationery at Maaoz Official Store. Enjoy unbeatable prices, quality, and free shipping on all orders.',
    images: '/images/hero-banner.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <header>
        <meta
          name="google-site-verification"
          content="cOwQtcxeRUojWCBXpCG9UWfGpKSIi1L-TX51HOxtn5o"
        />
         <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-9DSRBYNVRN`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9DSRBYNVRN', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </header>

      <SEO
        title="Maaoz Official Store | Premium Bags & Stationery Shop – Free Shipping & Quality Guaranteed"
        description="Explore Maaoz Official Store for premium bags, stylish stationery, and more. Enjoy unbeatable prices, quality products, and free shipping. Shop now!"
        keywords="premium bags, stylish stationery, tote bags, leather bags, office stationery, notebooks, bags shop, stationery shop, fashion accessories, bags online, Maaoz Official Store, high-quality bags, designer bags"
        imageUrl="/images/hero-banner.jpg" // Your hero image URL
        url="https://maaozofficialstore.shop"
        type="website"
        twitterCardType="summary_large_image"
      />
      <body
        className={`${OpenSans.variable} ${ProtestRiot?.variable} ${poppins?.variable} ${SegoeUi?.variable} ${Inter?.variable} antialiased`}
      >
        <Suspense fallback={<Loader />}>
          <QueryProvider dehydratedState={null}>
            <VisitorProvider>
              <CartProvider>{children}</CartProvider>
            </VisitorProvider>
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
