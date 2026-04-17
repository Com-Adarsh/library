import React, { useState, useEffect } from 'react';
import { Atom, FlaskConical, Dna, Zap, TrendingUp, Globe, Loader, ExternalLink, AlertCircle } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  category: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
}

interface SciencePulseProps {
  limit?: number;
  showViewMore?: boolean;
}

export default function SciencePulse({ limit = 6, showViewMore = true }: SciencePulseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'All', name: 'All News', icon: Globe, keyword: '' },
    { id: 'Physics', name: 'Physics', icon: Atom, keyword: 'Quantum OR Astrophysics OR CERN OR Relativity' },
    { id: 'Chemistry', name: 'Chemistry', icon: FlaskConical, keyword: 'Materials OR Molecular OR Chemical' },
    { id: 'Biology', name: 'Biology', icon: Dna, keyword: 'Genetics OR Biotech OR DNA' },
    { id: 'Photonics', name: 'Photonics', icon: Zap, keyword: 'Laser OR Optics OR Fiber' },
    { id: 'DataScience', name: 'Data Science', icon: TrendingUp, keyword: 'AI OR Machine Learning OR Data' },
  ];

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const selectedCat = categories.find(c => c.id === selectedCategory);
      const query = selectedCat?.keyword || 'science';
      
      // Using NewsAPI with our backend endpoint
      const response = await fetch(
        `/api/news?category=${encodeURIComponent(query)}&pageSize=${limit * 2}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch news');
      
      const data = await response.json();
      setNews(data.articles || []);
    } catch (err) {
      console.error('News fetch error:', err);
      setError('Unable to load news. Using cached data.');
      // Fall back to mock data if API fails
      setNews(getMockNews());
    } finally {
      setLoading(false);
    }
  };

  const getMockNews = (): NewsItem[] => [
    {
      id: '1',
      title: 'New Discovery in Quantum Mechanics',
      description: 'Scientists discover new properties of quantum particles that could revolutionize computing...',
      source: 'Science Daily',
      category: 'Physics',
      urlToImage: 'https://via.placeholder.com/400x200/2563EB/FFFFFF?text=Quantum+Physics',
      url: '#',
      publishedAt: '2024-04-15',
    },
    {
      id: '2',
      title: 'Breakthrough in Sustainable Materials',
      description: 'Researchers develop new chemical processes for eco-friendly production...',
      source: 'Chemistry World',
      category: 'Chemistry',
      urlToImage: 'https://via.placeholder.com/400x200/BC0000/FFFFFF?text=Chemistry',
      url: '#',
      publishedAt: '2024-04-14',
    },
    {
      id: '3',
      title: 'CRISPR Gene Therapy Success',
      description: 'New gene editing techniques show promise in treating genetic diseases...',
      source: 'Nature Biotechnology',
      category: 'Biology',
      urlToImage: 'https://via.placeholder.com/400x200/059669/FFFFFF?text=Genetics',
      url: '#',
      publishedAt: '2024-04-13',
    },
    {
      id: '4',
      title: 'Fiber Optics Speed Records',
      description: 'New laser technology enables faster data transmission over longer distances...',
      source: 'IEEE Spectrum',
      category: 'Photonics',
      urlToImage: 'https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Photonics',
      url: '#',
      publishedAt: '2024-04-12',
    },
  ];

  const displayedNews = news.slice(0, limit);

  return (
    <section className="py-12 bg-ghost-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-h2 mb-2">Science Pulse</h2>
          <p className="text-slate-gray">Curated scientific news and discoveries across CUSAT subjects</p>
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
        ) : displayedNews.length === 0 ? (
          <div className="text-center py-12 text-slate-gray">
            <AlertCircle size={32} className="mx-auto mb-4 opacity-50" />
            <p>No news available for this category. Try selecting a different filter.</p>
          </div>
        ) : (
          <>
            {/* News Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedNews.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:shadow-lg hover:border-crimson transition group h-full flex flex-col"
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
                  <div className="flex-1 flex flex-col">
                    {/* Source & Date */}
                    <div className="flex items-center justify-between mb-3 text-small text-slate-gray pb-3 border-b border-light-gray">
                      <span className="font-medium truncate">{article.source}</span>
                      <span className="text-xs">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-h3 text-slate-navy mb-2 group-hover:text-crimson transition line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-gray mb-4 line-clamp-3 flex-grow">
                      {article.description || 'Click to read more...'}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-crimson font-medium text-small pt-4 border-t border-light-gray">
                      <span>Read More</span>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* View More Button */}
            {showViewMore && news.length > limit && (
              <div className="text-center">
                <button 
                  onClick={() => window.open('/news', '_self')}
                  className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  View More Science News
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
