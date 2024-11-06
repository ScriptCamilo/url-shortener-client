'use client';

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  openLogin: boolean;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ openLogin, setOpenLogin }}>{children}</AuthContext.Provider>
  );
}
