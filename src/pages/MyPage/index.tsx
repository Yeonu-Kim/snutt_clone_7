import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { PTagOnTheWhiteBox } from '@/components/styles/PTagOnTheWhiteBox.tsx';
import { WhiteButtonBox } from '@/components/styles/WhiteButtonBox.tsx';
import { ColorSchemeContext } from '@/context/ColorSchemeContext.ts';
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
  const { toMain, toAccount, toColorScheme } = useRouteNavigation();
  const { colorScheme } = useGuardContext(ColorSchemeContext);

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
    toAccount();
  };

  const onClickTBD = () => {
    toast('아직 없는 기능이에요.', {
      icon: '🔔',
    });
  };

  if (userData === undefined) return <LoadingPage />;

  if (userData.type === 'success') {
    return (
      <Layout>
        <div
          id="Wrapper-Container"
          className="flex min-h-screen w-full flex-col items-center dark:bg-gray-950"
        >
          <div
            id="upper-bar"
            className="fixed top-0 flex w-full max-w-375 items-center justify-center bg-white px-6 py-4 dark:bg-gray-800 dark:text-gray-200"
          >
            <p className="font-bold">마이페이지</p>
          </div>
          <div
            id="Main-Container"
            className="mb-[80px] mt-[60px] flex h-lvh w-full flex-col items-center justify-center gap-5 bg-gray-200 dark:bg-gray-950 dark:text-gray-200"
          >
            <WhiteButtonBox
              className="flex h-12 items-center justify-between"
              onClick={handleClickInformationButton}
            >
              <div className="m-4">내 계정</div>
              <div className="m-4">
                <span className="text-gray-400">
                  {userData.data.nickname.nickname}#{userData.data.nickname.tag}{' '}
                  {'>'}
                </span>
              </div>
            </WhiteButtonBox>
            <div className="flex flex-col items-center justify-between">
              <PTagOnTheWhiteBox>
                <span>디스플레이</span>
              </PTagOnTheWhiteBox>
              <WhiteButtonBox
                className="justify-between rounded-b-[0] rounded-t-lg border-b border-gray-300"
                onClick={toColorScheme}
              >
                <span className="m-4">색상모드</span>
                <span className="m-4 text-gray-400">
                  {colorScheme === 'light' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
                </span>
              </WhiteButtonBox>
              <WhiteButtonBox
                className="justify-between rounded-b-[0] rounded-t-[0] border-b border-gray-300"
                onClick={onClickTBD}
              >
                <span className="m-4">시간표 설정</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
              <WhiteButtonBox
                className="justify-between rounded-t-[0]"
                onClick={onClickTBD}
              >
                <span className="m-4">시간표 테마</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <PTagOnTheWhiteBox>
                <span>서비스</span>
              </PTagOnTheWhiteBox>
              <WhiteButtonBox className="justify-between">
                <span className="m-4" onClick={onClickTBD}>
                  빈자리 알림
                </span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <PTagOnTheWhiteBox>
                <span>정보 및 제안</span>
              </PTagOnTheWhiteBox>
              <WhiteButtonBox className="justify-between rounded-b-[0] border-b border-gray-300">
                <span className="m-4">버전 정보</span>
                <span className="m-4 text-gray-400">Waffle team07</span>
              </WhiteButtonBox>
              <WhiteButtonBox
                className="justify-between rounded-t-[0]"
                onClick={onClickTBD}
              >
                <span className="m-4">개발자 정보</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox className="justify-between" onClick={onClickTBD}>
                <span className="m-4">개발자 괴롭히기</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <WhiteButtonBox
              className="justify-between"
              onClick={handleClickLogoutButton}
            >
              <span className="m-4 text-red">로그아웃</span>
            </WhiteButtonBox>
          </div>
          <div className="fixed bottom-0 w-full max-w-375 bg-white">
            <Navbar selectedMenu="mypage" />
          </div>
        </div>
      </Layout>
    );
  }

  showErrorDialog(userData.message);
  return null;
};
