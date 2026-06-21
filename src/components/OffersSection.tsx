'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { Product } from '@/lib/products';

const defaultOffers: Product[] = [
  { id: '1', name: 'Caneca Floral Delicada', description: 'Caneca de porcelana 300ml adornada com estampa floral em tons pastéis.', price: 49.90, oldPrice: 69.90, image: '', category: 'mimos', subcategory: 'canecas', isOffer: true, createdAt: Date.now() },
  { id: '2', name: 'Caderneta Artesanal com Caneta', description: 'Caderneta revestida em tecido com nome bordado, acompanhada de caneta exclusiva.', price: 39.90, oldPrice: 55.00, image: '', category: 'mimos', subcategory: 'cadernetas', isOffer: true, createdAt: Date.now() },
  { id: '6', name: 'Agenda dos Sonhos 2026', description: 'Agenda anual com capa dura revestida em tecido aveludado, nome personalizado e páginas com design floral exclusivo.', price: 59.90, oldPrice: 79.90, image: '', category: 'mimos', subcategory: 'agendas', isOffer: true, createdAt: Date.now() },
  { id: '8', name: 'Caneka Amor Eterno - Dia das Mães', description: 'Caneka especial em porcelana com frase "Melhor Mãe do Mundo" em lettering dourado.', price: 54.90, oldPrice: 69.90, image: '', category: 'datas', subcategory: 'dia-das-maes', isOffer: true, createdAt: Date.now() },
  { id: '10', name: 'Ovo de Páscoa Dos Sonhos 500g', description: 'Ovo de chocolate belga ao leite 500g com embalagem luxuosa personalizada.', price: 89.90, oldPrice: 119.90, image: '', category: 'datas', subcategory: 'pascoa', isOffer: true, createdAt: Date.now() },
  { id: '13', name: 'Super Combo Mimos Exclusivos', description: 'Pacote especial com 3 produtos personalizados: caneca + caderneta + caneta com 20% de desconto.', price: 89.90, oldPrice: 119.70, image: '', category: 'ofertas', subcategory: 'kits-promocionais', isOffer: true, createdAt: Date.now() },
  { id: '14', name: 'Mini Caneca Surpresa', description: 'Caneca 200ml sortida com estampas exclusivas por apenas R$19,90. Estoque limitado!', price: 19.90, oldPrice: 39.90, image: '', category: 'ofertas', subcategory: 'queima-estoque', isOffer: true, createdAt: Date.now() },
];

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
        <motion.div
          key={u.l}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-xl px-3 sm:px-4 py-3 text-center min-w-[56px] sm:min-w-[64px]"
        >
          <motion.div
            key={u.v}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-light text-[#111]"
          >
            {String(u.v).padStart(2, '0')}
          </motion.div>
          <div className="text-[10px] font-light text-[#999] uppercase tracking-[0.1em]">{u.l}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function OffersSection() {
  const [products, setProducts] = useState<Product[]>(defaultOffers);
  const [modal, setModal] = useState<Product | null>(null);

  useEffect(() => {
    import('@/lib/products').then(({ getProducts }) => {
      const p = getProducts().filter((x: Product) => x.isOffer);
      if (p.length) setProducts(p);
    });
  }, []);

  if (!products.length) return null;

  return (
    <section id="ofertas" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-transparent to-blue-50/30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Tag size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Promoções por Tempo Limitado</span>
          </div>
          <h2 className="section-title">Ofertas</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
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
