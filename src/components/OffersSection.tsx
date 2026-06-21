'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';

const offers = [
  { id: '1', name: 'Caneca Floral Delicada', desc: 'Caneca de porcelana 300ml adornada com estampa floral em tons pastéis.', price: 49.90, old: 69.90, sub: 'canecas' },
  { id: '2', name: 'Caderneta Artesanal com Caneta', desc: 'Caderneta revestida em tecido com nome bordado, acompanhada de caneta exclusiva.', price: 39.90, old: 55.00, sub: 'cadernetas' },
  { id: '6', name: 'Agenda dos Sonhos 2026', desc: 'Agenda anual com capa dura revestida em tecido aveludado, nome personalizado.', price: 59.90, old: 79.90, sub: 'agendas' },
  { id: '13', name: 'Super Combo Mimos Exclusivos', desc: 'Pacote especial com 3 produtos personalizados: caneca + caderneta + caneta com 20% de desconto.', price: 89.90, old: 119.70, sub: 'kits' },
  { id: '14', name: 'Mini Caneca Surpresa', desc: 'Caneca 200ml sortida com estampas exclusivas por apenas R$19,90. Estoque limitado!', price: 19.90, old: 39.90, sub: 'canecas' },
];

const subLabels: Record<string, string> = {
  canecas: 'Canecas', cadernetas: 'Cadernetas', lembrancinhas: 'Lembrancinhas',
  caixas: 'Caixas', 'topos-bolo': 'Topos de Bolo', agendas: 'Agendas', kits: 'Kits',
};

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
  if (!offers.length) return null;

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
          {offers.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover group relative glass rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="absolute top-3 right-3 z-10">
                <span className="tag tag-pink flex items-center gap-1 shadow-lg"><Sparkles size={12} /> Oferta</span>
              </div>
              <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100">
                <span className="text-6xl sm:text-7xl font-light text-white/70 select-none group-hover:scale-110 transition-transform duration-700">{p.name.charAt(0)}</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                {p.sub && <span className="tag tag-pink mb-2 self-start text-[10px]">{subLabels[p.sub] || p.sub}</span>}
                <h3 className="font-medium text-sm sm:text-base mb-1.5 text-text-primary leading-tight">{p.name}</h3>
                <p className="text-xs sm:text-sm text-text-secondary/70 mb-3 line-clamp-2 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  {p.old && <span className="product-old-price">R$ {p.old.toFixed(2).replace('.', ',')}</span>}
                  <span className="text-base sm:text-lg font-light text-[#111]">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
