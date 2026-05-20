'use client';
import { useEffect, useState } from 'react';
import TreeSection from '@/components/TreeSection';
import Header from '@/components/Header';
import OffersSection from '@/components/OffersSection';
import MimosSection from '@/components/MimosSection';
import DatesSection from '@/components/DatesSection';
import DateCountdown from '@/components/DateCountdown';
import SobreSection from '@/components/SobreSection';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Newsletter from '@/components/Newsletter';
import QRCodeSection from '@/components/QRCodeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import LoadingScreen from '@/components/LoadingScreen';
import FlashOffer from '@/components/FlashOffer';
import SocialProof from '@/components/SocialProof';
import VisitorCounter from '@/components/VisitorCounter';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  if (!mounted) return null;

  return (
    <>
      <LoadingScreen />
      <Header />
      <main>
        <TreeSection />
        <OffersSection />
        <MimosSection />
        <DatesSection />
        <DateCountdown />
        <SobreSection />
        <Testimonials />
        <Gallery />
        <Newsletter />
        <QRCodeSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <FlashOffer />
      <SocialProof />
      <VisitorCounter />
    </>
  );
}
