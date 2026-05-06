'use client';

import { LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tables } from '@/types/database.types';
import { logout } from '@/actions';

interface AuthDropdownItemProps {
  user: Partial<Tables<'profiles'>> | null;
}

export function AuthDropdownItem({ user }: AuthDropdownItemProps) {
  const router = useRouter();
  const text = user ? 'Logout' : 'Login';
  const icon = user ? <LogOut /> : <LogIn />;
  const handleClick = async () => {
    if (user) {
      await logout();
    } else {
      router.push('/login');
    }
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      {icon}
      <span>{text}</span>
    </DropdownMenuItem>
  );
}
