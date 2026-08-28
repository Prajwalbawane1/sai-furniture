import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const rawAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY || '';

const rawSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function cleanKey(k: string): string {
  if (!k || k.includes('•') || k.includes('***')) return '';
  return k.trim();
}

const supabaseUrl = rawUrl.trim();
const supabaseAnonKey = cleanKey(rawAnonKey);
const supabaseSecretKey = cleanKey(rawSecretKey);

/**
 * Standard Supabase client for Server Components, data queries, and API routes.
 * Does not require cookies, allowing static generation and fast server-side querying.
 */
export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Admin Supabase client with service role key for privileged operations.
 */
export function getAdminSupabase() {
  const key = supabaseSecretKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Supabase client with Next.js Cookie handling for user session auth.
 */
export async function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  try {
    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored when called in Server Components
          }
        },
      },
    });
  } catch {
    return getSupabase();
  }
}
