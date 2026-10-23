import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Server-side Supabase access.
 *
 * The anon key is used deliberately: Row Level Security (Phase 2) is what
 * protects the data, so every read goes through the same public policies a
 * browser would hit. The service role key is reserved for admin writes and
 * is never imported by client components.
 */

export { isSupabaseConfigured };

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
      // Catalogue reads are always fresh: never serve a cached Postgres row.
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });
  }
  return client;
}

/** Server-only service-role client. Returns null when the key is absent. */
export function getServiceClient(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured || !serviceKey) return null;
  return createClient(supabaseUrl as string, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
