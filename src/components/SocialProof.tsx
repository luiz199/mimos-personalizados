'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const purchases = [
  { name: 'Ana', product: 'Caneca Floral Delicada', time: 'há 2 min' },
  { name: 'Maria', product: 'Caderneta Artesanal', time: 'há 4 min' },
  { name: 'Juliana', product: 'Kit Universitário Encanto', time: 'há 6 min' },
  { name: 'Camila', product: 'Topo de Bolo Sonho de Amor', time: 'há 9 min' },
  { name: 'Fernanda', product: 'Agenda dos Sonhos 2026', time: 'há 12 min' },
  { name: 'Letícia', product: 'Baú de Memórias', time: 'há 15 min' },
  { name: 'Amanda', product: 'Caneka Amor Eterno', time: 'há 18 min' },
  { name: 'Beatriz', product: 'Kit Pai Herói', time: 'há 22 min' },
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const show = setInterval(() => {
      setVisible(true);
      const idx = Math.floor(Math.random() * purchases.length);
      setCurrent(idx);
      setTimeout(() => setVisible(false), 5000);
    }, 8000);

    setVisible(true);
    setTimeout(() => setVisible(false), 5000);

    return () => clearInterval(show);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-28 left-5 z-50 max-w-xs"
        >
          <div className="glass-strong rounded-2xl p-3 pl-3.5 shadow-xl border border-pink-200/20 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center text-white text-xs font-medium">
                {purchases[current].name[0]}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-secondary/80 leading-snug">
                <span className="font-medium text-[#111]">{purchases[current].name}</span>{' '}
                comprou <span className="font-medium text-[#111]">{purchases[current].product}</span>
              </p>
              <span className="text-[10px] text-text-secondary/40">{purchases[current].time}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
