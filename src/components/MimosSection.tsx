'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, X } from 'lucide-react';
import { getProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { Product } from '@/lib/products';

const subcategories = [
  { id: 'all', label: 'Todos' },
  { id: 'canecas', label: 'Canecas' },
  { id: 'cadernetas', label: 'Cadernetas' },
  { id: 'lembrancinhas', label: 'Lembrancinhas' },
  { id: 'caixas', label: 'Caixas' },
  { id: 'topos-bolo', label: 'Topos de Bolo' },
  { id: 'agendas', label: 'Agendas' },
  { id: 'kits', label: 'Kits' },
];

export default function MimosSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Product | null>(null);

  useEffect(() => { setProducts(getProducts().filter(p => p.category === 'mimos')) }, []);

  const filtered = products.filter(p => {
    if (filter !== 'all' && p.subcategory !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <section id="mimos" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-pink-50/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Gift size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Produtos Personalizados</span>
          </div>
          <h2 className="section-title">Mimos</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
        </motion.div>

        <div className="relative max-w-md mx-auto mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm text-text-primary"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]">
              <X size={14} />
            </button>
          )}
        </div>

        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {subcategories.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setFilter(s.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-light tracking-[0.05em] transition-all duration-300 touch-manipulation ${
                filter === s.id
                  ? 'bg-[#e8e8e8] text-[#111]'
                  : 'glass text-text-secondary hover:bg-white/40'
              }`}
            >
              {s.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onView={setModal} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Gift size={36} className="mx-auto text-pink-300/50 mb-3" />
            <p className="text-sm text-text-secondary/60">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
