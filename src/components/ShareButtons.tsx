'use client';
import { Share2 } from 'lucide-react';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
}

export default function ShareButtons({ product }: Props) {
  const text = `Olha só que lindo este produto da Mimos & Personalizados AC:\n*${product.name}* - R$ ${product.price.toFixed(2).replace('.', ',')}`;
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text, url }); } catch {}
    }
  };

  return (
    <div className="flex gap-1.5">
      <button onClick={shareWhatsApp}
        className="w-11 h-11 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center justify-center"
        title="Compartilhar no WhatsApp"
      ><span className="text-sm font-bold">W</span></button>
      <button onClick={shareFacebook}
        className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center justify-center"
        title="Compartilhar no Facebook"
      ><span className="text-sm font-bold">f</span></button>
      <button onClick={shareTwitter}
        className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors flex items-center justify-center"
        title="Compartilhar no Twitter"
      ><span className="text-sm font-bold">X</span></button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button onClick={shareNative}
          className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-100 transition-colors flex items-center justify-center"
          title="Compartilhar"
        ><Share2 size={16} /></button>
      )}
    </div>
  );
}
