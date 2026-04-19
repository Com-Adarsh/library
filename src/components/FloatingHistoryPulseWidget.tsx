import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Zap, ChevronRight, Calendar } from 'lucide-react';

interface HistoryEvent {
  date: string;
  title: string;
  description: string;
  year: number;
}

interface ScienceNews {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
}

export default function FloatingHistoryPulseWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock data - will be replaced with real data
  const historyEvents: HistoryEvent[] = [
    {
      date: 'January 26',
      title: 'Republic Day',
      description: 'Celebrating India\'s constitution and democratic values',
      year: 1950
    },
    {
      date: 'January 30',
      title: 'Martyr\'s Day',
      description: 'Remembering Mahatma Gandhi\'s sacrifice for freedom',
      year: 1948
    }
  ];

  const scienceNews: ScienceNews[] = [
    {
      id: '1',
      title: 'Breakthrough in Quantum Computing',
      source: 'Nature',
      timeAgo: '2h ago',
      category: 'Physics'
    },
    {
      id: '2',
      title: 'New Species Discovered in Kerala',
      source: 'Science Daily',
      timeAgo: '4h ago',
      category: 'Biology'
    }
  ];

  const todayEvent = historyEvents.find(event =>
    event.date === new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  );

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-gray/20 p-6 w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-navy font-inter">Today in History</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-gray/10 rounded-full transition-colors"
              >
                <ChevronRight size={20} className="text-slate-gray" />
              </button>
            </div>

            {/* History Section */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-crimson/10 rounded-lg">
                  <Calendar className="text-crimson" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-navy mb-1">
                    {todayEvent ? todayEvent.title : 'Historical Event'}
                  </h4>
                  <p className="text-sm text-slate-gray mb-2">
                    {todayEvent ? todayEvent.description : 'No significant event today'}
                  </p>
                  <span className="text-xs text-emerald-600 font-medium">
                    {todayEvent ? todayEvent.year : '2024'}
                  </span>
                </div>
              </div>
            </div>

            {/* Science Pulse Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-emerald-500" size={20} />
                <h4 className="font-semibold text-slate-navy">Science Pulse</h4>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
              </div>

              <div className="space-y-3">
                {scienceNews.map((news, index) => (
                  <motion.div
                    key={news.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-gradient-to-r from-emerald-50 to-transparent rounded-lg border border-emerald-100/50 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                        {news.category}
                      </span>
                      <span className="text-xs text-slate-gray">{news.timeAgo}</span>
                    </div>
                    <h5 className="text-sm font-medium text-slate-navy mb-1 line-clamp-2">
                      {news.title}
                    </h5>
                    <span className="text-xs text-slate-gray">{news.source}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-crimson to-slate-navy text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <History size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}