import { cn } from '@/utils/designSystem';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'password';
};

export const TextInput = ({
  type,
  value,
  id,
  onChange,
  onKeyDown,
  placeholder,
  className,
}: InputProps) => {
  return (
    <input
      type={type === 'password' ? 'password' : 'text'}
      id={id}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={cn(
        'border-b-2 border-gray py-1 text-sm focus:border-orange focus:outline-none',
        className,
      )}
    />
  );
};
