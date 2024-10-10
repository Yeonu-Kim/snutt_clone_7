import { createContext } from 'react';

type TokenAuthContext = {
  token: string;
  isTokenError: boolean;
};

export const TokenAuthContext = createContext<TokenAuthContext | null>(null);
