'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import { getProducts, onSync } from '@/lib/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { Product } from '@/lib/products';

function Countdown() {
  const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const [time, setTime] = useState({ d: 7, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: time.d, l: 'Dias' }, { v: time.h, l: 'Horas' },
    { v: time.m, l: 'Min' }, { v: time.s, l: 'Seg' },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 justify-center mb-10">
      {items.map((u, i) => (
        <motion.div key={u.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="glass rounded-xl px-3 sm:px-4 py-3 text-center min-w-[56px] sm:min-w-[64px]">
          <motion.div key={u.v} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}
            className="text-xl font-light text-[#111]">{String(u.v).padStart(2, '0')}</motion.div>
          <div className="text-[10px] font-light text-[#999] uppercase tracking-[0.1em]">{u.l}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function OffersSection() {
  const [products, setProducts] = useState<Product[]>(() => getProducts().filter(p => p.isOffer));
  const [modal, setModal] = useState<Product | null>(null);

  useEffect(() => onSync(() => setProducts(getProducts().filter(p => p.isOffer))), []);

  if (!products.length) return null;

  return (
    <section id="ofertas" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-transparent to-blue-50/30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Tag size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Promoções por Tempo Limitado</span>
          </div>
          <h2 className="section-title">Ofertas</h2>
          <div className="section-title-decoration"><span className="line" /><span className="ornament">✦</span><span className="line" /></div>
          <p className="section-subtitle">Aproveite antes que acabe!</p>
        </motion.div>

        <Countdown />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} showOffer onView={setModal} />
          ))}
        </div>
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
