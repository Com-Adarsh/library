/**
 * Dynamic Science News Aggregation Service
 * Multi-source API aggregator for real-time science news
 * Implements anti-caching and intelligent filtering
 */

export interface AggregatedNewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: string;
  sourceLogo?: string;
  category: string;
  relevanceBadge: string;
  urlToImage?: string;
  url: string;
  publishedAt: string;
  author?: string;
  timeAgo: string;
  isRecent: boolean;
}

export interface NewsSource {
  name: string;
  baseUrl: string;
  apiKey?: string;
  queryParams: Record<string, string>;
  transformFunction: (data: any) => AggregatedNewsItem[];
}

/**
 * IMSC-relevant keywords for filtering scientific content
 */
const IMSC_KEYWORDS = [
  'stochastic', 'photonics', 'data science', 'kerala space park', 'lhc',
  'quantum', 'astrophysics', 'cern', 'relativity', 'materials', 'molecular',
  'chemical', 'genetics', 'biotech', 'dna', 'laser', 'optics', 'fiber',
  'ai', 'machine learning', 'data', 'neural network', 'algorithm',
  'space', 'satellite', 'isro', 'nasa', 'esa', 'astronomy', 'cosmology',
  'particle physics', 'nuclear', 'fusion', 'plasma', 'semiconductor',
  'nanotechnology', 'biomaterials', 'crystallography', 'spectroscopy'
];

/**
 * News sources configuration
 */
const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'Bing News',
    baseUrl: 'https://api.bing.microsoft.com/v7.0/news/search',
    queryParams: {
      q: 'science india technology research',
      freshness: 'Day',
      count: '20',
      sortBy: 'Date'
    },
    transformFunction: transformBingNews
  },
  {
    name: 'ScienceDaily RSS',
    baseUrl: 'https://api.rss2json.com/v1/api.json',
    queryParams: {
      rss_url: 'https://www.sciencedaily.com/rss/top/science.xml',
      api_key: 'demo' // Replace with actual API key
    },
    transformFunction: transformScienceDaily
  },
  {
    name: 'Nature News',
    baseUrl: 'https://api.rss2json.com/v1/api.json',
    queryParams: {
      rss_url: 'https://www.nature.com/nature.rss',
      api_key: 'demo' // Replace with actual API key
    },
    transformFunction: transformNatureNews
  }
];

/**
 * Transform Bing News API response
 */
function transformBingNews(data: any): AggregatedNewsItem[] {
  if (!data.value) return [];

  return data.value.map((item: any, index: number) => {
    const publishedDate = new Date(item.datePublished);
    const isRecent = publishedDate >= new Date('2026-01-01');

    return {
      id: `bing-${index}-${Date.now()}`,
      title: item.name || item.title,
      description: item.description || item.snippet,
      source: 'Bing News',
      sourceLogo: '📰',
      category: categorizeArticle(item.name + ' ' + item.description),
      relevanceBadge: getRelevanceBadge(item.name + ' ' + item.description),
      urlToImage: item.image?.thumbnail?.contentUrl,
      url: item.url,
      publishedAt: item.datePublished,
      author: item.provider?.[0]?.name,
      timeAgo: getTimeAgo(publishedDate),
      isRecent
    };
  });
}

/**
 * Transform ScienceDaily RSS response
 */
function transformScienceDaily(data: any): AggregatedNewsItem[] {
  if (!data.items) return [];

  return data.items.map((item: any, index: number) => {
    const publishedDate = new Date(item.pubDate);
    const isRecent = publishedDate >= new Date('2026-01-01');

    return {
      id: `sciencedaily-${index}-${Date.now()}`,
      title: item.title,
      description: item.description,
      content: item.content,
      source: 'ScienceDaily',
      sourceLogo: '🔬',
      category: categorizeArticle(item.title + ' ' + item.description),
      relevanceBadge: getRelevanceBadge(item.title + ' ' + item.description),
      urlToImage: item.enclosure?.link || item.thumbnail,
      url: item.link,
      publishedAt: item.pubDate,
      author: item.author,
      timeAgo: getTimeAgo(publishedDate),
      isRecent
    };
  });
}

/**
 * Transform Nature News RSS response
 */
function transformNatureNews(data: any): AggregatedNewsItem[] {
  if (!data.items) return [];

  return data.items.map((item: any, index: number) => {
    const publishedDate = new Date(item.pubDate);
    const isRecent = publishedDate >= new Date('2026-01-01');

    return {
      id: `nature-${index}-${Date.now()}`,
      title: item.title,
      description: item.description,
      content: item.content,
      source: 'Nature',
      sourceLogo: '🧬',
      category: categorizeArticle(item.title + ' ' + item.description),
      relevanceBadge: getRelevanceBadge(item.title + ' ' + item.description),
      urlToImage: item.enclosure?.link || item.thumbnail,
      url: item.link,
      publishedAt: item.pubDate,
      author: item.author,
      timeAgo: getTimeAgo(publishedDate),
      isRecent
    };
  });
}

