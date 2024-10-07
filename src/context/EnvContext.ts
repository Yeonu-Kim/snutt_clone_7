import { createContext } from 'react';

export type EnvContext = {
  API_BASE_URL: string;
};

export const EnvContext = createContext<EnvContext | null>(null);
