import { Github, LifeBuoy, User as UserIcon } from 'lucide-react';

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

import { AuthDropdownItem } from '@/components/auth-dropdown-item';
import { ForwardDropdownItem } from '@/components/forward-dropdown-item';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getProfile } from '@/actions/profile';

export async function ProfileMenu() {
  const user = await getProfile();
  const githubUrl = 'https://github.com/ScriptCamilo/url-shortener-client';
  const [firstName, secondName] = user?.name ? user.name.split(' ') : [];
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
