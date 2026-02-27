export const metadata = {
  title: "Elaaf School System | Quality Education in Karachi – Coming Soon",
  description:
    "Elaaf School System is launching soon in Karachi. We provide quality education with experienced teachers, a modern learning environment, and strong academic foundations for students.",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Elaaf School System – Coming Soon in Karachi",
    description: "Elaaf School System in Karachi is launching soon. Admissions opening shortly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}