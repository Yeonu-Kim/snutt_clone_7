import { type ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-375 mx-auto w-full">
      {children}
    </div>
  );
};
