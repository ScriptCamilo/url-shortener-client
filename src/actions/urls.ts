'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

interface CreateShortenerUrlDto {
  longUrl: string;
}

  const supabase = await createServerClient();
  const { data } = await supabase.auth.getClaims();
  let user = data?.claims;

  if (!user) {
    await supabase.auth.signInAnonymously();
    const { data: claimsData } = await supabase.auth.getClaims();
    user = claimsData?.claims;
  }

  if (user) {
    const { data, error } = await supabase.rpc('create_short_code', {
      var_long_url: payload.longUrl,
      var_profile_id: user.sub,
    });

    if (error) {
      console.error(error);
      return { error: error.message };
    }

    revalidatePath('/');

    return data;
  }

  return { error: 'You must be logged in to create an URL' };
}

export async function getUrls() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (user) {
    const { data, error } = await supabase
      .from('urls')
      .select('*')
      .eq('profile_id', user.sub)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return { error, message: error.message };
    }

    return data;
  }

  return [];
}
