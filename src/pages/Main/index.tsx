import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/styles/Button';
import { Layout } from '@/components/styles/Layout';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenAuthContext } from '@/context/TokenAuthContext';
import { TokenManageContext } from '@/context/TokenManageContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { showDialog } from '@/utils/showDialog';

export const MainPage = () => {
  const { contaminateToken, clearToken } = useGuardContext(TokenManageContext);
  const { userService, authService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { showErrorDialog } = showDialog();

  const { data: userData } = useQuery({
    queryKey: ['UserService', 'getUserInfo', token] as const,
    queryFn: ({ queryKey }) => {
      // token이 null이 아닐 때 실행되도 getUserInfo 안에서는 string | null이 들어갈 수 없음.
      // 241015 연우: 이렇게 강제로 string 타입을 지정해도 되는지?
      return userService.getUserInfo({ token: queryKey[2] as string });
    },
    enabled: token !== null,
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
            <Button variant="secondary" onClick={handleClickLogoutButton}>
              로그아웃
            </Button>
            <div className="flex flex-col items-center gap-4">
              <span>개발자를 위한 버튼입니다.</span>
              <Button
                className="flex w-[300px] py-2 rounded bg-orange text-white justify-center"
                onClick={handleClickContaminateButton}
              >
                잘못된 토큰 저장하기
              </Button>
            </div>
          </div>
        </div>
        <Navbar selectedMenu="timetable" />
      </Layout>
    );
  }

  showErrorDialog(userData.message);
  return null;
};
