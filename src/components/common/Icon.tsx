import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/utils/designSystem';

const iconVariants = cva('', {
  variants: {
    size: {
      default: 'w-6 h-6',
      sm: 'w-4 h-4',
      lg: 'w-11 h-11',
    },
    darkModeInvert: {
      default: 'dark:brightness-0 dark:invert dark:filter',
      none: '',
    },
  },
  defaultVariants: {
    size: 'default',
    darkModeInvert: 'default',
  },
});

interface IconProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof iconVariants> {
  onClick?: () => void;
}

export const Icon = ({
  src,
  alt,
  size,
  darkModeInvert,
  className,
  onClick,
}: IconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(iconVariants({ size, darkModeInvert, className }))}
    >
      <img src={src} alt={alt} className="object-cover" />
    </button>
  );
};
