import { Cloud, Github, LifeBuoy, User } from 'lucide-react';

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
import { AuthDropdownItem } from '../auth-dropdown-item';
import { ForwardDropdownItem } from '../forward-dropdown-item';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface ProfileMenuProps {
  user: UserEntity | null;
}

export function ProfileMenu({ user }: ProfileMenuProps) {
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
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <ForwardDropdownItem url="https://github.com/ScriptCamilo/url-shortener">
          <Github />
          <span>GitHub</span>
        </ForwardDropdownItem>

        <DropdownMenuItem disabled>
          <LifeBuoy />
          <span>Support</span>
        </DropdownMenuItem>

        <ForwardDropdownItem url={`${envConfig.backendUrl}api`}>
          <Cloud />
          <span>API</span>
        </ForwardDropdownItem>

        <DropdownMenuSeparator />

        <AuthDropdownItem user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
