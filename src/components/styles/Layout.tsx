import { type ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-[375px] mx-auto w-full">
      {children}
    </div>
  );
};
