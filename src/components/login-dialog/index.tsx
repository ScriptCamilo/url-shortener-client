'use client';

import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/context/auth.provider';

export function LoginDialog() {
  const data = useAuthContext();

  return (
    <Dialog open={data?.openLogin} onOpenChange={data?.setOpenLogin}>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Register a new user or Login to access the best features.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="register" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
