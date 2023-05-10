// utils/supabase.js

import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";

const getSupabase = (access_token: string) => {
  const options: SupabaseClientOptions<"public"> = {};

  if (access_token) {
    options.global = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || "",
    options
  );

  return supabase;
};

export { getSupabase };
