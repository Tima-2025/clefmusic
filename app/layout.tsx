import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import WhatsAppBubble from '@/app/components/WhatsAppBubble';

export const metadata: Metadata = {
  title: 'CLEF Music - Musical Instruments & Sound Systems',
  description: 'Premium musical instruments, sound systems, and lighting equipment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppBubble phoneNumber="+1234567890" />
      </body>
    </html>
  );
}
