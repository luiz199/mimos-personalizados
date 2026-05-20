'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, meu nome é ${form.name}.\n${form.message}\n\nMeu email: ${form.email}`;
    window.open(`https://wa.me/5568999548146?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contato" className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/20 via-transparent to-blue-50/20 pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Contato</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
          <p className="section-subtitle">Entre em contato conosco</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Seu Nome</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                  placeholder="Digite seu nome" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Seu Email</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm"
                  placeholder="Digite seu email" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Mensagem</label>
                <textarea required value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-pink-200/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-sm resize-none h-28"
                  placeholder="Digite sua mensagem..." />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-2.5 text-sm">
                {sent ? 'Mensagem Enviada ✓' : <><Send size={16} /> Enviar Mensagem</>}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-2xl p-6 flex-1">
              <h3 className="text-sm font-medium text-text-primary mb-4">Informações de Contato</h3>
              <div className="space-y-4">
                <a href="https://wa.me/5568999548146" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-secondary/80 hover:text-green-600 transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">W</span>
                  (68) 99954-8146
                </a>
                <div className="flex items-center gap-3 text-sm text-text-secondary/80">
                  <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Mail size={16} />
                  </span>
                  contato@mimosac.com.br
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary/80">
                  <span className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                    <MapPin size={16} />
                  </span>
                  Rio Branco, AC
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-pink-100">
                <p className="text-xs text-text-secondary/50 leading-relaxed">
                  Horário de atendimento:<br />
                  Seg a Sex: 8h às 18h<br />
                  Sáb: 9h às 13h
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
