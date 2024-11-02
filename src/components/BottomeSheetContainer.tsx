import type { ReactNode } from 'react';

export const BottomSheetContainer = ({
  isVisible,
  onClick,
  children,
}: {
  isVisible: boolean;
  onClick(): void;
  children: ReactNode;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={onClick}
    >
      <div
        className={`w-full bg-white rounded-t-lg p-6 pb-10 transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
