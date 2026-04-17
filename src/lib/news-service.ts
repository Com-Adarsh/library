import axios from 'axios';

const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
const NEWSAPI_BASE = 'https://newsapi.org/v2';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: { name: string };
  image: string;
  url: string;
  publishedAt: string;
  category?: string;
}

// Map categories to NewsAPI keywords
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Physics': ['quantum', 'physics', 'relativity', 'particle'],
  'Chemistry': ['chemistry', 'chemical', 'molecule', 'reactions'],
  'Biology': ['biology', 'genetic', 'DNA', 'cellular'],
  'Environment': ['climate', 'environment', 'sustainability', 'green'],
  'Photonics': ['photonics', 'photon', 'light', 'optics'],
};

export async function fetchNews(category?: string): Promise<NewsArticle[]> {
  if (!NEWSAPI_KEY) {
    console.warn('NewsAPI key not configured');
    return [];
  }

  try {
    const query = category
      ? CATEGORY_KEYWORDS[category]?.join(' OR ') || 'science'
      : 'science physics chemistry biology';

    const response = await axios.get(`${NEWSAPI_BASE}/everything`, {
      params: {
        q: query,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 20,
        apiKey: NEWSAPI_KEY,
      },
    });

    return response.data.articles.map((article: any, index: number) => ({
      id: `${article.publishedAt}-${index}`,
      title: article.title,
      description: article.description,
      source: { name: article.source.name },
      image: article.urlToImage,
      url: article.url,
      publishedAt: new Date(article.publishedAt).toLocaleDateString(),
      category: category || 'Science',
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function fetchCachedNews(category?: string) {
  try {
    const response = await fetch(`/api/news${category ? `?category=${category}` : ''}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching cached news:', error);
    return { articles: [], error: 'Failed to fetch news' };
  }
}
