import { createContext } from 'react';
export type TokenManageContext = {
  saveToken: (token: string) => void;
  clearToken: () => void;
};

export const TokenManageContext = createContext<TokenManageContext | null>(
  null,
);
