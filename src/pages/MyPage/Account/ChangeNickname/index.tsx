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
            p-5 w-full mt-[60px] mb-[80px] bg-gray-200"
          >
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5">
              닉네임 (공백 포함 한/영/숫자 10자 이내)
            </p>
            <input
              placeholder={userData.data.nickname.nickname}
              className="bg-white w-[335px] h-10 rounded-lg pl-4 mb-3 m-1"
            />
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5">
              최초 닉네임은 가입 시 임의 부여된 닉네임으로,
            </p>
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5 mb-3">
              앞의 이름을 변경할 시 4자리 숫자 태그는 자동 변경됩니다.
            </p>
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5 mb-5">
              변경된 닉네임은 나의 모든 친구에게 반영됩니다.
            </p>
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5 font-bold">
              닉네임 조건
            </p>
            <p className="text-gray-500 text-[12px] text-left w-full pl-3.5">
              <ul>- 불완전한 한글(예: ㄱ, ㅏ)은 포함될 수 없습니다.</ul>
              <ul>- 영문 대/소문자는 구분됩니다.</ul>
              <ul>
                - 상대에게 불쾌감을 주는 등 부적절한 닉네임은 관리자에 의해
                안내없이 수정될 수 있습니다.
              </ul>
            </p>
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
