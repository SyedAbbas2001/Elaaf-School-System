import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: { default: 'Elaaf School System', template: '%s | Elaaf School System' },
  description: 'Elaaf School System – Quality Education in Karachi. Committed to a Better Tomorrow.',
  keywords: ['school', 'Karachi', 'education', 'Elaaf', 'admissions'],
  openGraph: {
    title: 'Elaaf School System',
    description: 'Quality Education in Karachi – Committed to a Better Tomorrow.',
    type: 'website',
    url: 'https://www.elaafschoolsystem.com',
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
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