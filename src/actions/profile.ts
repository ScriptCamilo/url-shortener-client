'use server';

import { access } from 'fs';
import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';
import { createServerClient } from '@/lib/supabase';
import { Tables } from '@/types/database.types';

export async function getProfile(): Promise<Partial<Tables<'profiles'>> | null> {
  const supabase = await createServerClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const userName = user?.user_metadata?.name;

  if (user && !user.is_anonymous) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (userName) {
      return { name: userName, id: user.sub };
    }

    const { data } = await supabase.from('profiles').select('name, id').eq('id', user.sub).single();
    return data;
  }

  return null;
}
