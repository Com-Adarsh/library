import { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  headline: string;
  timestamp: string;
}

const TICKER_NEWS: NewsItem[] = [
  {
    id: '1',
    headline: '🔬 Physics Breakthrough: New discovery in quantum computing at CERN',
    timestamp: '2 mins ago'
  },
  {
    id: '2',
    headline: '🌍 Climate Action: India leads renewable energy expansion',
    timestamp: '15 mins ago'
  },
  {
    id: '3',
    headline: '📚 Education: Free digital libraries reach 1M students',
    timestamp: '30 mins ago'
  },
  {
    id: '4',
    headline: '🧬 Biology: New treatment breakthrough in genetic diseases',
    timestamp: '45 mins ago'
  },
  {
    id: '5',
    headline: '⚡ Technology: Open source solar project gets 100K downloads',
    timestamp: '1 hour ago'
  },
];

export default function NewsTicker() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setDisplayIndex((prev) => (prev + 1) % TICKER_NEWS.length);
    }, 8000); // Change headline every 8 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="bg-gradient-to-r from-crimson/20 to-emerald/20 border border-crimson/30 rounded-lg px-4 py-3 mt-8 max-w-2xl mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-3 min-h-[40px]">
        {/* Live Indicator */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xs font-bold text-crimson uppercase tracking-wider">LIVE</span>
          <span className="w-2 h-2 bg-crimson rounded-full animate-pulse"></span>
        </div>

        {/* Ticker Content */}
        <div className="flex-1">
          <div className="relative overflow-hidden">
            {/* Animated text container */}
            <div
              className="transition-all duration-500"
              style={{
                transform: `translateY(-${displayIndex * 100}%)`,
                opacity: 1,
              }}
            >
              {TICKER_NEWS.map((item) => (
                <div key={item.id} className="h-10 flex items-center">
                  <p className="text-sm text-slate-700 font-medium truncate">
                    {item.headline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {TICKER_NEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setDisplayIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === displayIndex ? 'bg-crimson w-4' : 'bg-slate-300 w-2'
              }`}
              title={`Go to headline ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
