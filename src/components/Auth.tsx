import type { ReactNode } from 'react';

import { ModalManageContext } from '../context/ModalManageContext';
import { useGuardContext } from '../hooks/useGuardContext';
import { ReSignInModal } from './Modal';

export const AuthProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isModalOpen } = useGuardContext(ModalManageContext);

  return isModalOpen ? <ReSignInModal /> : <>{children}</>;
};
