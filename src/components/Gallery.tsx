'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon, Heart } from 'lucide-react';
import { getProducts } from '@/lib/products';
import type { Product } from '@/lib/products';

export default function Gallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const all = getProducts().filter(p => p.image);
    if (all.length === 0) {
      setProducts(getProducts().slice(0, 6).map((p, i) => ({
        ...p, image: '',
      })));
    } else {
      setProducts(all);
    }
  }, []);

  const open = (i: number) => { setCurrent(i); setModalOpen(true); };
  const next = () => setCurrent(c => (c + 1) % products.length);
  const prev = () => setCurrent(c => (c - 1 + products.length) % products.length);

  return (
    <section className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-transparent to-blue-50/20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-4">
            <Heart size={14} className="text-pink-500" />
            <span className="text-sm font-medium text-pink-600">Nossos Trabalhos</span>
          </div>
          <h2 className="section-title">Galeria</h2>
          <p className="section-subtitle">
            Veja alguns dos nossos produtos personalizados em detalhes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => open(i)}
              className="group relative aspect-square rounded-xl overflow-hidden glass card-hover"
            >
              {p.image ? (
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pastel-pink to-pastel-blue flex items-center justify-center">
                  <ImageIcon size={32} className="text-white/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-[#111] text-xs font-medium truncate">{p.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full glass-strong rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-[#111] hover:bg-black/50 transition-colors"
              >
                <X size={16} />
              </button>
              <div className="relative aspect-video bg-gradient-to-br from-pastel-pink/40 to-pastel-blue/40 flex items-center justify-center">
                {products[current]?.image ? (
                  <img src={products[current].image} alt={products[current].name}
                    className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon size={64} className="text-pink-300/40" />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-text-primary mb-1">{products[current]?.name}</h3>
                <p className="text-sm text-text-secondary/70">{products[current]?.description}</p>
              </div>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-pink-500 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-pink-500 shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
