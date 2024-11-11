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
  LECTURE_LIST: '/timetables/:timetableId/lectures',
  LECTURE_DETAIL: '/timetables/:timetableId/lectures/:lectureId',
};

export const HREF = {
  LECTURE_LIST: (timetableId: string) =>
    `/timetables/:${timetableId}/lectures`,
  LECTURE_DETAIL: (timetableId: string, lectureId: string) =>
    `/timetables/${timetableId}/lectures/${lectureId}`,
};
