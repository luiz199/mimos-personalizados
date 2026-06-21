'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, ShoppingBag, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { openWhatsapp } from '@/lib/whatsapp';
import { getPlaceholderColors } from '@/lib/placeholders';
import { useCart } from '@/lib/cart';

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
  const { add } = useCart();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const isFullUrl = p.image && (p.image.startsWith('http') || p.image.startsWith('data:image/jpeg') || p.image.startsWith('data:image/png'));
  const imgUrl = p.image ? (isFullUrl ? p.image : `${origin}${p.image}`) : '';
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://mimos-personalizados-tan.vercel.app'}/?p=${p.id}`;
  const [c1, c2, c3] = getPlaceholderColors(p.subcategory);
  const initial = p.name.charAt(0).toUpperCase();
  const hasRealImage = !!p.image && isFullUrl;

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
        {hasRealImage ? (
          <img src={imgUrl} alt={p.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }}
          >
            <span className="text-6xl sm:text-7xl font-light text-white/70 select-none">{initial}</span>
            <span className="text-xs text-white/50 mt-2 px-4 text-center select-none">
              {p.name.length > 25 ? p.name.slice(0, 22) + '...' : p.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
        <div className="flex gap-2">
          <button onClick={e => { e.stopPropagation(); add(p) }}
            className="flex-1 btn-secondary justify-center text-sm py-2.5"
          >
            <ShoppingBag size={15} />
            Carrinho
          </button>
          <button onClick={e => { e.stopPropagation(); openWhatsapp(p.name, p.price, productUrl, imgUrl); }}
            className="flex-1 btn-primary justify-center text-sm py-2.5"
          >
            <ShoppingCart size={15} />
            Comprar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
