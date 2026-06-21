'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ShoppingBag, Share2, ImageIcon } from 'lucide-react';
import type { Product } from '@/lib/products';
import { openWhatsapp } from '@/lib/whatsapp';
import { generatePlaceholder } from '@/lib/placeholders';
import ShareButtons from './ShareButtons';
import { useCart } from '@/lib/cart';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { add } = useCart();
  if (!product) return null;

  const imgSrc = product.image || generatePlaceholder(product.name, product.subcategory);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            className="glass-strong rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-pastel-pink/40 to-pastel-blue/40 flex items-center justify-center">
                {product.image ? (
                  <img src={imgSrc} alt={product.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center">
                    <ImageIcon size={48} className="text-pink-300/40 mb-2" />
                    <span className="text-xs text-pink-300/50 font-medium">{product.name}</span>
                  </div>
                )}
              </div>
              <button onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur flex items-center justify-center text-[#111] hover:bg-black/40 transition-colors"
              ><X size={16} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-medium text-text-primary">{product.name}</h3>
                  <p className="text-sm text-text-secondary/70 mt-1 leading-relaxed">{product.description}</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-5">
                {product.oldPrice && (
                  <span className="product-old-price">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
                )}
                <span className="text-2xl font-light text-[#111]">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => add(product)}
                  className="flex-1 btn-secondary justify-center py-3 text-sm"
                >
                  <ShoppingBag size={16} /> Carrinho
                </button>
                <button onClick={() => openWhatsapp(product.name, product.price, product.image)}
                  className="flex-1 btn-primary justify-center py-3 text-sm"
                >
                  <ShoppingCart size={16} /> Comprar
                </button>
                <ShareButtons product={product} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
