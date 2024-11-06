'use server';

import { cookies } from 'next/headers';

import { envConfig } from '@/configs/env-config';

interface CreateShortenerUrlDto {
  longUrl: string;
}

interface HeadersDto {
  [key: string]: string;
}

export async function createUrl(data: CreateShortenerUrlDto) {
  const url = `${envConfig.backendUrl}/urls`;

  const accessToken = cookies().get('access_token');
  const bearerToken = `Bearer ${accessToken?.value}`;
  const headers: HeadersDto = {
    'Content-Type': 'application/json',
  };

  if (accessToken?.value) headers['Authorization'] = bearerToken;

  const response = await fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const url = await response.json();
    return url;
  }
}

export async function getUrls() {
  const url = `${envConfig.backendUrl}/urls`;
  const accessToken = cookies().get('access_token');
  const bearerToken = `Bearer ${accessToken?.value}`;

  if (!accessToken?.value) return null;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: bearerToken,
      },
      method: 'GET',
    });

    if (response.ok) {
      const urls = await response.json();
      return urls;
    }
  } catch (error) {
    console.error(error);
  }
}
