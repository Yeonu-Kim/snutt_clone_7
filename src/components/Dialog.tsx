import type { ReactNode } from 'react';

import { ServiceContext } from '../context/ServiceContext.ts';
import { TokenManageContext } from '../context/TokenManageContext.ts';
import { useGuardContext } from '../hooks/useGuardContext.ts';
import { useRouteNavigation } from '../hooks/useRouteNavigation.ts';

export const ReSignInDialog = () => {
  const { toSignIn } = useRouteNavigation();
  const { authService } = useGuardContext(ServiceContext);
  const { clearToken } = useGuardContext(TokenManageContext);

  const onClickButton = () => {
    authService.logout();
    clearToken();
    toSignIn();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[300px] animate-popup rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">
          인증정보가 올바르지 않아요
        </h2>
        <p className="mb-6 text-gray-600">다시 로그인해 주세요</p>
        <div className="flex w-full justify-center">
          <button
            onClick={onClickButton}
            className="rounded-md bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
          >
            로그인 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export const DialogContainer = ({
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
      className="fixed inset-0 z-50 flex items-end items-center justify-center bg-black bg-opacity-50"
      onClick={onClick}
    >
      <div
        className={`relative flex w-[300px] flex-col gap-4 rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ${
          isVisible ? 'animate-popup' : 'animate-popout'
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
