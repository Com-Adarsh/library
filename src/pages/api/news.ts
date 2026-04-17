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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set no-cache headers for real-time data
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'GET') {
    try {
      const { q, local = 'true' } = req.query;
      
      // Convert query to string (handle case where it's an array)
      const queryString = Array.isArray(q) ? q[0] : (q || 'science education');
      const localScope = Array.isArray(local) ? local[0] : local;
      
      // If NewsAPI key is not configured, return mock data
      const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
      if (!apiKey || apiKey === 'your_newsapi_key') {
        return res.status(200).json({ 
          articles: [],
          source: 'mock',
          timestamp: new Date().toISOString()
        });
      }

      // Build NewsAPI query with cache-busting timestamp
      let newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(queryString)}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${apiKey}`;
      
      // Add timestamp for cache-busting
      const now = new Date().getTime();
      newsApiUrl += `&t=${now}`;

      // Add domain filtering for local news if requested
      if (localScope === 'true') {
        newsApiUrl += '&domains=thehindu.com,indianexpress.com,deccanherald.com,firstpost.com';
      }

      const response = await fetch(newsApiUrl, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

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

      res.status(200).json({ 
        articles: cleanedArticles,
        source: 'newsapi',
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
