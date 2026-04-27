import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Tables } from '@/types/database.types';

type AuthDropdownItemProps = {
  user: Partial<Tables<'profiles'>> | null;
};

export async function AuthDropdownItem({ user }: AuthDropdownItemProps) {
  console.log({ user })
  return (
    <DropdownMenuItem asChild>
      {user ? (
        <Link href="/logout">
          <LogOut />
          <span>Log out</span>
        </Link>
      ) : (
        <Link href="/login">
          <LogIn />
          <span>Login</span>
        </Link>
      )}
    </DropdownMenuItem>
  );
}
