'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const isOpen = path === '/signup' || path === '/login';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        router.push('/');
      }
    }}>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Register a new user or Login to safely save your urls.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={path}
          className="w-[400px]"
          onValueChange={(value) => {
            if (value !== path) {
              router.push(value);
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="/signup">
              Signup
            </TabsTrigger>
            <TabsTrigger value="/login">
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="/signup">
            {children}
          </TabsContent>

          <TabsContent value="/login">
            {children}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
