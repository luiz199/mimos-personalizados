'use client';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const PHONE = '5568999548146';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full bg-green-500 shadow-xl flex items-center justify-center hover:bg-green-600 transition-colors"
    >
      <MessageCircle size={24} className="text-white" />
    </motion.a>
  );
}
