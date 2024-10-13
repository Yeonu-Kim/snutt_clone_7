import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="w-[375px]">{children}</div>
    </div>
  );
};
