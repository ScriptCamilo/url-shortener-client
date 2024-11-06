'use server';

import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';

interface RegisterBodyDto {
  name: string;
  email: string;
  password: string;
}

export async function register(data: RegisterBodyDto) {
  const registerUrl = `${envConfig.backendUrl}/users/register`;

  const response = await fetch(registerUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const { access_token: accessToken, ...user } = await response.json();
    cookies().set('access_token', accessToken);
    return user;
  }
}

export async function getUser() {
  const userUrl = `${envConfig.backendUrl}users/me`;
  const accessToken = cookies().get('access_token');
  const bearerToken = `Bearer ${accessToken?.value}`;

  if (!accessToken?.value) return null;

  try {
    const response = await fetch(userUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    console.error(error);
  }
}
