import type { ReactNode } from 'react';

type ChangeNicknamePTagProps = {
  children: ReactNode;
  className?: string;
};

export const PTagOnTheWhiteBox = ({
  children,
  className = '',
}: ChangeNicknamePTagProps) => {
  return (
    <p
      className={`text-gray-500 text-[12px] text-left w-full pl-3.5 ${className}`}
    >
      {children}
    </p>
  );
};
