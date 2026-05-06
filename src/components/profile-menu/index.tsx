import { Suspense } from 'react';
import { Github, LifeBuoy, User as UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { ForwardDropdownItem } from '@/components/forward-dropdown-item';
import { envConfig } from '@/configs/env-config';
import { AuthDropdownItem } from './components/auth-dropdown-item';
import { ProfileTrigger } from './components/profile-trigger';
import { getProfile } from '@/actions';

export async function ProfileMenu() {
  const user = await getProfile();

  return (
    <DropdownMenu modal={false}>
      <ProfileTrigger user={user} />

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <UserIcon />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <ForwardDropdownItem url={envConfig.githubUrl}>
          <Github />
          <span>GitHub</span>
        </ForwardDropdownItem>

        <DropdownMenuItem disabled>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <AuthDropdownItem user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
