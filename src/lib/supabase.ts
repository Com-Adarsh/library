import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validate URL safely without throwing errors
const isValidUrl = (url: string): boolean => {
  try {
    return url.startsWith('https://') && url.includes('supabase');
  } catch {
    return false;
  }
};

let supabaseClient: SupabaseClient | null = null;
let serviceSupabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey && isValidUrl(supabaseUrl)) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

if (supabaseUrl && supabaseServiceRoleKey && isValidUrl(supabaseUrl)) {
  try {
    serviceSupabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase service client:', error);
  }
}

export const supabase = supabaseClient;
export const serviceSupabase = serviceSupabaseClient;

if (!supabase && typeof window === 'undefined') {
  console.warn(
    '⚠️  Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
  );
}

if (!serviceSupabase && typeof window === 'undefined') {
  console.warn(
    '⚠️  Supabase service role not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local for admin workflows.'
  );
}
