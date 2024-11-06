'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface UrlProviderProps {
  children: React.ReactNode;
  initialData: UrlEntity[];
}

interface UrlContextValue {
  urls: UrlEntity[];
  setUrls: Dispatch<SetStateAction<UrlEntity[]>>;
}

export const UrlContext = createContext<UrlContextValue | undefined>(undefined);

export function useUrlContext() {
  return useContext(UrlContext);
}

export function UrlProvider({ children, initialData }: UrlProviderProps) {
  const [urls, setUrls] = useState(initialData || []);

  return <UrlContext.Provider value={{ urls, setUrls }}>{children}</UrlContext.Provider>;
}
