'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createUrl } from '@/actions/urls';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUrlContext } from '@/context/url.provider';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  longUrl: z.string().url(),
});

export function UrlForm() {
  const urlContext = useUrlContext();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await createUrl(values);

    if (!response?.error) {
      urlContext?.setUrls((prevUrls) => [response, ...prevUrls]);

      form.reset();
      return toast({ title: 'Url created successfully!' });
    }

    const title = 'Uh oh! Something went wrong';
    const description = response?.message || 'There was a problem with your request.';

    toast({
      title,
      description,
      variant: 'destructive',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 w-full">
        <FormField
          control={form.control}
          name="longUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-2 items-center">
                <FormLabel>Long URL</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="bg-input w-full"
                  placeholder="https://example.com"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="rounded-full flex-shrink-0 w-10 h-10 p-2 bg-primary self-end hover:bg-primary/80"
        >
          <Plus className="text-secondary dark:text-secondary-foreground" />
        </Button>

        {/* <div className="flex items-center gap-4 w-full">*/}
      </form>
    </Form>
  );
}
