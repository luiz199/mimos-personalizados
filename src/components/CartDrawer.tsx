'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, MessageCircle, Plus, Minus, Tag, CheckCircle2, XCircle, Loader2, ImageIcon } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { getPlaceholderColors } from '@/lib/placeholders';

const PHONE = '5568999548146';
const SITE = 'https://mimos-personalizados-tan.vercel.app';

export default function CartDrawer() {
  const { items, count, add, remove, clear, total } = useCart();
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
  const [couponMsg, setCouponMsg] = useState('');

  const discount = total * (couponDiscount / 100);
  const finalTotal = total - discount;

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponStatus('loading');
    try {
      const res = await fetch('/api/coupons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() }),
      });
      const data = await res.json();
      if (data.valid) {
        setCouponDiscount(data.discount);
        setCouponStatus('valid');
        setCouponMsg(`Cupom aplicado! ${data.discount}% de desconto`);
      } else {
        setCouponDiscount(0);
        setCouponStatus('invalid');
        setCouponMsg(data.error || 'Cupom inválido');
      }
    } catch {
      setCouponDiscount(0);
      setCouponStatus('invalid');
      setCouponMsg('Erro ao validar cupom');
    }
  };

  const sendWhatsApp = () => {
    let msg = 'Olá, tenho interesse nos seguintes produtos:\n\n';
    items.forEach(i => {
      const link = `${SITE}/?p=${i.id}`;
      msg += `• ${i.name}${i.quantity > 1 ? ` (${i.quantity}x)` : ''} - R$ ${(i.price * i.quantity).toFixed(2)}\n  ${link}\n`;
      if (i.image && i.image.startsWith('http')) {
        msg += `  é Imagem: ${i.image}\n`;
      }
    });
    if (couponDiscount > 0) {
      msg += `\nCupom: ${couponCode.toUpperCase()} (${couponDiscount}% off)`;
    }
    msg += `\n\nTotal: R$ ${finalTotal.toFixed(2)}\n\nPoderia me passar mais informações?`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    clear();
    setCouponCode('');
    setCouponDiscount(0);
    setCouponStatus('idle');
    setCouponMsg('');
    setOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/90 shadow-xl rounded-full px-5 py-3 flex items-center gap-2 hover:bg-white transition-colors"
      >
        <ShoppingBag size={18} className="text-pink-500" />
        <span className="text-sm font-medium text-text-primary">Carrinho</span>
        {count > 0 && (
          <span className="bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[80vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-pink-100">
                <h2 className="text-lg font-medium text-text-primary flex items-center gap-2">
                  <ShoppingBag size={18} className="text-pink-500" />
                  Carrinho ({count})
                </h2>
                <button onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center"
                ><X size={16} className="text-pink-500" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {items.length === 0 ? (
                  <p className="text-center text-sm text-text-secondary/50 py-10">Carrinho vazio</p>
                ) : (
                  items.map(i => (
                    <div key={i.id} className="flex items-center gap-3 bg-pink-50/50 rounded-xl p-3">
                      <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {i.image && (i.image.startsWith('http') || i.image.startsWith('data:image/jpeg') || i.image.startsWith('data:image/png')) ? (
                          <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                        ) : (
                          (() => {
                            const [c1, c2, c3] = getPlaceholderColors(i.subcategory);
                            return (
                              <div className="w-full h-full flex items-center justify-center"
                                style={{ background: `linear-gradient(135deg, ${c1}, ${c2}, ${c3})` }}
                              >
                                <span className="text-xs font-bold text-white/80">{i.name.charAt(0)}</span>
                              </div>
                            );
                          })()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-text-primary truncate">{i.name}</p>
                        <p className="text-[10px] text-text-secondary/50">R$ {i.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { const p = { ...i }; remove(i.id); if (i.quantity > 1) add(p) }}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                        ><Minus size={10} className="text-pink-400" /></button>
                        <span className="text-xs font-medium w-5 text-center">{i.quantity}</span>
                        <button onClick={() => add(i)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                        ><Plus size={10} className="text-pink-400" /></button>
                      </div>
                      <button onClick={() => remove(i.id)}
                        className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      ><Trash2 size={12} className="text-red-400" /></button>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 border-t border-pink-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input type="text" value={couponCode}
                        onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponStatus('idle'); setCouponMsg(''); }}
                        placeholder="Cupom de desconto"
                        className="w-full px-3 py-2 rounded-xl bg-pink-50/50 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-xs pr-8"
                        disabled={couponStatus === 'valid'}
                      />
                      {couponStatus === 'valid' && (
                        <CheckCircle2 size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                    <button onClick={applyCoupon} disabled={couponStatus === 'loading' || couponStatus === 'valid' || !couponCode.trim()}
                      className="px-3 py-2 rounded-xl bg-pink-500 text-white text-xs font-medium hover:bg-pink-600 disabled:opacity-40 transition-colors flex items-center gap-1"
                    >
                      {couponStatus === 'loading' ? <Loader2 size={12} className="animate-spin" /> : <Tag size={12} />}
                      Aplicar
                    </button>
                  </div>
                  {couponStatus === 'valid' && (
                    <p className="text-[10px] text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={10} /> {couponMsg}
                    </p>
                  )}
                  {couponStatus === 'invalid' && (
                    <p className="text-[10px] text-red-500 flex items-center gap-1">
                      <XCircle size={10} /> {couponMsg}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Subtotal</span>
                    <span className="text-sm text-text-secondary">R$ {total.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Desconto ({couponDiscount}%)</span>
                      <span className="text-sm text-green-600">- R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-pink-100 pt-2">
                    <span className="text-sm font-medium text-text-primary">Total</span>
                    <span className="text-lg font-medium text-text-primary">R$ {finalTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={sendWhatsApp}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle size={16} />
                    Enviar tudo no WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
