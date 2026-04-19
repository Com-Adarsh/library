import type { NextApiRequest, NextApiResponse } from 'next';
import { serviceSupabase } from '@/lib/supabase';
import { sendAdminApprovalEmail } from '@/lib/email-service';
import { createPendingSignedUrl } from '@/lib/admin-storage-service';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const ADMIN_SECRET = process.env.ADMIN_APPROVAL_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!serviceSupabase) {
    return res.status(500).json({ error: 'Admin Supabase client not configured' });
  }

  if (!ADMIN_SECRET) {
    return res.status(500).json({ error: 'Admin approval secret is not configured' });
  }

  try {
    const {
      title,
      uploader_name,
      uploader_email,
      subject,
      semester,
      category,
      description,
      file_path,
      file_name,
      file_size_mb,
    } = req.body;

    if (
      !title ||
      !uploader_name ||
      !uploader_email ||
      !subject ||
      !semester ||
      !category ||
      !file_path ||
      !file_name ||
      !file_size_mb
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const insertPayload = {
      title,
      subject,
      semester: parseInt(semester, 10),
      category,
      description,
      uploader_id: null,
      uploader_name,
      uploader_email,
      file_path,
      file_url: file_path,
      file_size_mb: parseFloat(file_size_mb),
      status: 'pending',
    };

    const { data: resource, error } = await serviceSupabase
      .from('resources')
      .insert([insertPayload])
      .select()
      .single();

    if (error || !resource) {
      throw error || new Error('Unable to save pending upload');
    }

    const previewUrl = await createPendingSignedUrl(file_path, 60 * 60 * 24);
    const approveUrl = `${APP_URL}/api/admin/approval?action=ACCEPT&fileId=${resource.id}&secret=${ADMIN_SECRET}`;
    const rejectUrl = `${APP_URL}/api/admin/approval?action=REJECT&fileId=${resource.id}&secret=${ADMIN_SECRET}`;

    try {
      await sendAdminApprovalEmail({
        resourceId: resource.id,
        title: resource.title,
        subject: resource.subject,
        semester: resource.semester.toString(),
        category: resource.category,
        uploaderName: uploader_name,
        uploaderEmail: uploader_email,
        fileName: file_name,
        previewUrl,
        approveUrl,
        rejectUrl,
      });
    } catch (emailError: any) {
      console.error('Failed to send admin approval email:', emailError);
    }

    res.status(201).json({ resource });
  } catch (error: any) {
    console.error('Pending upload API error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
