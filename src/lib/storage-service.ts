import { supabase } from '@/lib/supabase';

export async function uploadFile(file: File, path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.storage
    .from('resources')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;
  return data;
}

export async function uploadPendingFile(file: File, path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.storage
    .from('pending_uploads')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;
  return data;
}

export async function getFileUrl(path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data } = supabase.storage.from('resources').getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.storage.from('resources').remove([path]);
  if (error) throw error;
  return data;
}

export async function deletePendingFile(path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.storage.from('pending_uploads').remove([path]);
  if (error) throw error;
  return data;
}

export async function downloadFile(path: string) {
  if (!supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase.storage.from('resources').download(path);
  if (error) throw error;
  return data;
}
