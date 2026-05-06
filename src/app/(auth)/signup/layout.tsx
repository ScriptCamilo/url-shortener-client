import { redirect } from 'next/navigation';
import { getProfile } from '@/actions';

export default async function SignupLayout({ children }: { children: React.ReactNode }) {
  const user = await getProfile();

  // if (user) {
  //   redirect('/')
  // }

  // return children

  return redirect('/');
}
