import type { ReactNode } from 'react';

export const BottomSheetContainer = ({
  isVisible,
  onClick,
  children,
  bgColor = 'bg-white',
  padding = '',
  heightClass = '',
}: {
  isVisible: boolean;
  onClick(): void;
  children: ReactNode;
  bgColor?: string;
  padding?: string;
  heightClass?: string;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={onClick}
    >
      <div
        className={`w-full ${bgColor} ${heightClass} rounded-t-lg ${padding} transform pb-10 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } dark:bg-gray-800`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
