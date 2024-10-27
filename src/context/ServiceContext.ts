import { createContext } from 'react';

import type { AuthService } from '@/usecases/authServices';
import type { TimeTableService } from '@/usecases/timeTableService';
import type { UserService } from '@/usecases/userService';

export type ServiceContext = {
  authService: AuthService;
  userService: UserService;
  timeTableService: TimeTableService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
