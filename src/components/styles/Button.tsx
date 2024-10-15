import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'disable';
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
}: ButtonProps) => {
  const baseStyle =
    'w-[311px] h-[41px] transition-colors duration-200 rounded-md ';
  const variantStyle = {
    primary: 'cursor-pointer text-white bg-orange hover:bg-[#E07C2C]',
    secondary: 'cursor-pointer text-white bg-mint hover:bg-[#00A896]',
    disable: 'bg-gray-100 cursor-not-allowed text-gray-500',
  };
  const appliedStyle = disabled ? variantStyle.disable : variantStyle[variant];
  return (
    <button
      className={`${baseStyle} ${className} ${appliedStyle} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
