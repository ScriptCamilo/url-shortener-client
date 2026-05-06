import { getProfile } from '@/actions';
import { LogIn, LogOut } from 'lucide-react';

export async function AuthDropdownItemContent() {
  const user = await getProfile();
  const text = user ? 'Logout' : 'Login';

  return (
    <>
      {/* {user ? <LogOut /> : <LogIn />} */}
      <span>Logout</span>
    </>
  );
}
