'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, X } from 'lucide-react';
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

const defaultMimos: Product[] = [
  { id: '1', name: 'Caneca Floral Delicada', description: 'Caneca de porcelana 300ml adornada com estampa floral em tons pastéis.', price: 49.90, oldPrice: 69.90, image: '', category: 'mimos', subcategory: 'canecas', isOffer: true, createdAt: 1 },
  { id: '2', name: 'Caderneta Artesanal com Caneta', description: 'Caderneta revestida em tecido com nome bordado, acompanhada de caneta exclusiva.', price: 39.90, oldPrice: 55.00, image: '', category: 'mimos', subcategory: 'cadernetas', isOffer: true, createdAt: 2 },
  { id: '3', name: 'Lembranças de Casamento Premium', description: 'Conjunto de 50 lembrancinhas personalizadas.', price: 189.90, image: '', category: 'mimos', subcategory: 'lembrancinhas', createdAt: 3 },
  { id: '4', name: 'Baú de Memórias Personalizado', description: 'Caixa em MDF revestida com nome e data gravados a laser.', price: 79.90, image: '', category: 'mimos', subcategory: 'caixas', createdAt: 4 },
  { id: '5', name: 'Topo de Bolo Sonho de Amor', description: 'Topo de bolo em acrílico cristal com nomes dos noivos.', price: 34.90, image: '', category: 'mimos', subcategory: 'topos-bolo', createdAt: 5 },
  { id: '6', name: 'Agenda dos Sonhos 2026', description: 'Agenda anual com capa dura revestida em tecido aveludado.', price: 59.90, oldPrice: 79.90, image: '', category: 'mimos', subcategory: 'agendas', isOffer: true, createdAt: 6 },
  { id: '7', name: 'Kit Universitário Encanto', description: 'Conjunto completo para formatura.', price: 99.90, image: '', category: 'mimos', subcategory: 'kits', createdAt: 7 },
];

export default function MimosSection() {
  const [products, setProducts] = useState<Product[]>(defaultMimos);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true) }, []);
  useEffect(() => {
    import('@/lib/products').then(({ getProducts }) => {
      const p = getProducts().filter((x: Product) => x.category === 'mimos');
      if (p.length) setProducts(p);
    });
  }, []);

  const filtered = useMemo(() => products.filter(p => {
    if (filter !== 'all' && p.subcategory !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [products, filter, search]);

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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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

        <div className="text-center text-[10px] text-gray-400 mt-2">
          Produtos carregados: {products.length} | Filtrados: {filtered.length} | Mounted: {mounted ? 'sim' : 'nao'}
        </div>
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </section>
  );
}
