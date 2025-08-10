import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CONFIG } from "./supabaseConfig";

let supabaseUrl;
let supabaseAnonKey;

if (import.meta.env.MODE === "production") {
  // supabase production
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
} else {
  // supabase DEV
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_DEV;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_DEV;
}

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
