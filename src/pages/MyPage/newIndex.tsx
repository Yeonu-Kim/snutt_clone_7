import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { TokenManageContext } from '@/context/TokenManageContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { showDialog } from '@/utils/showDialog.ts';
import { Button } from '@/components/styles/Button.tsx';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';

export const NewMyPage = () => {
  const { clearToken } = useGuardContext(TokenManageContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { userService, authService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toMain } = useRouteNavigation();

  const { data: userData, isError } = useQuery({
    queryKey: ['UserService', 'getUserInfo', token] as const,
    queryFn: ({ queryKey: [, , t] }) => {
      if (t === null) {
        throw new Error();
      }
      return userService.getUserInfo({ token: t });
    },
    enabled: token !== null,
  });

  if (isError) {
    setOpen(true);
    return null;
  }

  const handleClickLogoutButton = () => {
    authService.logout();
    clearToken();
    toMain();
  };

  if (userData === undefined) return <LoadingPage />;

  if (userData.type === 'success') {
    return (
      <Layout>
        <div
          id="Wrapper-Container"
          className="flex flex-col items-center w-full"
        >
          <div id="upper-bar" className="">
            <p>더보기</p>
          </div>
          <div
            id="Main-Container"
            className="flex flex-col items-center w-full"
          >
            <div id="Account" className="flex items-center">
              <div>내 계정</div>
              <div>
                {userData.data.nickname.nickname}
                {userData.data.nickname.tag}
              </div>
            </div>
            <Button variant="secondary" onClick={handleClickLogoutButton}>
              로그아웃
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  showErrorDialog(userData.message);
  return null;
};
