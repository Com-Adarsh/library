import { useState, useEffect } from 'react';
import { Zap, Filter, Calendar, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import SocialHub from '../components/SocialHub';
import Footer from '../components/Footer';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  image?: string;
}

const CATEGORIES = [
  { id: 'labour', label: '🏃 Labour Rights', color: 'bg-red-100 text-red-800' },
  { id: 'education', label: '📚 Public Education', color: 'bg-blue-100 text-blue-800' },
  { id: 'environment', label: '🌍 Environment', color: 'bg-green-100 text-green-800' },
  { id: 'solidarity', label: '🤝 International Solidarity', color: 'bg-purple-100 text-purple-800' },
];

const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Students Demand Free Education in Mass Rally Across India',
    description: 'Over 50,000 students gathered in major cities demanding comprehensive education reform and elimination of private schooling barriers.',
    source: 'Janata Weekly',
    url: '#',
    category: 'education',
    publishedAt: '2026-04-15T09:30:00Z',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Climate Justice: Workers Lead Fight Against Industrial Pollution',
    description: 'Union workers in coastal regions demand corporate accountability for environmental degradation affecting local communities.',
    source: 'Socialist Worker',
    url: '#',
    category: 'environment',
    publishedAt: '2026-04-14T14:15:00Z',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Global Labour Movement Unites: Rights Before Profits',
    description: 'International solidarity conference brings together worker representatives to address wage theft and unsafe working conditions.',
    source: 'Frontline',
    url: '#',
    category: 'labour',
    publishedAt: '2026-04-13T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Student-Led Movement Protects Public Healthcare Access',
    description: 'Youth activists push back against privatization plans, securing expanded public health services for marginalized communities.',
    source: 'Janata Weekly',
    url: '#',
    category: 'solidarity',
    publishedAt: '2026-04-12T10:45:00Z',
    image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Collective Farming Initiative Shows Path to Food Sovereignty',
    description: 'Rural communities demonstrate sustainable, worker-managed agricultural models that challenge corporate farming monopolies.',
    source: 'The Hindu',
    url: '#',
    category: 'environment',
    publishedAt: '2026-04-11T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Strike Victory: Workers Win Better Conditions After Collective Action',
    description: 'Factory workers secure wage increases and improved safety measures after two-week strike and negotiations.',
    source: 'Socialist Worker',
    url: '#',
    category: 'labour',
    publishedAt: '2026-04-10T15:20:00Z',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  },
];

const MANDELA_QUOTE = '"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela';

