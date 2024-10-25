import { useQuery } from '@tanstack/react-query';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const ChangeNickname = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { userService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toInformation } = useRouteNavigation();

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
          className="flex flex-col items-center w-full min-h-screen"
        >
          <div
            id="upper-bar"
            className="w-full py-4 px-6 top-0 bg-white flex justify-center items-center fixed max-w-375"
          >
            <div
              className="BackButtonWrapper absolute left-3 rounded-lg flex items-center
            cursor-pointer text-gray-500 hover:text-orange"
            >
              <span onClick={toInformation}>&larr; 뒤로</span>
            </div>
            <div
              className="BackButtonWrapper absolute right-3 rounded-lg flex items-center
            cursor-pointer text-gray-500 hover:text-orange"
            >
              <span onClick={toInformation}>저장</span>
            </div>
            <p>내 계정</p>
          </div>
          <div
            id="Main-Container"
            className="h-lvh  flex flex-col justify-start items-center
            p-5 w-full mt-[60px] mb-[80px] bg-gray-200 gap-1"
          >
            <p className="text-gray-400 text-[14px] text-left w-full pl-3">
              닉네임 (공백 포함 한/영/숫자 10자 이내)
            </p>
            <input
              placeholder={userData.data.nickname.nickname}
              className="bg-white w-[335px] h-10 rounded-lg pl-4 m-1"
            />
            <button
              id="Account"
              className="flex items-center justify-between bg-white w-[335px] h-10 rounded-lg
              cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="m-4">닉네임 변경</div>
              <div className="m-4">
                <span className="text-gray-400 ">
                  {userData.data.nickname.nickname}#{userData.data.nickname.tag}{' '}
                  {'>'}
                </span>
              </div>
            </button>
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
