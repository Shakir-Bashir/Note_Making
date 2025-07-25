import { createClient } from "@supabase/supabase-js";

const supabaseURl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseURl || !supabaseKey) {
  throw new Error("Missing supabase url or key");
}

export const supabase = createClient(supabaseURl, supabaseKey);
