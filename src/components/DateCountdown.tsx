'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Gift, Star, Sparkles, Baby, Moon, Sun } from 'lucide-react';

interface SpecialDate {
  name: string;
  date: Date;
  icon: React.ElementType;
  color: string;
}

function calcDate(month: number, day: number, year: number) {
  const d = new Date(year, month - 1, day);
  if (d.getTime() < Date.now()) d.setFullYear(year + 1);
  return d;
}

function secondSunday(month: number, year: number) {
  const first = new Date(year, month - 1, 1);
  const day = first.getDay();
  const offset = day === 0 ? 7 : 14 - day;
  return new Date(year, month - 1, offset);
}

function secondSundayNext(month: number, year: number) {
  const d = secondSunday(month, year);
  if (d.getTime() < Date.now()) return secondSunday(month, year + 1);
  return d;
}

function easterDate(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function daysBetween(a: Date, b: Date) {
  return Math.ceil((b.getTime() - a.getTime()) / 86400000);
}

export default function DateCountdown() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const tick = () => setToday(new Date());
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  const year = today.getFullYear();

  const allDates: SpecialDate[] = [
    { name: 'Dia das Mães', date: secondSundayNext(5, year), icon: Heart, color: '#f472b6' },
    { name: 'Dia dos Namorados', date: calcDate(6, 12, year), icon: Heart, color: '#ec4899' },
    { name: 'Dia dos Pais', date: secondSundayNext(8, year), icon: Star, color: '#38bdf8' },
    { name: 'Dia das Crianças', date: calcDate(10, 12, year), icon: Baby, color: '#fbbf24' },
    { name: 'Natal', date: calcDate(12, 25, year), icon: Gift, color: '#ef4444' },
    { name: 'Ano Novo', date: calcDate(1, 1, year + 1), icon: Sparkles, color: '#a78bfa' },
    { name: 'Páscoa', date: (() => { const e = easterDate(year); return e.getTime() < Date.now() ? easterDate(year + 1) : e; })(), icon: Calendar, color: '#22c55e' },
    { name: 'Volta às Aulas', date: calcDate(2, 5, year), icon: Star, color: '#0ea5e9' },
    { name: 'Carnaval', date: (() => { const e = easterDate(year); const c = new Date(e); c.setDate(c.getDate() - 47); return c.getTime() < Date.now() ? (() => { const e2 = easterDate(year + 1); const c2 = new Date(e2); c2.setDate(c2.getDate() - 47); return c2; })() : c; })(), icon: Sun, color: '#f97316' },
    { name: 'Dia Internacional da Mulher', date: (() => { const d = new Date(year, 2, 8); if (d.getTime() < Date.now()) d.setFullYear(year + 1); return d; })(), icon: Sparkles, color: '#e11d48' },
  ];

  const sorted = allDates
    .map(d => ({ ...d, days: daysBetween(today, d.date) }))
    .filter(d => d.days >= 0)
    .sort((a, b) => a.days - b.days)
    .slice(0, 10);

  return (
    <section className="relative py-20 md:py-28 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Moon size={12} className="text-pink-500" />
            <span className="text-[10px] font-light text-pink-600 tracking-[0.12em] uppercase">Faltam Pouco</span>
          </div>
          <h2 className="section-title">Próximas Datas</h2>
          <div className="section-title-decoration">
            <span className="line" /><span className="ornament">✦</span><span className="line" />
          </div>
          <p className="section-subtitle">Não deixe para última hora! Prepare seu presente com carinho.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4">
          {sorted.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-4 sm:p-5 text-center card-hover group"
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: `${d.color}18` }}
              >
                <d.icon size={18} style={{ color: d.color }} />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-[#111] mb-2 leading-tight">{d.name}</h3>
              <div className="text-xl sm:text-2xl font-light text-[#111] mb-1">
                {d.days}
              </div>
              <div className="text-[9px] sm:text-[10px] font-light text-[#999] uppercase tracking-[0.1em]">
                {d.days === 1 ? 'dia' : 'dias'}
              </div>
              <div className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] text-text-secondary/40">
                {d.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
