import type { ReactNode } from 'react';

import { TokenAuthContext } from '../context/TokenAuthContext';
import { useGuardContext } from '../hooks/useGuardContext';
import { ReSignInModal } from './Modal';

export const AuthProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isTokenUnvalid } = useGuardContext(TokenAuthContext);

  return isTokenUnvalid ? <ReSignInModal /> : <>{children}</>;
};
