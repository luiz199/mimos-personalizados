'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, X } from 'lucide-react';

const products = [
  { id: '1', name: 'Caneca Floral Delicada', desc: 'Caneca de porcelana 300ml.', price: 49.90, old: 69.90, sub: 'canecas' },
  { id: '2', name: 'Caderneta Artesanal', desc: 'Caderneta revestida em tecido.', price: 39.90, old: 55.00, sub: 'cadernetas' },
  { id: '3', name: 'Lembranças Casamento', desc: 'Conjunto de 50 lembrancinhas.', price: 189.90, sub: 'lembrancinhas' },
  { id: '4', name: 'Baú de Memórias', desc: 'Caixa em MDF com nome gravado.', price: 79.90, sub: 'caixas' },
  { id: '5', name: 'Topo de Bolo', desc: 'Acrílico cristal com nomes.', price: 34.90, sub: 'topos-bolo' },
  { id: '6', name: 'Agenda dos Sonhos 2026', desc: 'Capa dura revestida em tecido.', price: 59.90, old: 79.90, sub: 'agendas' },
  { id: '7', name: 'Kit Universitário', desc: 'Caneca + caderneta + caneta.', price: 99.90, sub: 'kits' },
];

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
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Gift size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Produtos Personalizados</span>
          </div>
          <h2 className="section-title">Mimos</h2>
          <div className="section-title-decoration"><span className="line" /><span className="ornament">✦</span><span className="line" /></div>
        </div>
        <div className="relative max-w-md mx-auto mb-6">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white/60 border border-pink-200/40 outline-none text-sm" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aaa]"><X size={14} /></button>}
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['all','canecas','cadernetas','lembrancinhas','caixas','topos-bolo','agendas','kits'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-light transition-all ${
                filter === s ? 'bg-[#e8e8e8] text-[#111]' : 'glass text-text-secondary hover:bg-white/40'
              }`}>
              {s === 'all' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map(p => (
            <div key={p.id} className="glass rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 sm:h-56 bg-gradient-to-br from-pink-100 via-pink-50 to-blue-100 flex items-center justify-center">
                <span className="text-6xl font-light text-white/70">{p.name.charAt(0)}</span>
              </div>
              <div className="p-4 sm:p-5">
                {p.sub && <span className="text-[10px] tag tag-pink mb-2 inline-block">{p.sub}</span>}
                <h3 className="font-medium text-sm mb-1">{p.name}</h3>
                <p className="text-xs text-text-secondary/70 mb-3 line-clamp-2">{p.desc}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  {p.old && <span className="text-sm text-gray-400 line-through">R$ {p.old.toFixed(2)}</span>}
                  <span className="text-base font-light">R$ {p.price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16"><p className="text-sm text-text-secondary/60">Nenhum produto encontrado</p></div>
        )}
      </div>
    </section>
  );
}
