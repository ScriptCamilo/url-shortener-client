'use server';

import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';

interface LoginBodyDto {
  email: string;
  password: string;
}

export async function login(loginBody: LoginBodyDto) {
  const loginPath = `${envConfig.backendUrl}auth/login`;

  try {
    const response = await fetch(loginPath, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(loginBody),
    });

    if (response.ok) {
      const { access_token: accessToken } = await response.json();
      cookies().set('access_token', accessToken);
      return { ok: true };
    }

    const handledError = await response.json();
    return handledError;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  cookies().delete('access_token');
  return { ok: true };
}
