export type User = {
  id: string;
  isAdmin: boolean;
  regDate: string;
  notificationCheckedAt: string;
  email?: string;
  local_id: string;
  fbName?: string;
  nickname: {
    nickname: string;
    tag: string;
  };
};
