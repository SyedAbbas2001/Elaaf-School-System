import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: { default: 'Elaaf School System', template: '%s | Elaaf School System' },
  description: 'Elaaf School System — Quality Education in Karachi since 2010. Nursery to Matric. Committed to a Better Tomorrow. Admissions open for 2026-27.',
  keywords: [
    'Elaaf School System',
    'best school Karachi',
    'best school North Karachi',
    'private school Karachi',
    'school near me Karachi',
    'matric school Karachi',
    'nursery school Karachi',
    'O level school Karachi',
    'affordable school Karachi',
    'school admissions Karachi 2026',
  ],
  authors: [{ name: 'Elaaf School System' }],
  creator: 'Elaaf School System',
  publisher: 'Elaaf School System',
  metadataBase: new URL('https://www.elaafschoolsystem.com'),
  alternates: {
    canonical: 'https://www.elaafschoolsystem.com',
  },
  openGraph: {
    title: 'Elaaf School System Karachi',
    description: 'Quality Education in Karachi since 2010 — Committed to a Better Tomorrow.',
    type: 'website',
    url: 'https://www.elaafschoolsystem.com',
    siteName: 'Elaaf School System',
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elaaf School System Karachi',
    description: 'Quality Education in Karachi since 2010 — Committed to a Better Tomorrow.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // verification: {
  //   google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE', // uncomment when you have the code
  // },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}