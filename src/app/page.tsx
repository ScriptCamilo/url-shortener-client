import { Suspense } from 'react';

import { ProfileMenu } from '@/components/profile-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { UrlForm } from '@/components/url-form';
import { UrlsSkeleton } from '@/components/url-skeleton';
import { Urls } from '@/components/urls';
import { AvatarSkeleton } from '@/components/avatar-skeleton';

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex justify-between w-full max-w-3xl">
        <h1 className="font-bold text-2xl text-start">URL Shortener</h1>
        <div className="flex gap-2">
          <Suspense fallback={<AvatarSkeleton />}>
            <ProfileMenu />
          </Suspense>
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full h-full flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-3xl">
        <section className="w-full">
          <UrlForm />
        </section>

        <section className="w-full">
          <Suspense fallback={<UrlsSkeleton />}>
            <Urls />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
