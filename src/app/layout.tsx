import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MusicPlayer from '@/components/MusicPlayer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CartDrawer from '@/components/CartDrawer';
import { CartProvider } from '@/lib/cart';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimos & Personalizados AC",
  description: "Transformamos momentos especiais em lembranças inesquecíveis. Canecas, cadernetas, lembrancinhas e muito mais!",
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#f472b6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{document.documentElement.classList.toggle('dark',localStorage.getItem('mimos-dark')==='true')}catch(e){}`
        }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased transition-colors duration-300">
        <CartProvider>{children}<MusicPlayer /><WhatsAppFloat /><CartDrawer /></CartProvider>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js')` }} />
      </body>
    </html>
  );
}
