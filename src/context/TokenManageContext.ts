import { createContext } from 'react';

export type TokenManageContext = {
  saveToken: (token: string) => void;
  clearToken: () => void;
  contaminateToken: (wrongToken: string) => void;
};

export const TokenManageContext = createContext<TokenManageContext | null>(
  null,
);
