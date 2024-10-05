import type { DateTime } from './types';

// Request
export type LocalLoginRequest = {
  id: string;
  password: string;
};

// Response
export type LocalLoginDto = {
  user_id: string;
  token: string;
  message: string;
};

type NicknameDto = {
  nickname: string;
  tag: string;
};

export type UserDto = {
  id: string;
  isAdmin: boolean;
  regDate: DateTime;
  notificationCheckedAt: DateTime;
  email?: string;
  localId: string;
  fbName?: string;
  nickname: NicknameDto;
};
