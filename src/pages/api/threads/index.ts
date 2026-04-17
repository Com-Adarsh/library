import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!supabase) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  if (req.method === 'GET') {
    try {
      const { subject } = req.query;
      
      let query = supabase.from('threads').select('*').eq('is_deleted', false);

      if (subject) query = query.eq('subject', subject);

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      res.status(200).json({ threads: data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, subject, author_id } = req.body;

      const { data, error } = await supabase
        .from('threads')
        .insert([
          {
            title,
            content,
            subject,
            author_id,
            view_count: 0,
          },
        ])
        .select();

      if (error) throw error;
      res.status(201).json({ thread: data[0] });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
