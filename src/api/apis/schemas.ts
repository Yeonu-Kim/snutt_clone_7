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
  localId: string;
  fbName?: string;
  nickname: NicknameResponse;
};
