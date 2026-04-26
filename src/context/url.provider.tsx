'use client';

import { Tables } from '@/types/database.types';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type Url = Tables<'urls'>;

interface UrlProviderProps {
  children: React.ReactNode;
  initialData: Url[];
}

interface UrlContextValue {
  urls: Url[];
  setUrls: Dispatch<SetStateAction<Url[]>>;
}

export const UrlContext = createContext<UrlContextValue | undefined>(undefined);

export function useUrlContext() {
  return useContext(UrlContext);
}

export function UrlProvider({ children, initialData }: UrlProviderProps) {
  const [urls, setUrls] = useState(initialData || []);

  return <UrlContext.Provider value={{ urls, setUrls }}>{children}</UrlContext.Provider>;
}
