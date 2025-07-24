import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_DEV;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_DEV;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
