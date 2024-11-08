export const PATH = {
  INDEX: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  MYPAGE: {
    ROOT: '/mypage',
    ACCOUNT: {
      ROOT: '/mypage/account',
      CHANGENICKNAME: '/mypage/account/change-nickname',
    },
  },
  SEARCH: '/search',
  LECTURE_DETAIL: '/timetables/:timetableId/lectures/:lectureId',
};

export const HREF = {
  LECTURE_DETAIL: (timetableId: string, lectureId: string) =>
    `/timetables/${timetableId}/lectures/${lectureId}`,
};