/**
 * Categorize article based on content
 */
function categorizeArticle(content: string): string {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes('quantum') || lowerContent.includes('physics') || lowerContent.includes('particle')) {
    return 'Physics';
  }
  if (lowerContent.includes('chemical') || lowerContent.includes('material') || lowerContent.includes('molecule')) {
    return 'Chemistry';
  }
  if (lowerContent.includes('gene') || lowerContent.includes('dna') || lowerContent.includes('biology') || lowerContent.includes('biotech')) {
    return 'Biology';
  }
  if (lowerContent.includes('laser') || lowerContent.includes('optics') || lowerContent.includes('photon')) {
    return 'Photonics';
  }
  if (lowerContent.includes('ai') || lowerContent.includes('machine learning') || lowerContent.includes('data') || lowerContent.includes('algorithm')) {
    return 'Data Science';
  }
  if (lowerContent.includes('space') || lowerContent.includes('astronomy') || lowerContent.includes('satellite')) {
    return 'Space Science';
  }

  return 'General Science';
}

/**
 * Get relevance badge based on IMSC keywords
 */
function getRelevanceBadge(content: string): string {
  const lowerContent = content.toLowerCase();

  for (const keyword of IMSC_KEYWORDS) {
    if (lowerContent.includes(keyword)) {
      return keyword.charAt(0).toUpperCase() + keyword.slice(1);
    }
  }

  return 'Science';
}

/**
 * Calculate time ago string
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}d ago`;
  } else if (diffHours > 0) {
    return `${diffHours}h ago`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes}m ago` : 'Just now';
  }
}

/**
 * Fetch news from a single source with anti-caching
 */
async function fetchFromSource(source: NewsSource): Promise<AggregatedNewsItem[]> {
  try {
    const timestamp = Date.now();
    const params = new URLSearchParams({
      ...source.queryParams,
      t: timestamp.toString(), // Cache busting
      _: timestamp.toString()  // Additional cache busting
    });

    const url = `${source.baseUrl}?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'User-Agent': 'IMSC-Commons-SciencePulse/1.0'
      },
      // Disable browser caching
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return source.transformFunction(data);

  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return [];
  }
}

/**
 * Main function to fetch aggregated science news
 */
export async function fetchGlobalSciencePulse(
  category: string = 'all',
  limit: number = 20
): Promise<AggregatedNewsItem[]> {
  try {
    console.log('🌟 Fetching fresh science news from multiple sources...');

    // Fetch from all sources in parallel
    const sourcePromises = NEWS_SOURCES.map(source => fetchFromSource(source));
    const sourceResults = await Promise.allSettled(sourcePromises);

    // Combine results
    let allArticles: AggregatedNewsItem[] = [];
    sourceResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allArticles = allArticles.concat(result.value);
        console.log(`✅ ${NEWS_SOURCES[index].name}: ${result.value.length} articles`);
      } else {
        console.error(`❌ ${NEWS_SOURCES[index].name}: ${result.reason}`);
      }
    });

    // Filter by date (post-January 2026)
    allArticles = allArticles.filter(article => article.isRecent);

    // Filter by IMSC keywords
    allArticles = allArticles.filter(article => {
      const content = (article.title + ' ' + article.description).toLowerCase();
      return IMSC_KEYWORDS.some(keyword => content.includes(keyword));
    });

    // Filter by category if specified
    if (category !== 'all') {
      allArticles = allArticles.filter(article =>
        article.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by publication date (newest first)
    allArticles.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Remove duplicates based on title similarity
    const uniqueArticles: AggregatedNewsItem[] = [];
    const seenTitles = new Set<string>();

    for (const article of allArticles) {
      const titleKey = article.title.toLowerCase().slice(0, 50);
      if (!seenTitles.has(titleKey)) {
        seenTitles.add(titleKey);
        uniqueArticles.push(article);
      }
    }

    console.log(`🎯 Filtered to ${uniqueArticles.length} unique, relevant articles`);

    return uniqueArticles.slice(0, limit);

  } catch (error) {
    console.error('❌ Error in fetchGlobalSciencePulse:', error);
    return [];
  }
}

/**
 * Get news for a specific category
 */
export async function fetchScienceNewsByCategory(
  category: string,
  limit: number = 15
): Promise<AggregatedNewsItem[]> {
  return fetchGlobalSciencePulse(category, limit);
}

/**
 * Get trending science topics
 */
export function getTrendingTopics(): string[] {
  return [
    'Quantum Computing',
    'CRISPR Gene Editing',
    'Climate Tech',
    'AI in Research',
    'Space Exploration',
    'Sustainable Materials',
    'Neuroscience',
    'Renewable Energy'
  ];
}