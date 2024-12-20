import type { ReactNode } from 'react';

type WhiteButtonBoxProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const WhiteButtonBox = ({
  children,
  className = '',
  onClick,
}: WhiteButtonBoxProps) => {
  return (
    <button
      className={`flex h-10 w-[335px] cursor-pointer items-center rounded-lg bg-white transition-colors duration-200 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
