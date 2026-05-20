import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mimos & Personalizados AC",
  description: "Transformamos momentos especiais em lembranças inesquecíveis. Canecas, cadernetas, lembrancinhas e muito mais!",
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{document.documentElement.classList.toggle('dark',localStorage.getItem('mimos-dark')==='true')}catch(e){}`
        }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased transition-colors duration-300">{children}</body>
    </html>
  );
}
