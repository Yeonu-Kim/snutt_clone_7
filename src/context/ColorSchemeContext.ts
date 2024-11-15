import { createContext } from 'react';

type ColorSchemeContext = {
  colorScheme: string | null;
  toggleColorScheme: () => void;
};

export const ColorSchemeContext = createContext<ColorSchemeContext | null>(
  null,
);
