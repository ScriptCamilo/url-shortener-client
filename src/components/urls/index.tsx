'use client';

import { useUrlContext } from '@/context/url.provider';
import { Url } from '../url';

export function Urls() {
  const data = useUrlContext();

  return (
    <div className="flex flex-col gap-4">
      {data?.urls.map((url) => <Url key={url.id} {...url} />)}
    </div>
  );
}
