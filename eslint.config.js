import react from '@woohm402/eslint-config-react';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['.yarn', '*.js', '.next', 'build', 'next-env.d.ts'],
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...react({
    tsconfigRootDir: import.meta.dirname,
  }),
];
