'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, X } from 'lucide-react';

const products = [
  { id: '1', name: 'Caneca Floral Delicada', desc: 'Caneca de porcelana 300ml adornada com estampa floral em tons pastéis.', price: 49.90, old: 69.90, sub: 'canecas' },
  { id: '2', name: 'Caderneta Artesanal com Caneta', desc: 'Caderneta revestida em tecido com nome bordado, acompanhada de caneta exclusiva.', price: 39.90, old: 55.00, sub: 'cadernetas' },
  { id: '3', name: 'Lembranças de Casamento Premium', desc: 'Conjunto de 50 lembrancinhas personalizadas com embalagem individual em organza.', price: 189.90, sub: 'lembrancinhas' },
  { id: '4', name: 'Baú de Memórias Personalizado', desc: 'Caixa em MDF revestida com nome e data gravados a laser. Dimensões 25x15x8cm.', price: 79.90, sub: 'caixas' },
  { id: '5', name: 'Topo de Bolo Sonho de Amor', desc: 'Topo de bolo em acrílico cristal com nomes dos noivos e data.', price: 34.90, sub: 'topos-bolo' },
  { id: '6', name: 'Agenda dos Sonhos 2026', desc: 'Agenda anual com capa dura revestida em tecido aveludado, nome personalizado.', price: 59.90, old: 79.90, sub: 'agendas' },
  { id: '7', name: 'Kit Universitário Encanto', desc: 'Conjunto completo para formatura: caneca porcelana, caderneta, caneta e chaveiro personalizados.', price: 99.90, sub: 'kits' },
];

const subLabels: Record<string, string> = {
  canecas: 'Canecas', cadernetas: 'Cadernetas', lembrancinhas: 'Lembrancinhas',
  caixas: 'Caixas', 'topos-bolo': 'Topos de Bolo', agendas: 'Agendas', kits: 'Kits',
};

export default function MimosSection() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = products.filter(p => {
    if (filter !== 'all' && p.sub !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <section id="mimos" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-pink-50/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Gift size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Produtos Personalizados</span>
          </div>
          <h2 className="section-title">Mimos</h2>
          <div className="section-title-decoration"><span className="line" /><span className="ornament">✦</span><span className="line" /></div>
        </motion.div>

        <div className="relative max-w-md mx-auto mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm text-text-primary"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]"><X size={14} /></button>}
        </div>

        <motion.div className="flex flex-wrap gap-2 justify-center mb-10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {Object.entries(subLabels).map(([id, label]) => (
            <motion.button key={id} onClick={() => setFilter(id)}
              className={`px-4 py-1.5 rounded-full text-xs font-light tracking-[0.05em] transition-all duration-300 touch-manipulation ${
                filter === id ? 'bg-[#e8e8e8] text-[#111]' : 'glass text-text-secondary hover:bg-white/40'
              }`}>
              {label}
            </motion.button>
          ))}
          <motion.button onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-light tracking-[0.05em] transition-all duration-300 touch-manipulation ${
              filter === 'all' ? 'bg-[#e8e8e8] text-[#111]' : 'glass text-text-secondary hover:bg-white/40'
            }`}>
            Todos
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover group relative glass rounded-2xl overflow-hidden flex flex-col"
            >
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

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Gift size={36} className="mx-auto text-pink-300/50 mb-3" />
            <p className="text-sm text-text-secondary/60">Nenhum produto encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
}
