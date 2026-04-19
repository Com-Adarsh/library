import type { NextApiRequest, NextApiResponse } from 'next';
import { serviceSupabase } from '@/lib/supabase';
import {
  createVerifiedSignedUrl,
  deletePendingUpload,
  getVerifiedFilePublicUrl,
  movePendingToVerified,
} from '@/lib/admin-storage-service';
import { sendUploaderNotification } from '@/lib/email-service';

const ADMIN_SECRET = process.env.ADMIN_APPROVAL_SECRET || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const action = Array.isArray(req.query.action) ? req.query.action[0] : req.query.action;
  const fileId = Array.isArray(req.query.fileId) ? req.query.fileId[0] : req.query.fileId;
  const secret = Array.isArray(req.query.secret) ? req.query.secret[0] : req.query.secret;

  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(401).send('Access denied. Invalid admin token.');
  }

  if (!serviceSupabase) {
    return res.status(500).send('Admin Supabase client is not configured.');
  }

  if (!action || !fileId) {
    return res.status(400).send('Missing action or resource identifier.');
  }

  try {
    const { data: resource, error: fetchError } = await serviceSupabase
      .from('resources')
      .select('*')
      .eq('id', fileId)
      .single();

    if (fetchError || !resource) {
      return res.status(404).send('Pending resource not found.');
    }

    if (resource.status !== 'pending') {
      return res
        .status(400)
        .send(`This resource has already been processed. Current status: ${resource.status}`);
    }

    const sourcePath = resource.file_path;
    if (!sourcePath) {
      return res.status(400).send('Missing stored file path.');
    }

    const destinationPath = sourcePath.replace(/^pending\//, 'verified_library/');
    let message = '';
    let publicUrl: string | undefined;

    if (action === 'ACCEPT') {
      await movePendingToVerified(sourcePath, destinationPath);

      try {
        publicUrl = await getVerifiedFilePublicUrl(destinationPath);
      } catch (publicUrlError) {
        publicUrl = await createVerifiedSignedUrl(destinationPath, 60 * 60 * 24 * 30);
      }

      const { error: approveError } = await serviceSupabase
        .from('resources')
        .update({ status: 'approved', file_url: publicUrl || destinationPath })
        .eq('id', fileId);

      if (approveError) throw approveError;

      try {
        await sendUploaderNotification({
          uploaderEmail: resource.uploader_email,
          uploaderName: resource.uploader_name,
          title: resource.title,
          accepted: true,
          resourceUrl: publicUrl,
        });
      } catch (emailError: any) {
        console.error('Failed to send uploader approval notification:', emailError);
      }

      message = 'Resource has been approved and moved to the verified library.';
    } else if (action === 'REJECT') {
      await deletePendingUpload(sourcePath);

      const { error: rejectError } = await serviceSupabase
        .from('resources')
        .update({ status: 'rejected' })
        .eq('id', fileId);

      if (rejectError) throw rejectError;

      try {
        await sendUploaderNotification({
          uploaderEmail: resource.uploader_email,
          uploaderName: resource.uploader_name,
          title: resource.title,
          accepted: false,
        });
      } catch (emailError: any) {
        console.error('Failed to send uploader rejection notification:', emailError);
      }

      message = 'Resource has been rejected and deleted from pending storage.';
    } else {
      return res.status(400).send('Invalid action. Use ACCEPT or REJECT.');
    }

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
      <html>
        <head><title>Admin Approval</title></head>
        <body style="font-family: Arial, sans-serif; color: #0f172a; padding: 32px;">
          <h1>Admin Action Completed</h1>
          <p>${message}</p>
          <p><a href="/" style="color: #2563eb;">Return to IMSC Commons</a></p>
        </body>
      </html>
    `);
  } catch (error: any) {
    console.error('Admin approval error:', error);
    return res.status(500).send('Unable to complete admin approval request.');
  }
}
