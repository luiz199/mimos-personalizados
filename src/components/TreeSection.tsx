'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';

interface Leaf {
  x: number; y: number; size: number; speed: number; angle: number;
  rotation: number; rotationSpeed: number; opacity: number; color: string;
  windOffset: number;
}

interface Flower {
  x: number; y: number; size: number; speed: number; opacity: number;
  phase: number; rotation: number; color: string;
}

export default function TreeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f9a8d4', '#f472b6', '#7dd3fc', '#fde68a', '#e0f2fe', '#fce7f3', '#c4b5fd', '#fbcfe8', '#bfdbfe'];

    const leaves: Leaf[] = [];
    for (let i = 0; i < 70; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 9,
        speed: 0.5 + Math.random() * 1.0,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.06,
        opacity: 0.3 + Math.random() * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        windOffset: Math.random() * 1000,
      });
    }

    const flowerColors = ['#f9a8d4', '#f472b6', '#fbcfe8', '#fda4af', '#fecdd3', '#e9d5ff', '#f0abfc'];
    const flowers: Flower[] = [];
    for (let i = 0; i < 25; i++) {
      flowers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 5 + Math.random() * 8,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      });
    }

    function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      const petals = 5;
      const petalSize = size * 0.4;
      const centerSize = size * 0.15;

      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2;
        const px = Math.cos(angle) * size * 0.5;
        const py = Math.sin(angle) * size * 0.5;

        ctx.beginPath();
        ctx.ellipse(px, py, petalSize, petalSize * 0.65, angle, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(0, 0, centerSize, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, centerSize * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      ctx.restore();
    }

    let time = 0;
    let animId: number;
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const wind = Math.sin(time * 0.5) * 0.8;

      leaves.forEach(l => {
        l.y += l.speed;
        l.x += Math.sin(l.angle + l.windOffset * 0.01) * 0.4 + wind * 0.3;
        l.angle += 0.02;
        l.rotation += l.rotationSpeed;

        if (l.y > canvas.height + 15) {
          l.y = -15;
          l.x = Math.random() * canvas.width;
          l.color = colors[Math.floor(Math.random() * colors.length)];
        }
        if (l.x < -15) l.x = canvas.width + 15;
        if (l.x > canvas.width + 15) l.x = -15;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = l.opacity;
        ctx.fillStyle = l.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, l.size * 0.6, l.size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      flowers.forEach(f => {
        f.y += f.speed * 0.5;
        f.x += Math.sin(time * 0.8 + f.phase) * 0.5;
        f.rotation += 0.01;
        f.opacity = 0.4 + Math.sin(time + f.phase) * 0.2;

        if (f.y > canvas.height + 20) {
          f.y = -20;
          f.x = Math.random() * canvas.width;
        }
        if (f.x < -20) f.x = canvas.width + 20;
        if (f.x > canvas.width + 20) f.x = -20;

        drawFlower(ctx, f.x, f.y, f.size, f.color, Math.max(0, f.opacity), f.rotation);
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      <div className="absolute inset-0 bg-gradient-to-b from-pastel-pink/40 via-pastel-blue/20 to-transparent z-0" />

      <div className="absolute top-10 left-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-[80px] animate-pulse pointer-events-none"
        style={{ transform: `translate(${mouse.x * -0.5}px, ${mouse.y * -0.5}px)` }} />
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none"
        style={{ transform: `translate(${mouse.x * 0.5}px, ${mouse.y * -0.3}px)` }} />
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-300/20 rounded-full blur-[70px] animate-pulse delay-1000 pointer-events-none"
        style={{ transform: `translate(${mouse.x * -0.3}px, ${mouse.y * 0.5}px)` }} />
      <div className="absolute top-1/3 right-1/5 w-36 h-36 bg-yellow-200/15 rounded-full blur-[60px] animate-pulse delay-500 pointer-events-none"
        style={{ transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.3}px)` }} />
      <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-pink-200/20 rounded-full blur-[50px] animate-pulse delay-300 pointer-events-none"
        style={{ transform: `translate(${mouse.x * -0.6}px, ${mouse.y * -0.4}px)` }} />

      <motion.div
        className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.div
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Sparkles size={12} className="text-pink-400" />
          <span className="text-[10px] font-light text-[#888] tracking-[0.15em] uppercase">Personalizados com Amor</span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 tracking-tight"
          style={{ fontWeight: 400, letterSpacing: '-0.02em', color: '#111' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite]"
            style={{ backgroundSize: '200% auto' }}>
            Mimos
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 300, letterSpacing: '0.08em', color: '#555', marginTop: '0.2rem' }}>
            & Personalizados
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-text-secondary/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Transformamos momentos especiais em lembranças inesquecíveis.
          <br />
          <span className="text-pink-500 font-medium">Cada detalhe feito com carinho para você.</span>
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <a href="#ofertas" className="btn-primary text-base px-8 py-4 group">
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            Ver Ofertas
          </a>
          <a href="#mimos" className="btn-secondary text-base px-8 py-4 group">
            Ver Mimos
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} className="text-pink-400/60" />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
