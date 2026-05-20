'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bell } from 'lucide-react';

export default function Newsletter() {
  const [done, setDone] = useState(false);
  const [phone, setPhone] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de receber novidades e ofertas da Mimos & Personalizados AC. Meu WhatsApp é: ${phone}`;
    window.open(`https://wa.me/5568999548146?text=${encodeURIComponent(msg)}`, '_blank');
    setDone(true);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section className="relative py-20 md:py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-transparent to-blue-50/30 pointer-events-none" />
      <div className="max-w-lg mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center mx-auto mb-5">
            <Bell size={22} className="text-pink-500" />
          </div>
          <h2 className="text-xl font-normal text-[#111] mb-2 tracking-[-0.01em]">Receba Novidades</h2>
          <p className="text-sm text-text-secondary/70 mb-6 leading-relaxed">
            Cadastre seu WhatsApp e seja a primeira a saber de lançamentos e ofertas especiais!
          </p>
          <form onSubmit={submit} className="flex gap-2 max-w-sm mx-auto">
            <input type="tel" value={phone} required
              onChange={e => setPhone(e.target.value)}
              placeholder="(68) 99999-0000"
              className="flex-1 px-4 py-2.5 rounded-full bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm text-center"
            />
            <button type="submit"
              className="px-5 py-2.5 rounded-full bg-[#111] text-white text-sm font-normal hover:bg-[#333] transition-colors flex items-center gap-1.5"
            >
              {done ? '✓ Enviado' : <><Send size={14} /> Enviar</>}
            </button>
          </form>
          <p className="text-[10px] text-text-secondary/40 mt-3">Prometemos não enviar spam. Apenas ofertas especiais!</p>
        </motion.div>
      </div>
    </section>
  );
}
