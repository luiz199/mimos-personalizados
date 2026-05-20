'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + Math.floor(Math.random() * 3) + 1);
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-5 z-40"
    >
      <div className="glass-strong rounded-full px-3.5 py-1.5 shadow-lg flex items-center gap-1.5">
        <Users size={11} className="text-pink-400" />
        <span className="text-[10px] font-light text-text-secondary/70 tracking-[0.05em]">
          <span className="font-medium text-[#111]">{count.toLocaleString('pt-BR')}</span> visitantes
        </span>
      </div>
    </motion.div>
  );
}
