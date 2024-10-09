import { createContext } from 'react';
export type TokenManageContext = {
  getToken: () => string | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
};

export const TokenManageContext = createContext<TokenManageContext | null>(
  null,
);
