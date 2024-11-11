import { useNavigate } from 'react-router-dom';

import { HREF, PATH } from '@/constants/route.ts';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const {
    INDEX,
    MYPAGE,
    SIGNUP,
    SIGNIN,
    MYPAGE_ACCOUNT,
    MYPAGE_CHANGENICKNAME,
  } = PATH;
  const { LECTURE_DETAIL } = HREF;

  return {
    toMain: () => {
      navigate(INDEX, { replace: true });
    },
    toSignIn: () => {
      navigate(SIGNIN, { replace: true });
    },
    toSignUp: () => {
      navigate(SIGNUP, { replace: true });
    },
    toMypage: () => {
      navigate(MYPAGE, { replace: true });
    },
    toAccount: () => {
      navigate(MYPAGE_ACCOUNT, { replace: true });
    },
    toChangeNickname: () => {
      navigate(MYPAGE_CHANGENICKNAME, { replace: true });
    },
    toLectureDetailPage: ({
      timetableId,
      lectureId,
    }: {
      timetableId: string;
      lectureId: string;
    }) => {
      navigate(LECTURE_DETAIL(timetableId, lectureId), { replace: true });
    },
  };
};
