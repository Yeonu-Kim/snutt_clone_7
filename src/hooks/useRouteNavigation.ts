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
    toInformation: () => {
      navigate(MYPAGE.INFORMATION.ROOT, { replace: true });
    },
    toNickname: () => {
      navigate(MYPAGE.INFORMATION.NICKNAME, { replace: true });
    },
  };
};
