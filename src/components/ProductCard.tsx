'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { openWhatsapp } from '@/lib/whatsapp';
import { generatePlaceholder } from '@/lib/placeholders';

interface Props {
  product: Product;
  index?: number;
  showOffer?: boolean;
  onView?: (product: Product) => void;
}

const categoryLabels: Record<string, string> = {
  'canecas': 'Canecas', 'cadernetas': 'Cadernetas', 'lembrancinhas': 'Lembrancinhas',
  'caixas': 'Caixas', 'topos-bolo': 'Topos de Bolo', 'agendas': 'Agendas',
  'kits': 'Kits', 'dia-das-maes': 'Dia das Mães', 'dia-dos-pais': 'Dia dos Pais',
  'pascoa': 'Páscoa', 'natal': 'Natal', 'ano-novo': 'Ano Novo',
  'dia-das-criancas': 'Dia das Crianças', 'festa-junina': 'Festa Junina',
  'cha-revelacao': 'Chá Revelação', 'casamento': 'Casamento', 'aniversario': 'Aniversário',
};

export default function ProductCard({ product, index = 0, showOffer, onView }: Props) {
  const p = product;
  const imgSrc = p.image || generatePlaceholder(p.name, p.subcategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="card-hover group relative glass rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      onClick={() => onView?.(p)}
    >
      {(p.isOffer || showOffer) && (
        <div className="absolute top-3 right-3 z-10">
          <span className="tag tag-pink flex items-center gap-1 shadow-lg">
            <Sparkles size={12} /> Oferta
          </span>
        </div>
      )}
      <div className="relative h-48 sm:h-56 flex items-center justify-center overflow-hidden">
        <img src={imgSrc} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {p.subcategory && (
          <span className={`tag mb-2 self-start ${
            p.subcategory === 'canecas' ? 'tag-pink' :
            p.subcategory === 'cadernetas' ? 'tag-blue' :
            p.subcategory === 'kits' || p.subcategory === 'caixas' ? 'tag-purple' :
            p.subcategory === 'topos-bolo' || p.subcategory === 'agendas' ? 'tag-yellow' :
            'tag-green'
          }`}>
            {categoryLabels[p.subcategory] || p.subcategory}
          </span>
        )}
        <h3 className="font-medium text-sm sm:text-base mb-1.5 text-text-primary leading-tight">{p.name}</h3>
        <p className="text-xs sm:text-sm text-text-secondary/70 mb-3 line-clamp-2 leading-relaxed flex-1">{p.description}</p>
        <div className="flex items-baseline gap-2 mb-4">
          {p.oldPrice && <span className="product-old-price">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>}
          <span className="text-base sm:text-lg font-light text-[#111]">R$ {p.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <button onClick={e => { e.stopPropagation(); openWhatsapp(p.name, p.price, p.image); }}
          className="w-full btn-primary justify-center text-sm py-3"
        >
          <ShoppingCart size={16} />
          Comprar
        </button>
      </div>
    </motion.div>
  );
}
