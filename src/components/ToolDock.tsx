import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function ToolDock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-4 bg-white/95 backdrop-blur-lg rounded-full shadow-2xl border border-slate-gray/20 px-6 py-3">
        <Link href="/upload">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-crimson text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <Upload size={20} />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
