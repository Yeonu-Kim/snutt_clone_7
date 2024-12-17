import react from '@woohm402/eslint-config-react';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['.yarn', '*.js'],
  },
  ...react({
    tsconfigRootDir: import.meta.dirname,
  }),
];
