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
      className={`bg-white w-[335px] h-10 rounded-lg
              cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
