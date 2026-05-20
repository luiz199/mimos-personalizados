'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Camera, Globe, Moon, Sun } from 'lucide-react';

const navLinks = [
  { href: '#ofertas', label: 'Ofertas' },
  { href: '#mimos', label: 'Mimos' },
  { href: '#datas', label: 'Datas' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('mimos-dark') === 'true';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('mimos-dark', String(next));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-blue-400 flex items-center justify-center shadow-lg group-hover:shadow-pink-300/50 transition-shadow">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-normal tracking-[0.08em] uppercase text-[#111] dark:text-[#111] leading-tight">
                Mimos & Personalizados
              </span>
              <span className="block text-[9px] font-light text-[#888] dark:text-[#666] tracking-[0.25em] uppercase">AC</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="px-4 py-2 rounded-full text-xs font-light tracking-[0.05em] text-[#888] dark:text-[#666] hover:text-[#111] dark:hover:text-[#111] hover:bg-pink-50/60 dark:hover:bg-white/10 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggleDark}
              className="p-2.5 rounded-full hover:bg-pink-50 dark:hover:bg-white/10 text-[#888] dark:text-[#555] transition-colors touch-manipulation"
              title={dark ? 'Modo Claro' : 'Modo Escuro'}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="https://wa.me/5568999548146" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-full text-xs font-semibold transition-all shadow-lg shadow-green-200/40 hover:shadow-green-300/50 touch-manipulation"
            >
              <span>WhatsApp</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full hover:bg-pink-50 dark:hover:bg-white/10 text-pink-500 transition-colors touch-manipulation"
            ><Camera size={18} /></a>

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-pink-50 dark:hover:bg-white/10 text-pink-500 transition-colors touch-manipulation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong overflow-hidden border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-1.5">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3.5 rounded-xl text-sm font-light tracking-[0.05em] text-[#888] dark:text-[#666] hover:text-[#111] dark:hover:text-[#111] hover:bg-pink-50/60 dark:hover:bg-white/10 transition-all touch-manipulation"
                >
                  {link.label}
                </a>
              ))}
              <a href="https://wa.me/5568999548146" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-3.5 rounded-xl text-sm font-semibold touch-manipulation"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
