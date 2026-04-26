import { getUrls } from '@/actions/urls';
import { Suspense } from 'react';

import { Url } from '../url';
import { UrlsSkeleton } from "../url-skeleton"

export async function Urls() {
  const urls = await getUrls();

  if ('error' in urls) return null;

  return (
    <div className="flex flex-col gap-4">
      {urls?.map((url) => (
        <Url key={url.id} {...url} />
      ))}
    </div>
  );
}
