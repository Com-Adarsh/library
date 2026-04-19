import React, { useState, useEffect, useCallback } from 'react';
import { Atom, FlaskConical, Dna, Zap, TrendingUp, Globe, Loader, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchGlobalSciencePulse, AggregatedNewsItem } from '@/lib/dynamic-news-service';

interface SciencePulseProps {
  limit?: number;
  showViewMore?: boolean;
}

export default function SciencePulse({ limit = 20, showViewMore = true }: SciencePulseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [news, setNews] = useState<AggregatedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(limit);

  const categories = [
    { id: 'all', name: 'All News', icon: Globe, keyword: 'all' },
    { id: 'physics', name: 'Physics', icon: Atom, keyword: 'physics' },
    { id: 'chemistry', name: 'Chemistry', icon: FlaskConical, keyword: 'chemistry' },
    { id: 'biology', name: 'Biology', icon: Dna, keyword: 'biology' },
    { id: 'photonics', name: 'Photonics', icon: Zap, keyword: 'photonics' },
    { id: 'data science', name: 'Data Science', icon: TrendingUp, keyword: 'data science' },
  ];

  const fetchNews = useCallback(async (category: string, articleLimit: number) => {
    try {
      setLoading(true);
      setError(null);

      const newsData = await fetchGlobalSciencePulse(category, articleLimit);
      setNews(newsData);
    } catch (err) {
      console.error('News fetch error:', err);
      setError('Unable to load news. Please try again later.');
      setNews([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    setCurrentLimit(limit);
    fetchNews(selectedCategory, limit);
  }, [selectedCategory, limit, fetchNews]);

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const newLimit = currentLimit + 20;
    setCurrentLimit(newLimit);
    fetchNews(selectedCategory, newLimit);
  };

  const handleRefresh = () => {
    setCurrentLimit(limit);
    fetchNews(selectedCategory, limit);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      physics: 'bg-blue-100 text-blue-800',
      chemistry: 'bg-red-100 text-red-800',
      biology: 'bg-green-100 text-green-800',
      photonics: 'bg-yellow-100 text-yellow-800',
      'data science': 'bg-purple-100 text-purple-800',
    };
    return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-12 bg-ghost-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-h2">Science Pulse</h2>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-full hover:bg-light-gray transition-colors disabled:opacity-50"
              title="Refresh news"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
          <p className="text-slate-gray">Real-time scientific discoveries and breakthroughs from multiple sources</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-medium transition flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-crimson text-white shadow-md'
                    : 'bg-white border border-light-gray text-slate-navy hover:border-crimson'
                }`}
              >
                <IconComponent size={18} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-amber-600" size={20} />
            <p className="text-amber-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-gray">
            <Loader className="animate-spin mb-4" size={32} />
            <p>Loading latest scientific news...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-slate-gray">
            <AlertCircle size={32} className="mx-auto mb-4 opacity-50" />
            <p>No news available for this category. Try selecting a different filter.</p>
          </div>
        ) : (
          <>
            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 mb-8">
              {news.map((article, index) => (
                <a
                  key={`${article.source}-${article.title}-${index}`}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:shadow-lg hover:border-crimson transition group break-inside-avoid mb-6 block"
                >
                  {/* Image */}
                  <div className="mb-4 overflow-hidden rounded-lg bg-light-gray h-48 flex items-center justify-center">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/E2E8F0/94A3B8?text=No+Image';
                        }}
                      />
                    ) : (
                      <span className="text-lg text-slate-gray">📰</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    {/* Category & Source */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-gray font-medium">{article.source}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-h3 text-slate-navy mb-2 group-hover:text-crimson transition line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-gray mb-4 line-clamp-3">
                      {article.description || 'Click to read more...'}
                    </p>

                    {/* Date & Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-light-gray">
                      <span className="text-xs text-slate-gray">
                        {article.timeAgo}
                      </span>
                      <div className="flex items-center gap-1 text-crimson font-medium text-small">
                        <span>Read More</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Load More Button */}
            {news.length >= currentLimit && (
              <div className="text-center mb-8">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-slate-navy text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <div className="flex items-center gap-2">
                      <Loader className="animate-spin" size={16} />
                      Loading more...
                    </div>
                  ) : (
                    'Load More News'
                  )}
                </button>
              </div>
            )}

            {/* View More Button */}
            {showViewMore && (
              <div className="text-center">
                <button
                  onClick={() => window.open('/news', '_self')}
                  className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  View Full Science News Archive
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
