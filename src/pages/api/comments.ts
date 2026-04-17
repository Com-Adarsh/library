import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  if (req.method === 'POST') {
    try {
      const { thread_id, content, author_id } = req.body;

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            thread_id,
            content,
            author_id,
          },
        ])
        .select();

      if (error) throw error;
      res.status(201).json({ comment: data[0] });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      const { error } = await supabase
        .from('comments')
        .update({ is_deleted: true })
        .eq('id', id);

      if (error) throw error;
      res.status(204).send('');
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
