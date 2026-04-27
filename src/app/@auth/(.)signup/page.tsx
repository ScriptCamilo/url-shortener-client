'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { signup } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2).max(25),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function RegisterDialogForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await signup(values);
    const router = useRouter();

    if ('error' in response) {
      const title = 'Uh oh! Something went wrong';
      const description = response.error;

      return toast({
        title,
        description,
        variant: 'destructive',
      });
    }

    const title = 'Login successfully';

    toast({ title });

    return router.push('/');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel>Name</FormLabel>
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Input type="text" id="name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel>Email</FormLabel>
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Input type="text" id="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel>Password</FormLabel>
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Input type="password" id="name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
