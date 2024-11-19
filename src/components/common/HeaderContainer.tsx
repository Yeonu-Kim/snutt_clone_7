import type { ReactNode } from 'react';

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex absolute t-0 l-0 w-full justify-between pt-2 pb-1.5 pl-4 p-3 border-solid border-b-lineLight bg-white
    dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
    >
      {children}
    </div>
  );
};
