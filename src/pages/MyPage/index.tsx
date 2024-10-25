import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { Button } from '@/components/styles/Button.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { WhiteButtonBox } from '@/components/styles/WhiteButtonBox.tsx';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { TokenManageContext } from '@/context/TokenManageContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const MyPage = () => {
  const { clearToken } = useGuardContext(TokenManageContext);
  const { token } = useGuardContext(TokenAuthContext);
  const { userService, authService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toMain, toInformation } = useRouteNavigation();

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

  const handleClickInformationButton = () => {
    toInformation();
  };

  if (userData === undefined) return <LoadingPage />;

  if (userData.type === 'success') {
    return (
      <Layout>
        <div
          id="Wrapper-Container"
          className="flex flex-col items-center w-full min-h-screen"
        >
          <div
            id="upper-bar"
            className="w-full py-4 px-6 top-0 bg-white flex justify-center items-center fixed max-w-375"
          >
            <p>마이페이지</p>
          </div>
          <div
            id="Main-Container"
            className="h-lvh  flex flex-col justify-center items-center w-full mt-[60px] mb-[80px] bg-gray-200 gap-5"
          >
            <WhiteButtonBox
              className="flex items-center justify-between h-14"
              onClick={handleClickInformationButton}
            >
              <div className="m-4">내 계정</div>
              <div className="m-4">
                <span className="text-gray-400 ">
                  {userData.data.nickname.nickname}#{userData.data.nickname.tag}{' '}
                  {'>'}
                </span>
              </div>
            </WhiteButtonBox>
            <Button variant="secondary" onClick={handleClickLogoutButton}>
              로그아웃
            </Button>
          </div>
          <div className="bottom-0 w-full bg-white fixed max-w-375">
            <Navbar selectedMenu="mypage" />
          </div>
        </div>
      </Layout>
    );
  }

  showErrorDialog(userData.message);
  return null;
};
