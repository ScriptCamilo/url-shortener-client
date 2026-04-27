'use server';

import { access } from 'fs';
import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';
import { createServerClient } from '@/lib/supabase';
import { Tables } from '@/types/database.types';

interface RegisterBodyDto {
  name: string;
  email: string;
  password: string;
}

// export async function register(data: RegisterBodyDto) {
//   const registerUrl = `${envConfig.backendUrl}/users/register`;

//   const response = await fetch(registerUrl, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify(data),
//   });

//   try {
//     if (response.ok) {
//       const { access_token: accessToken, ...user } = await response.json();
//       cookies().set('access_token', accessToken);
//       return user;
//     }

//     const handledError = await response.json();
//     return handledError;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getProfile() {
//   const userUrl = `${envConfig.backendUrl}users/me`;
//   const accessToken = cookies().get('access_token');
//   const bearerToken = `Bearer ${accessToken?.value}`;

//   if (!accessToken?.value) return null;

//   try {
//     const response = await fetch(userUrl, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: bearerToken,
//       },
//       method: 'GET',
//     });

//     if (response.ok) {
//       const user = await response.json();
//       return user;
//     }

//     const handledError = await response.json();
//     return handledError;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function signup(payload: RegisterBodyDto) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return data;
}

export async function getProfile(): Promise<Partial<Tables<'profiles'>> | null> {
  const supabase = await createServerClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (user && !user.is_anonymous) {
    const { data } = await supabase.from('profiles').select('name, id').eq('id', user.sub).single();
    return data;
  }

  return null;
}
