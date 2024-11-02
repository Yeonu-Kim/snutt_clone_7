import { createContext } from 'react';

import type { AuthService } from '@/usecases/authServices';
import type { CourseBookService } from '@/usecases/courseBookService';
import type { TimeTableService } from '@/usecases/timeTableService';
import type { UserService } from '@/usecases/userService';

export type ServiceContext = {
  authService: AuthService;
  userService: UserService;
  timeTableService: TimeTableService;
  courseBookService: CourseBookService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
