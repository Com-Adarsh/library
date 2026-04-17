import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  if (req.method === 'GET') {
    try {
      const { category } = req.query;

      let query = supabase
        .from('news_cache')
        .select('*')
        .gt('expires_at', new Date().toISOString());

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('published_at', { ascending: false }).limit(20);

      if (error) throw error;

      res.status(200).json({ articles: data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
