import { createBrowserClient as createBrowserClientSSR } from '@supabase/ssr';

import { envConfig } from '@/configs/env-config';
import { Database } from '@/types/database.types';

const supabaseUrl = envConfig.supabaseUrl;
const supabaseKey = envConfig.supabasePublishableKey;

export function createBrowserClient() {
  return createBrowserClientSSR<Database>(supabaseUrl, supabaseKey);
}