export default function PeoplesPulse() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [articles, setArticles] = useState<NewsArticle[]>(MOCK_ARTICLES);
  const [loading, setLoading] = useState(false);
  const [timeAgo, setTimeAgo] = useState<{ [key: string]: string }>({});
  const [apiReady, setApiReady] = useState(false);

  // Fetch from NewsAPI on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const keywords = ['science', 'sociology', 'public education', 'social justice', 'labour rights'];
        const query = keywords.join(' OR ');
        
        const response = await fetch(`/api/news?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en`);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          // Filter for recent articles (Jan 2026 onwards)
          const filteredArticles = data.articles
            .filter((article: any) => new Date(article.publishedAt) >= new Date('2026-01-01'))
            .map((article: any, idx: number) => ({
              id: `api-${idx}`,
              title: article.title,
              description: article.description,
              source: article.source.name,
              url: article.url,
              category: 'solidarity',
              publishedAt: article.publishedAt,
              image: article.urlToImage,
            }));
          
          if (filteredArticles.length > 0) {
            setArticles(filteredArticles.slice(0, 12)); // Limit to 12
            setApiReady(true);
          } else {
            setArticles(MOCK_ARTICLES);
          }
        } else {
          setArticles(MOCK_ARTICLES);
        }
      } catch (error) {
        console.log('API not available, using mock data');
        setArticles(MOCK_ARTICLES);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Load articles based on category
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedCategory === 'all') {
        // Show all articles
      } else {
        // Filter by category
        const filtered = MOCK_ARTICLES.filter(a => a.category === selectedCategory);
        if (filtered.length > 0) {
          setArticles(filtered);
        }
      }
      setLoading(false);
    }, 300);
  }, [selectedCategory]);

  // Calculate time ago for each article with "Today at [Time]" format
  useEffect(() => {
    const updateTimeAgo = () => {
      const times: { [key: string]: string } = {};
      articles.forEach(article => {
        const date = new Date(article.publishedAt);
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const articleDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        const isToday = todayStart.getTime() === articleDate.getTime();
        
        if (isToday) {
          const time = date.toLocaleTimeString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          times[article.id] = `Today at ${time}`;
        } else {
          const diff = now.getTime() - date.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const days = Math.floor(hours / 24);

          if (days > 0) times[article.id] = `${days}d ago`;
          else if (hours > 0) times[article.id] = `${hours}h ago`;
          else times[article.id] = 'Just now';
        }
      });
      setTimeAgo(times);
    };
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [articles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-navy via-slate-50 to-ghost-white">
      <Navigation />
      
      {/* Hero Section with Glassmorphism */}
      <div className="relative h-96 bg-cover bg-center overflow-hidden"
           style={{
             backgroundImage: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(188, 0, 0, 0.3)), url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=600&fit=crop\')',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border-t border-white/20"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-12 h-12 text-crimson animate-pulse" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-emerald rounded-full animate-pulse"></span>
            </div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">People's Pulse</h1>
          </div>
          <p className="text-xl text-white/95 mb-6 max-w-2xl text-center italic drop-shadow-md font-semibold">
            {MANDELA_QUOTE}
          </p>
          <p className="text-white/90 text-lg drop-shadow-md">🚀 Current affairs for conscious students</p>
          
          {/* Status Indicator */}
          <div className="mt-4 flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
            <span className={`w-2 h-2 ${apiReady ? 'bg-emerald' : 'bg-amber'} rounded-full animate-pulse`}></span>
            <span className="text-white text-sm font-medium">{apiReady ? 'Live Data Active' : 'Loading Updates'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-navy" />
            <h2 className="text-lg font-bold text-slate-navy">Filter By Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-crimson text-white shadow-lg scale-105'
                  : 'bg-slate-200 text-slate-navy hover:bg-slate-300'
              }`}
            >
              📰 All News
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-crimson text-white shadow-lg scale-105'
                    : 'bg-slate-200 text-slate-navy hover:bg-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className={`transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {articles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map(article => (
                <div
                  key={article.id}
                  className="group bg-white rounded-lg border-l-4 border-crimson hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Category Badge */}
                    <div className="mb-2 flex gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        CATEGORIES.find(c => c.id === article.category)?.color
                      }`}>
                        {CATEGORIES.find(c => c.id === article.category)?.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-navy text-lg mb-2 line-clamp-2 group-hover:text-crimson transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {article.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                      <div>
                        <p className="font-medium text-slate-600">{article.source}</p>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {timeAgo[article.id]}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-crimson/10 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-crimson" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No articles in this category yet.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-crimson/15 to-emerald/15 rounded-lg p-8 text-center border border-crimson/30 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-navy mb-3">Stay Informed, Stay Engaged</h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Real-time updates on social justice, labour rights, environmental action, and student movements. 
            Democracy thrives on informed citizens who understand their collective power.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-crimson text-white px-8 py-3 rounded-lg font-bold hover:bg-crimson/90 transition-all hover:scale-105 shadow-lg">
              Subscribe to Updates
            </button>
            <button className="border-2 border-crimson text-crimson px-8 py-3 rounded-lg font-bold hover:bg-crimson/10 transition-all hover:scale-105">
              Share This Movement
            </button>
          </div>
        </div>

        {/* Social Connection Section */}
        <div className="mt-12 bg-gradient-to-r from-crimson/10 to-blue-500/10 rounded-lg p-8 border border-crimson/20">
          <h3 className="text-2xl font-bold text-slate-navy mb-6 text-center">
            🤝 Join the IMSC Community
          </h3>
          <SocialHub variant="horizontal" showCounter={true} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
