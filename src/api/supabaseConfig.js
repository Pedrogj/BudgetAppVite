export const SUPABASE_CONFIG = {
  url:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_SUPABASE_URL
      : import.meta.env.VITE_SUPABASE_URL_DEV,
  key:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_SUPABASE_ANON_KEY
      : import.meta.env.VITE_SUPABASE_ANON_KEY_DEV,
};
