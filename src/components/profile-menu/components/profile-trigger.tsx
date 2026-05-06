import { getProfile } from '@/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tables } from '@/types/database.types';

interface ProfileTriggerProps {
  user: Partial<Tables<'profiles'>> | null;
}

export async function ProfileTrigger({ user }: ProfileTriggerProps) {
  const [firstName, secondName] = user?.name ? user.name.split(' ') : [];
  const firstNameLetter = firstName ? firstName[0].toUpperCase() : null;
  let secondNameLetter = secondName ? secondName[0].toUpperCase() : null;

  if (!secondNameLetter && firstName && firstNameLetter) {
    secondNameLetter = firstName[1]?.toUpperCase();
  }

  if (user) {
    return (
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer select-none">
          <AvatarFallback>{`${firstNameLetter}${secondNameLetter}`}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    );
  }

  return (
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        <p>Sign In</p>
      </Button>
    </DropdownMenuTrigger>
  );
}
