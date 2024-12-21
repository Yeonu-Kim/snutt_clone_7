import type { ReactNode } from 'react';

type ChangeNicknamePTagProps = {
  children: ReactNode;
  className?: string;
};

export const OptionLabel = ({
  children,
  className = '',
}: ChangeNicknamePTagProps) => {
  return (
    <p
      className={`w-full pl-3.5 text-left text-[12px] text-gray-500 ${className}`}
    >
      {children}
    </p>
  );
};
