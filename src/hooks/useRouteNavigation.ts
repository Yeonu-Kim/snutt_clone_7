import { useNavigate } from 'react-router-dom';

import { PATH } from '@/constants/route.ts';

export const useRouteNavigation = () => {
  const navigate = useNavigate();
  const { INDEX, MYPAGE, SIGNUP, SIGNIN } = PATH;

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
      navigate(MYPAGE.ROOT, { replace: true });
    },
    toAccount: () => {
      navigate(MYPAGE.ACCOUNT.ROOT, { replace: true });
    },
    toChangeNickname: () => {
      navigate(MYPAGE.ACCOUNT.CHANGENICKNAME, { replace: true });
    },
  };
};
