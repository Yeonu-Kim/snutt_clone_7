import { createContext } from 'react';

import type { AuthService } from '@/usecases/authServices';
import type { ColorSchemeService } from '@/usecases/colorSchemeService.ts';
import type { CourseBookService } from '@/usecases/courseBookService';
import type { LectureService } from '@/usecases/lectureService';
import type { TimeTableService } from '@/usecases/timeTableService';
import type { UserService } from '@/usecases/userService';

export type ServiceContext = {
  authService: AuthService;
  userService: UserService;
  timeTableService: TimeTableService;
  courseBookService: CourseBookService;
  lectureService: LectureService;
  colorSchemeService: ColorSchemeService;
};

export const ServiceContext = createContext<ServiceContext | null>(null);
