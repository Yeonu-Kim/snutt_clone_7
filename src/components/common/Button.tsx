import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/designSystem';

const buttonVariants = cva(
  'w-full py-2 transition-colors duration-200 rounded-md',
  {
    variants: {
      variant: {
        default: 'text-white bg-orange hover:bg-orange-dark',
        mint: 'text-white bg-mint hover:bg-mint-dark',
        white: 'text-black bg-white hover:text-orange',
        gray: 'bg-gray-100 text-gray-500',
      },
      active: {
        default: 'cursor-pointer',
        disabled: 'cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      active: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  onClick?: () => void;
}

export const Button = ({
  children,
  onClick,
  className,
  variant,
  active,
}: ButtonProps) => {
  const disabled = active === 'disabled' ? true : false;
  return (
    <button
      className={cn(buttonVariants({ variant, active, className }))}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
