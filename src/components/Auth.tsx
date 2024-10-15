import type { ReactNode } from 'react';

import { ModalManageContext } from '../context/ModalManageContext';
import { TokenAuthContext } from '../context/TokenAuthContext';
import { useGuardContext } from '../hooks/useGuardContext';
import { ReSignInModal } from './Modal';

export const AuthProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isModalOpen } = useGuardContext(ModalManageContext);

  return isModalOpen ? <ReSignInModal /> : <>{children}</>;
};

export const AuthProtectedSwitchRoute = ({
  authorized,
  unauthorized,
}: {
  authorized: ReactNode;
  unauthorized: ReactNode;
}) => {
  const { token } = useGuardContext(TokenAuthContext);
  return token !== null ? (
    <AuthProtectedRoute>{authorized}</AuthProtectedRoute>
  ) : (
    <>{unauthorized}</>
  );
};
