import { Suspense } from 'react';

import { ProfileMenu } from '@/components/account-menu';
import { LoginDialog } from '@/components/login-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { UrlForm } from '@/components/url-form';
import { UrlsSkeleton } from '@/components/url-skeleton';
import { Urls } from '@/components/urls';
import { AuthProvider } from '@/context/auth.provider';
import { UrlProvider } from '@/context/url.provider';

export default async function Home() {
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="flex justify-between w-full max-w-3xl">
          <h1 className="font-bold text-2xl text-start">URL Shortener</h1>
          <div className="flex gap-2">
            <ProfileMenu />
            <ThemeToggle />
          </div>
        </header>

        <main className="w-full h-full flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl">
          <UrlProvider initialData={[]}>
            <section className="w-full">
              <UrlForm />
            </section>

            <section className="w-full">
              <Suspense fallback={<UrlsSkeleton />}>
                <Urls />
              </Suspense>
            </section>
          </UrlProvider>
        </main>
      </div>
    </>
  );
}
