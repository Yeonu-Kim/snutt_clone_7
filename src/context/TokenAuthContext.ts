import { createContext } from 'react';

type TokenAuthContext = {
  token: string | null;
};

export const TokenAuthContext = createContext<TokenAuthContext | null>(null);
