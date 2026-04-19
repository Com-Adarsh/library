import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Globe, BookOpen, ExternalLink, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { getTodayInStruggle, HistoricalEvent } from '@/lib/revolutionary-calendar';

interface TodayInResistanceProps {
  className?: string;
}

export default function TodayInResistance({ className = '' }: TodayInResistanceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [todayEvents, setTodayEvents] = useState<ReturnType<typeof getTodayInStruggle>>({
    kerala: [],
    india: [],
    world: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch today's historical events
    const fetchTodayEvents = async () => {
      try {
        // Simulate API call delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));

        const events = getTodayInStruggle();
        setTodayEvents(events);
      } catch (error) {
        console.error('Error fetching historical events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayEvents();
  }, []);

  const allEvents = [...todayEvents.kerala, ...todayEvents.india, ...todayEvents.world];
  const hasEvents = allEvents.length > 0;

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-amber-50 to-crimson/5 border-2 border-crimson/30 rounded-xl p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-crimson/20 rounded-full animate-pulse"></div>
          <div className="h-6 bg-crimson/20 rounded w-48 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-amber-50 via-crimson/5 to-slate-50 border-2 border-crimson rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-crimson to-crimson/80 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="w-8 h-8" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold font-inter">This Day in Resistance</h2>
              <p className="text-crimson-100 text-sm">
                Revolutionary history for {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {hasEvents ? (
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Kerala Events */}
                {todayEvents.kerala.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-navy mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      Kerala Struggle
                    </h3>
                    <div className="space-y-3">
                      {todayEvents.kerala.map((event, index) => (
                        <HistoricalEventCard key={event.id} event={event} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* India Events */}
                {todayEvents.india.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-navy mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      Indian Struggle
                    </h3>
                    <div className="space-y-3">
                      {todayEvents.india.map((event, index) => (
                        <HistoricalEventCard key={event.id} event={event} index={index} />
                      ))}
                    </div>
                  </div>
                )}

                {/* World Events */}
                {todayEvents.world.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-navy mb-3 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Global Struggle
                    </h3>
                    <div className="space-y-3">
                      {todayEvents.world.map((event, index) => (
                        <HistoricalEventCard key={event.id} event={event} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-slate-600 mb-4">
                  {allEvents.length} historical event{allEvents.length !== 1 ? 's' : ''} from the struggle for justice
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  {todayEvents.kerala.length > 0 && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <MapPin size={14} />
                      Kerala ({todayEvents.kerala.length})
                    </span>
                  )}
                  {todayEvents.india.length > 0 && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <MapPin size={14} />
                      India ({todayEvents.india.length})
                    </span>
                  )}
                  {todayEvents.world.length > 0 && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Globe size={14} />
                      World ({todayEvents.world.length})
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 mb-2">No recorded events for today</p>
            <p className="text-sm text-slate-500">
              The struggle continues every day. Check back tomorrow for more revolutionary history.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface HistoricalEventCardProps {
  event: HistoricalEvent;
  index: number;
}

function HistoricalEventCard({ event, index }: HistoricalEventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-md cursor-pointer ${
        event.location === 'kerala' ? 'border-emerald-300 bg-emerald-50/50' :
        event.location === 'india' ? 'border-amber-300 bg-amber-50/50' :
        'border-blue-300 bg-blue-50/50'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            event.location === 'kerala' ? 'bg-emerald-100 text-emerald-800' :
            event.location === 'india' ? 'bg-amber-100 text-amber-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {event.year}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            {event.location === 'kerala' ? 'Kerala' :
             event.location === 'india' ? 'India' :
             event.location === 'world' ? 'World' : event.location}
          </span>
        </div>
        <Clock className="w-4 h-4 text-slate-400" />
      </div>

      <h4 className="font-bold text-slate-navy mb-2 text-sm leading-tight">
        {event.title}
      </h4>

      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>

            {event.significance && (
              <div className="bg-white/70 rounded p-3 border-l-4 border-crimson">
                <p className="text-xs font-bold text-crimson mb-1">Historical Significance</p>
                <p className="text-sm text-slate-700">{event.significance}</p>
              </div>
            )}

            {event.organizations && event.organizations.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {event.organizations.map((org, idx) => (
                  <span key={idx} className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs">
                    {org}
                  </span>
                ))}
              </div>
            )}

            {event.learnMoreUrl && (
              <a
                href={event.learnMoreUrl}
                className="inline-flex items-center gap-2 text-crimson hover:text-crimson/80 text-sm font-medium transition-colors"
              >
                <BookOpen size={14} />
                Learn More in Library
                <ExternalLink size={12} />
              </a>
            )}
          </motion.div>
        ) : (
          <p className="text-sm text-slate-600 line-clamp-2">
            {event.description}
          </p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}