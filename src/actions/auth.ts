'use server';

import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';
import { createServerClient } from '@/lib/supabase';

interface LoginBodyDto {
  email: string;
  password: string;
}

// export async function login(loginBody: LoginBodyDto) {
//   const loginPath = `${envConfig.backendUrl}auth/login`;

//   try {
//     const response = await fetch(loginPath, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       body: JSON.stringify(loginBody),
//     });

//     if (response.ok) {
//       const { access_token: accessToken } = await response.json();
//       (await cookies()).set('access_token', accessToken);
//       return { ok: true };
//     }

//     const handledError = await response.json();
//     return handledError;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function login() {}

export async function logout() {
  (await cookies()).delete('access_token');
  return { ok: true };
}

export async function loginAnonymous() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signInAnonymously();

  console.log({ data, error });

  return data.user;
}
