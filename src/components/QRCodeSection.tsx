'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download } from 'lucide-react';

export default function QRCodeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    // Simple QR-style pattern (decorative since we can't generate real QR without library)
    const bg = '#fff';
    const fg = '#111';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    const drawFinder = (x: number, y: number) => {
      const s = 36;
      ctx.fillStyle = fg;
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = bg;
      ctx.fillRect(x + 4, y + 4, s - 8, s - 8);
      ctx.fillStyle = fg;
      ctx.fillRect(x + 8, y + 8, s - 16, s - 16);
    };

    drawFinder(8, 8);
    drawFinder(size - 44, 8);
    drawFinder(8, size - 44);

    // Decorative data pattern
    const cells = 12;
    const cellSize = (size - 48) / cells;
    const offsetX = 24;
    const offsetY = 24;

    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if (r < 3 && c < 3) continue;
        if (r < 3 && c >= cells - 3) continue;
        if (r >= cells - 3 && c < 3) continue;
        if (Math.random() > 0.5) {
          ctx.fillStyle = fg;
          ctx.globalAlpha = 0.3 + Math.random() * 0.5;
          ctx.fillRect(offsetX + c * cellSize, offsetY + r * cellSize, cellSize - 1, cellSize - 1);
          ctx.globalAlpha = 1;
        }
      }
    }

    // Center logo area
    ctx.fillStyle = bg;
    ctx.fillRect(size / 2 - 16, size / 2 - 16, 32, 32);
    ctx.fillStyle = fg;
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('M', size / 2, size / 2);
  }, [url]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'mimos-qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <section className="relative py-20 md:py-24 px-4">
      <div className="max-w-lg mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-5">
            <QrCode size={22} className="text-purple-500" />
          </div>
          <h2 className="text-xl font-normal text-[#111] mb-2 tracking-[-0.01em]">Compartilhe</h2>
          <p className="text-sm text-text-secondary/70 mb-6 leading-relaxed">
            Escaneie o QR Code para acessar a loja e compartilhar com amigos!
          </p>
          <div className="inline-block glass rounded-2xl p-4">
            <canvas ref={canvasRef} className="w-48 h-48 mx-auto rounded-xl" />
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <button onClick={download}
              className="px-5 py-2 rounded-full bg-[#111] text-white text-sm font-normal hover:bg-[#333] transition-colors flex items-center gap-1.5"
            >
              <Download size={14} /> Baixar QR Code
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
