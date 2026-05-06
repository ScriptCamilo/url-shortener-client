'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

interface CreateShortenerUrlDto {
  longUrl: string;
}

// TODO: Limit users to have only 5 urls
// TODO: Anonymous users should have a limit of 2 urls
// TODO: Add a cron job to delete anonymous users that are not used for a week
// TODO: Add a modal explaining to users that this is a study project and the data may be deleted at any time
export async function createUrl(payload: CreateShortenerUrlDto) {
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
