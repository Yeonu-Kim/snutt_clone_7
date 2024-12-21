import type { ReactNode } from 'react';

type LabelContainerProps = {
  children: ReactNode;
  label: string;
  id: string;
};

export const LabelContainer = ({
  children,
  label,
  id,
}: LabelContainerProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      {children}
    </div>
  );
};
