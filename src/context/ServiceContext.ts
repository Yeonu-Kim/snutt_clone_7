import { createContext } from 'react';

import type { AuthService } from '@/usecases/authServices';
import type { UserService } from '@/usecases/userService';

export type ServiceContext = {
  authService: AuthService;
  userService: UserService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
