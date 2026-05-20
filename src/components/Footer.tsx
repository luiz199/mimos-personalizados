'use client';
import { Heart, ShoppingBag, Camera, Globe, Play, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-6 px-4">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-100/40 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <span className="text-base font-normal tracking-[0.08em] uppercase text-[#111]">
                Mimos & Personalizados AC
              </span>
            </div>
            <p className="text-text-secondary/70 text-sm leading-relaxed">
              Transformamos momentos especiais em lembranças inesquecíveis.
              Cada produto é feito com carinho e dedicação para você.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-text-primary mb-4">Links Rápidos</h4>
            <div className="space-y-2">
              {[
                { href: '#ofertas', label: 'Ofertas' },
                { href: '#mimos', label: 'Mimos' },
                { href: '#datas', label: 'Datas Comemorativas' },
                { href: '#sobre', label: 'Sobre Nós' },
                { href: '/admin', label: 'Admin' },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="block text-sm text-text-secondary/70 hover:text-pink-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-text-primary mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-text-secondary/70">
              <a href="https://wa.me/5568999548146" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-500 font-bold text-xs">W</span>
                </span>
                (68) 99954-8146
              </a>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail size={14} className="text-blue-500" />
                </span>
                contato@mimosac.com.br
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <MapPin size={14} className="text-pink-500" />
                </span>
                Rio Branco, AC
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {[
                { icon: Camera, color: 'text-pink-500', href: 'https://instagram.com' },
                { icon: Globe, color: 'text-blue-500', href: 'https://facebook.com' },
                { icon: Play, color: 'text-red-500', href: 'https://youtube.com' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full glass flex items-center justify-center ${s.color} hover:bg-white/60 transition-all hover:scale-110`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-pink-200/40 pt-6 text-center">
          <p className="text-xs text-text-secondary/50 flex items-center justify-center gap-1">
            Feito com <Heart size={12} className="text-pink-400" /> por Mimos & Personalizados AC
            <span className="mx-2">·</span>
            Todos os direitos reservados {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
