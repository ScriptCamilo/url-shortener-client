'use client';

import { LogIn, LogOut } from 'lucide-react';

import { logout } from '@/actions/auth';
import { useAuthContext } from '@/context/auth.provider';
import type { UserEntity } from '@/types/user-entity';

import { DropdownMenuItem } from '../ui/dropdown-menu';

type AuthDropdownItemProps = {
  user: UserEntity | null;
};

export function AuthDropdownItem({ user }: AuthDropdownItemProps) {
  const data = useAuthContext();

  const handleAuthentication = async () => {
    if (!user) {
      return data?.setOpenLogin(true);
    }

    const response = await logout();

    if (response.ok) console.log({ response });
  };

  return (
    <>
      <DropdownMenuItem onClick={handleAuthentication}>
        {user ? (
          <>
            <LogOut />
            <span>Log out</span>
          </>
        ) : (
          <>
            <LogIn />
            <span>Login</span>
          </>
        )}
      </DropdownMenuItem>
    </>
  );
}
