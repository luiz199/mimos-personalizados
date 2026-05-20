'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  { name: 'Ana Carolina', text: 'Simplesmente amei! A caneca personalizada que encomendei ficou perfeita, o acabamento é impecável. Super recomendo!', rating: 5, date: '2 semanas atrás' },
  { name: 'Mariana Santos', text: 'Encomendei as lembrancinhas do meu casamento e ficaram lindas! Todos os convidados elogiaram. Entrega super rápida.', rating: 5, date: '1 mês atrás' },
  { name: 'Juliana Costa', text: 'A agenda personalizada é maravilhosa! Capa aveludada, papel de alta qualidade. Presenteei minha irmã e ela amou.', rating: 5, date: '3 semanas atrás' },
  { name: 'Patrícia Oliveira', text: 'O topo de bolo ficou exatamente como eu queria! Detalhes perfeitos, recomendo de olhos fechados.', rating: 5, date: '2 meses atrás' },
  { name: 'Camila Rodrigues', text: 'Comprei o kit Dia das Mães para presentear minha mãe e foi a melhor escolha! Embalagem linda, produto de qualidade.', rating: 5, date: '1 mês atrás' },
  { name: 'Fernanda Lima', text: 'Atendimento excelente! Tirei dúvidas pelo WhatsApp e fui super bem atendida. O produto chegou antes do prazo.', rating: 5, date: '3 semanas atrás' },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => { setDirection(1); setCurrent(c => (c + 1) % testimonials.length); }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (i: number, dir: number) => { setDirection(dir); setCurrent(i); if (intervalRef.current) clearInterval(intervalRef.current); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-transparent to-blue-50/20 pointer-events-none" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Depoimentos</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
          <p className="section-subtitle">O que nossos clientes dizem</p>
        </motion.div>

        <motion.div
          className="relative min-h-[220px] glass rounded-2xl overflow-hidden"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-text-secondary/80 leading-relaxed mb-4 max-w-md italic px-2">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div>
                <span className="text-sm font-medium text-text-primary">{testimonials[current].name}</span>
                <span className="text-xs text-text-secondary/50 ml-2">{testimonials[current].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={() => go((current - 1 + testimonials.length) % testimonials.length, -1)}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#888] hover:text-[#111] transition-all shadow-sm hover:shadow-md">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go((current + 1) % testimonials.length, 1)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-[#888] hover:text-[#111] transition-all shadow-sm hover:shadow-md">
            <ChevronRight size={18} />
          </button>
        </motion.div>

        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => go(i, i > current ? 1 : -1)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-pink-400 w-5' : 'bg-pink-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
