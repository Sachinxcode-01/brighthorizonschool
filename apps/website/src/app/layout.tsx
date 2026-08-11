import type { Metadata } from 'next';
import '@/styles/globals.css';
import VantaWrapper from '@/components/VantaWrapper';

export const metadata: Metadata = {
  title: 'Bright Horizon School | Excellence in Education & Innovation',
  description: 'Bright Horizon School offers world-class holistic education, modern STEM robotics labs, sports excellence, and moral growth.',
  openGraph: {
    title: 'Bright Horizon School',
    description: 'Shaping Young Minds for a Brighter Future. CBSE Affiliated.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <VantaWrapper>
          {children}
        </VantaWrapper>
      </body>
    </html>
  );
}
