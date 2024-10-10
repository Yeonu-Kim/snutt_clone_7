import { createContext } from 'react';

type TokenAuthContext = {
  token: string;
  isTokenUnvalid: boolean;
};

export const TokenAuthContext = createContext<TokenAuthContext | null>(null);
