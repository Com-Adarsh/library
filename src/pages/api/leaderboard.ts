import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  if (req.method === 'GET') {
    try {
      const { limit = 10 } = req.query;

      const { data, error } = await supabase
        .from('users')
        .select('id, name, avatar_url, contribution_count')
        .order('contribution_count', { ascending: false })
        .limit(parseInt(limit as string));

      if (error) throw error;
      res.status(200).json({ contributors: data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
