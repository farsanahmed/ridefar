/**
 * Pure environment checks — safe to import from anywhere.
 * Kept separate from `server.ts` so client bundles never pull in the
 * Supabase client or any server-only key handling.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabaseUrl = url;
export const supabaseAnonKey = anonKey;
