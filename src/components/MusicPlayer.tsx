'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Music } from 'lucide-react';

const LIKE_KEY = 'mimos-music-liked';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(LIKE_KEY) === 'true');
    fetch('/api/likes').then(r => r.json()).then(d => setLikes(d.count || 0)).catch(() => {});
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/musica.mp3');
      audioRef.current.loop = true;
    }
    if (playing) { audioRef.current.pause() } else { audioRef.current.play() }
    setPlaying(!playing);
  };

  const handleLike = async () => {
    const next = !liked;
    setLiked(next);
    setLikes(l => l + (next ? 1 : -1));
    localStorage.setItem(LIKE_KEY, String(next));
    try { await fetch('/api/likes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ liked: next }) }) } catch {}
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="glass-strong rounded-2xl p-4 shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center flex-shrink-0">
              <Music size={14} className="text-white" />
            </div>
            <div className="min-w-[100px]">
              <p className="text-xs font-medium text-text-primary">Mimos que Encantam</p>
              <p className="text-[10px] text-text-secondary/50">Música ambiente</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors"
              >
                {playing ? <Pause size={14} className="text-pink-600" /> : <Play size={14} className="text-pink-600" />}
              </button>
              <button onClick={handleLike}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 transition-colors"
              >
                <Heart size={12} className={liked ? 'fill-red-500 text-red-500' : 'text-pink-400'} />
                <span className="text-[10px] font-medium text-text-secondary">{likes}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-colors ${
          playing ? 'bg-pink-500' : 'bg-white/90'
        }`}
      >
        <Music size={18} className={playing ? 'text-white' : 'text-pink-500'} />
      </motion.button>
    </div>
  );
}
