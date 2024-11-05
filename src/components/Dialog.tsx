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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] animate-popup relative">
        <h2 className="text-lg font-semibold mb-4">
          인증정보가 올바르지 않아요
        </h2>
        <p className="text-gray-600 mb-6">다시 로그인해 주세요</p>
        <div className="flex justify-center w-full">
          <button
            onClick={onClickButton}
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
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
      className="fixed flex justify-center items-center inset-0 z-50 flex items-end bg-black bg-opacity-50"
      onClick={onClick}
    >
      <div
        className={`flex flex-col gap-4 bg-white rounded-lg shadow-lg p-6 w-[300px] relative transition-transform duration-300 ${
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
