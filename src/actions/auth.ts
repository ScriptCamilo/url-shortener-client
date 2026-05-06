'use server';

import { createServerClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { getProfile } from './profile';
import { redirect } from 'next/navigation';

interface LoginBodyDto {
  email: string;
  password: string;
}

interface SignupBodyDto {
  name: string;
  email: string;
  password: string;
}

export async function signup(payload: SignupBodyDto) {
  const supabase = await createServerClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const user = claimsData?.claims;

  if (user?.is_anonymous) {
    const { error } = await supabase.auth.updateUser({
      email: payload.email,
      password: payload.password,
      data: {
        name: payload.name,
      },
    });

    if (error) {
      return { error: error.message };
    }

    const { error: refreshError } = await supabase.auth.refreshSession();

    if (refreshError) {
      return { error: refreshError.message };
    }

    return;
  }

  const { error } = await supabase.auth.signUp({
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

  const { error: refreshError } = await supabase.auth.refreshSession();

  if (refreshError) {
    return { error: refreshError.message };
  }
}

export async function login(payload: LoginBodyDto) {
  const supabase = await createServerClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const user = claimsData?.claims;

  if (!user || user.is_anonymous) {
    const { data, error } = await supabase.auth.signInWithPassword(payload);

    if (error) {
      return { error: error.message };
    }

    return data.user;
  }

  return { error: 'You are already logged in' };
}

export async function logout() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  revalidatePath('/');
}
