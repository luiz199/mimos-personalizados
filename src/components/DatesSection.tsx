'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { getProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { Product } from '@/lib/products';

const dateCategories = [
  { id: 'dia-das-maes', label: 'Dia das Mães' },
  { id: 'dia-dos-pais', label: 'Dia dos Pais' },
  { id: 'pascoa', label: 'Páscoa' },
  { id: 'natal', label: 'Natal' },
  { id: 'ano-novo', label: 'Ano Novo' },
  { id: 'dia-das-criancas', label: 'Dia das Crianças' },
  { id: 'festa-junina', label: 'Festa Junina' },
  { id: 'cha-revelacao', label: 'Chá Revelação' },
  { id: 'casamento', label: 'Casamento' },
  { id: 'aniversario', label: 'Aniversário' },
];

export default function DatesSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeDate, setActiveDate] = useState('dia-das-maes');
  const [modal, setModal] = useState<Product | null>(null);

  useEffect(() => { setProducts(getProducts().filter(p => p.category === 'datas')) }, []);

  const filtered = products.filter(p => p.subcategory === activeDate);

  return (
    <section id="datas" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 via-transparent to-pink-50/30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Calendar size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Datas Especiais</span>
          </div>
          <h2 className="section-title">Datas Comemorativas</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
          <p className="section-subtitle">Presentes personalizados para cada data especial do ano</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {dateCategories.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setActiveDate(d.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-light tracking-[0.05em] transition-all duration-300 touch-manipulation ${
                activeDate === d.id
                  ? 'bg-[#e8e8e8] text-[#111]'
                  : 'glass text-text-secondary hover:bg-white/40'
              }`}
            >
              {d.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeDate}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onView={setModal} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <Calendar size={36} className="mx-auto text-pink-300/50 mb-3" />
              <h3 className="text-base font-medium text-text-primary mb-2">{dateCategories.find(d => d.id === activeDate)?.label}</h3>
              <p className="text-sm text-text-secondary/60 mb-4">Em breve, produtos especiais estarão disponíveis!</p>
              <p className="text-xs text-text-secondary/40">Personalizamos sob encomenda para você</p>
            </div>
          )}
        </motion.div>
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
