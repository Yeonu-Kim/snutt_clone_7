import { useQuery } from '@tanstack/react-query';

import { Layout } from '@/components/common/Layout';
import { WhiteButtonBox } from '@/components/common/WhiteButtonBox';
import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { ColorSchemeContext } from '@/context/ColorSchemeContext.ts';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const ColorSchemePage = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { userService, colorSchemeService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toMypage } = useRouteNavigation();
  const { colorScheme, toggleColorScheme } =
    useGuardContext(ColorSchemeContext);

  const handleSetColorScheme = () => {
    toggleColorScheme();
    colorSchemeService.storeColorScheme({
      scheme: colorScheme === 'light' ? 'dark' : 'light',
    });
  };

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
            <div className="BackButtonWrapper absolute left-3 flex cursor-pointer items-center rounded-lg text-gray-500 hover:text-orange dark:text-gray-200">
              <span onClick={toMypage}>&larr; 뒤로</span>
            </div>
            <p className="font-bold">화면 모드</p>
          </div>
          <div
            id="Main-Container"
            className="mb-[80px] mt-[60px] flex h-lvh w-full flex-col items-center justify-start gap-5 bg-gray-200 p-5 dark:bg-gray-950"
          >
            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox
                className="flex items-center justify-between"
                onClick={handleSetColorScheme}
              >
                <span className="m-4">
                  {colorScheme === 'light' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
                </span>
              </WhiteButtonBox>
            </div>
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
