import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Allow server-side code to run without Supabase configured, but most features will be disabled.
  console.warn('Supabase environment variables are not set. Database features will be disabled.');
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
