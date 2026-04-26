import { Cloud, Github, LifeBuoy, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { envConfig } from '@/configs/env-config';
import { UserEntity } from '@/types/user-entity';

import { AuthDropdownItem } from '../auth-dropdown-item';
import { ForwardDropdownItem } from '../forward-dropdown-item';
import { Avatar, AvatarFallback } from '../ui/avatar';

type ProfileMenuProps = {
  user: UserEntity | null;
};

export function ProfileMenu({ user }: ProfileMenuProps) {
  const githubUrl = 'https://github.com/ScriptCamilo/url-shortener-client';
  const [firstName, secondName] = user ? user.name.split(' ') : [];
  const firstNameLetter = firstName ? firstName[0].toUpperCase() : null;
  let secondNameLetter = secondName ? secondName[0].toUpperCase() : null;

  if (!secondNameLetter && firstName && firstNameLetter) {
    secondNameLetter = firstName[1]?.toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Avatar className="cursor-pointer select-none">
            <AvatarFallback>{`${firstNameLetter}${secondNameLetter}`}</AvatarFallback>
          </Avatar>
        ) : (
          <Button variant="outline">
            <p>Sign In</p>
          </Button>
        )}
      </DropdownMenuTrigger>
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

        <ForwardDropdownItem url={githubUrl}>
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
