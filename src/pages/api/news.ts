import { NextApiRequest, NextApiResponse } from 'next';

// Junk content keywords to filter out
const JUNK_KEYWORDS = [
  'horoscope', 'astrology', 'zodiac', 'celebrity', 'viral', 'trending',
  'funny', 'meme', 'tiktok', 'gaming', 'sports', 'cricket', 'football',
  'entertainment', 'gossip', 'scandal', 'sponsored', 'ad ', 'advertisement'
];

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
  content: string;
}

const isJunkContent = (title: string, description: string): boolean => {
  const text = `${title} ${description}`.toLowerCase();
  return JUNK_KEYWORDS.some(keyword => text.includes(keyword));
};

const isAcademicContent = (title: string, description: string): boolean => {
  const academicKeywords = [
    'science', 'research', 'study', 'university', 'education', 'technology',
    'physics', 'chemistry', 'biology', 'mathematics', 'data', 'algorithm',
    'artificial intelligence', 'machine learning', 'quantum', 'environment',
    'sustainability', 'innovation', 'discovery', 'journal', 'paper',
    'academic', 'scholar', 'professor', 'laboratory', 'experiment'
  ];
  
  const text = `${title} ${description}`.toLowerCase();
  return academicKeywords.some(keyword => text.includes(keyword));
};

// Simple in-memory cache for the API responses
const newsCache: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set cache headers for daily updates (24 hours)
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.setHeader('Pragma', 'cache');
  res.setHeader('Expires', new Date(Date.now() + CACHE_DURATION).toUTCString());

  if (req.method === 'GET') {
    try {
      const { q, local = 'true' } = req.query;
      
      // Convert query to string (handle case where it's an array)
      const queryString = Array.isArray(q) ? q[0] : (q || 'science education');
      const localScope = Array.isArray(local) ? local[0] : local;
      
      // Create cache key based on query and scope
      const cacheKey = `${queryString}:${localScope}`;
      
      // Check if cached data is still valid (24 hours)
      if (newsCache[cacheKey]) {
        const { data, timestamp } = newsCache[cacheKey];
        const age = Date.now() - timestamp;
        
        if (age < CACHE_DURATION) {
          // Return cached data if less than 24 hours old
          return res.status(200).json({ 
            articles: data.articles,
            source: 'cache',
            cached: true,
            cacheAge: Math.floor(age / 1000), // Age in seconds
            nextRefresh: new Date(timestamp + CACHE_DURATION).toISOString(),
            timestamp: new Date(timestamp).toISOString(),
            total: data.articles.length
          });
        }
      }
      
      // If NewsAPI key is not configured, return mock data
      const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
      if (!apiKey || apiKey === 'your_newsapi_key') {
        const mockData = { articles: [] };
        newsCache[cacheKey] = { data: mockData, timestamp: Date.now() };
        return res.status(200).json({ 
          articles: [],
          source: 'mock',
          cached: false,
          timestamp: new Date().toISOString()
        });
      }

      // Build NewsAPI query
      let newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(queryString)}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${apiKey}`;

      // Add domain filtering for local news if requested
      if (localScope === 'true') {
        newsApiUrl += '&domains=thehindu.com,indianexpress.com,deccanherald.com,firstpost.com';
      }

      const response = await fetch(newsApiUrl);

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`);
      }

      const data = await response.json();

      // Filter and clean articles
      const cleanedArticles = (data.articles || [])
        .filter((article: NewsArticle) => {
          // Remove junk content
          if (isJunkContent(article.title, article.description || '')) {
            return false;
          }
          
          // Prefer academic content but allow general news with keywords
          const text = `${article.title} ${article.description}`.toLowerCase();
          const hasRelevantKeywords = ['science', 'research', 'education', 'technology', 'university', 'study', 'innovation'].some(k => text.includes(k));
          
          return hasRelevantKeywords || isAcademicContent(article.title, article.description || '');
        })
        .map((article: NewsArticle) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source.name,
          content: article.content
        }))
        .slice(0, 20); // Limit to 20 articles

      // Cache the results
      const cacheData = { articles: cleanedArticles };
      newsCache[cacheKey] = { data: cacheData, timestamp: Date.now() };

      res.status(200).json({ 
        articles: cleanedArticles,
        source: 'newsapi-fresh',
        cached: false,
        nextRefresh: new Date(Date.now() + CACHE_DURATION).toISOString(),
        timestamp: new Date().toISOString(),
        total: cleanedArticles.length
      });
    } catch (error: any) {
      console.error('News API Error:', error);
      res.status(200).json({ 
        articles: [],
        source: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
