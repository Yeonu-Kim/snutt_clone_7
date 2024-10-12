import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { LoadingPage } from '../../components/Loading';
import { Layout } from '../../components/styles/Layout';
import { ServiceContext } from '../../context/ServiceContext';
import { TokenAuthContext } from '../../context/TokenAuthContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';

export const MainPage = () => {
  const { contaminateToken, clearToken } = useGuardContext(TokenManageContext);
  const { userService, authService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);

  const { data: userData } = useQuery({
    queryKey: ['UserService', 'getUserInfo', { token }] as const,
    queryFn: ({ queryKey }) => userService.getUserInfo(queryKey[2]),
  });

  const handleClickContaminateButton = () => {
    contaminateToken('xxx');
  };

  const handleClickLogoutButton = () => {
    authService.logout();
    clearToken();
  };

  if (userData === undefined) return <LoadingPage />;

  if (userData.type === 'success') {
    return (
      <Layout>
        <div className="flex flex-col justify-between items-center h-dvh py-[200px]">
          <span className="text-xl font-bold">
            안녕하세요, {userData.data.nickname.nickname} #
            {userData.data.nickname.tag}님!
          </span>
          <div className="flex flex-col items-center gap-8">
            <button
              className="flex w-[300px] py-2 rounded bg-mint text-white justify-center"
              onClick={handleClickLogoutButton}
            >
              로그아웃
            </button>
            <div className="flex flex-col items-center gap-4">
              <span>개발자를 위한 버튼입니다.</span>
              <button
                className="flex w-[300px] py-2 rounded bg-orange text-white justify-center"
                onClick={handleClickContaminateButton}
              >
                잘못된 토큰 저장하기
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  toast.error(userData.message);
  return null;
};
