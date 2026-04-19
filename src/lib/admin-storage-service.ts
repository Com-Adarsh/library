import { serviceSupabase } from '@/lib/supabase';

if (!serviceSupabase) {
  throw new Error('Supabase service client not configured. Add SUPABASE_SERVICE_ROLE_KEY.');
}

const adminStorage = serviceSupabase;

export async function createPendingSignedUrl(path: string, expiresIn = 3600) {
  const { data, error } = await adminStorage.storage
    .from('pending_uploads')
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

export async function movePendingToVerified(sourcePath: string, destinationPath: string) {
  const { error } = await adminStorage.storage
    .from('pending_uploads')
    .move(sourcePath, destinationPath);

  if (error) throw error;
  return true;
}

export async function deletePendingUpload(path: string) {
  const { error } = await adminStorage.storage
    .from('pending_uploads')
    .remove([path]);

  if (error) throw error;
  return true;
}

export async function getVerifiedFilePublicUrl(path: string) {
  const { data } = await adminStorage.storage
    .from('pending_uploads')
    .getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error('Unable to generate public URL');
  }
  return data.publicUrl;
}

export async function createVerifiedSignedUrl(path: string, expiresIn = 60 * 60 * 24 * 30) {
  const { data, error } = await adminStorage.storage
    .from('pending_uploads')
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
