'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Sparkles } from 'lucide-react';

const offers = [
  { emoji: '☕', text: 'Caneca Floral Delicada com 30% OFF!', time: '2 min atrás' },
  { emoji: '📖', text: 'Caderneta Artesanal — frete grátis hoje!', time: '5 min atrás' },
  { emoji: '🎁', text: 'Kits personalizados com 20% OFF!', time: '8 min atrás' },
];

export default function FlashOffer() {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setShow(true), 4000),
      setTimeout(() => setCurrent(1), 8000),
      setTimeout(() => setShow(false), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = () => setShow(false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-28 right-5 z-50 max-w-xs w-full"
        >
          <div className="glass-strong rounded-2xl p-4 shadow-xl border border-pink-200/30">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                <Bell size={16} className="text-pink-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-medium text-[#111] tracking-[0.05em] uppercase">Oferta Relâmpago</span>
                  <button onClick={dismiss} className="text-[#aaa] hover:text-[#555] transition-colors">
                    <X size={12} />
                  </button>
                </div>
                <p className="text-xs text-text-secondary/80 leading-relaxed">{offers[current].text}</p>
                <span className="text-[10px] text-text-secondary/40 mt-1 block">{offers[current].time}</span>
                <a href="#ofertas" onClick={dismiss}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-pink-500 hover:text-pink-600 mt-1.5 transition-colors"
                >
                  <Sparkles size={10} /> Ver oferta
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
