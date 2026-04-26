import { createServerClient as createServerClientSSR } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';
import { Database } from '@/types/database.types';

const supabaseUrl = envConfig.supabaseUrl;
const supabaseKey = envConfig.supabasePublishableKey;

export async function createServerClient() {
  const cookieStore = await cookies();

  return createServerClientSSR<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (error: unknown) {
          console.error(error);
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};
