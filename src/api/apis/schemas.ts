import type { Lecture } from '@/entities/lecture';

import type { DateTime } from './types';

// Request
export type LocalLoginRequest = {
  id: string;
  password: string;
};

// Response
export type LocalLoginResponse = {
  user_id: string;
  token: string;
  message: string;
};

type NicknameResponse = {
  nickname: string;
  tag: string;
};

export type UserResponse = {
  id: string;
  isAdmin: boolean;
  regDate: DateTime;
  notificationCheckedAt: DateTime;
  email?: string;
  local_id: string;
  fbName?: string;
  nickname: NicknameResponse;
};

export type TimeTableResponse = {
  _id: string;
  user_id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
  updated_at: DateTime;
};
