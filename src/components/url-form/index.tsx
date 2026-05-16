'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useRef, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

import {
  hasStudyDisclaimerAcknowledged,
  StudyProjectDisclaimerDialog,
} from '@/components/url-form/study-project-disclaimer-dialog';

const formSchema = z.object({
  longUrl: z.string().url().toLowerCase().trim(),
});

export function UrlForm() {
  const { toast } = useToast();
  const [studyDisclaimerOpen, setStudyDisclaimerOpen] = useState(false);
  const pendingSubmitRef = useRef<z.infer<typeof formSchema> | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: '',
    },
  });

  const runCreateUrl = async (values: z.infer<typeof formSchema>) => {
    const response = await createUrl(values);

    if ('error' in response) {
      const title = 'An error occurred while creating the URL';
      const description = response.error;

      return toast({
        title,
        description,
        variant: 'destructive',
      });
    }

    form.reset();
    return toast({ title: 'URL created successfully!' });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (typeof window !== 'undefined' && !hasStudyDisclaimerAcknowledged()) {
      pendingSubmitRef.current = values;
      setStudyDisclaimerOpen(true);
      return;
    }

    await runCreateUrl(values);
  };

  const handleStudyDisclaimerClosed = (open: boolean) => {
    setStudyDisclaimerOpen(open);
  };

  const dismissStudyDisclaimerWithoutContinue = () => {
    pendingSubmitRef.current = null;
  };

  const handleStudyDisclaimerContinue = async () => {
    const values = pendingSubmitRef.current;
    pendingSubmitRef.current = null;

    if (values) {
      await runCreateUrl(values);
    }
  };

  return (
    <Form {...form}>
      <StudyProjectDisclaimerDialog
        open={studyDisclaimerOpen}
        onOpenChange={handleStudyDisclaimerClosed}
        onContinue={handleStudyDisclaimerContinue}
        onDismissWithoutContinue={dismissStudyDisclaimerWithoutContinue}
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 w-full">
        <FormField
          control={form.control}
          name="longUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-2 items-center">
                <FormLabel>Long URL</FormLabel>
              </div>

              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="bg-input w-full"
                  placeholder="https://example.com"
                />
              </FormControl>
              <FormMessage />
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
