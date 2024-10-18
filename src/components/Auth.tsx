import type { ReactNode } from 'react';

import { ReSignInModal } from '@/components/Modal';
import { ModalManageContext } from '@/context/ModalManageContext';
import { useGuardContext } from '@/hooks/useGuardContext';

export const AuthProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isModalOpen } = useGuardContext(ModalManageContext);

  return isModalOpen ? <ReSignInModal /> : <>{children}</>;
};
