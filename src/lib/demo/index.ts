import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Demo mode rules
 * ---------------
 * - NEXT_PUBLIC_DEMO_DATA=true  -> always show DEMO data.
 * - NEXT_PUBLIC_DEMO_DATA=false -> never show DEMO data.
 * - unset                       -> show DEMO data only while Supabase is not
 *                                 configured, so a configured-but-empty
 *                                 database renders the real empty states.
 */
const flag = process.env.NEXT_PUBLIC_DEMO_DATA;

export const demoEnabled =
  flag === "true" || (flag !== "false" && !isSupabaseConfigured);
