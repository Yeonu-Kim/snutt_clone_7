import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Layout } from '@/components/common/Layout';
import { WhiteButtonBox } from '@/components/common/WhiteButtonBox';
import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const AccountPage = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { userService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toMypage, toChangeNickname } = useRouteNavigation();

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

  const copyNicknameToClipboard = async () => {
    if (userData.type === 'success') {
      await navigator.clipboard.writeText(
        `${userData.data.nickname.nickname}#${userData.data.nickname.tag}`,
      );
    } else {
      toast.error('몬가... 발생했습니다...');
    }
  };

  const handleClickCopyNickname = () => {
    copyNicknameToClipboard()
      .then(() => toast('닉네임을 복사했습니다.'))
      .catch(() => toast.error('몬가... 발생했습니다...'));
  };

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
            <p className="font-bold">내 계정</p>
          </div>
          <div
            id="Main-Container"
            className="mb-[80px] mt-[60px] flex h-lvh w-full flex-col items-center justify-start gap-5 bg-gray-200 p-5 dark:bg-gray-950 dark:text-gray-200"
          >
            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox
                onClick={toChangeNickname}
                className="flex items-center justify-between rounded-b-[0] border-b border-gray-300"
              >
                <span className="m-4">닉네임 변경</span>
                <div className="m-4">
                  <span className="text-gray-400">
                    {userData.data.nickname.nickname}#
                    {userData.data.nickname.tag} {'>'}
                  </span>
                </div>
              </WhiteButtonBox>
              <WhiteButtonBox
                onClick={handleClickCopyNickname}
                className="flex items-center justify-between rounded-t-[0]"
              >
                <span className="m-4">닉네임 복사하기</span>
                <span className="m-4 text-gray-400"></span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox className="flex items-center justify-between">
                <span className="m-4">아이디 / 비밀번호 추가</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox className="flex items-center justify-between">
                <span className="m-4">SNS 계정 연동 및 해제</span>
                <span className="m-4 text-gray-400">{'>'}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox className="flex items-center justify-between">
                <span className="m-4">이메일</span>
                <span className="m-4 text-gray-400">{userData.data.email}</span>
              </WhiteButtonBox>
            </div>

            <div className="flex flex-col items-center justify-between">
              <WhiteButtonBox className="flex items-center justify-between">
                <span className="m-4 text-red">회원 탈퇴</span>
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
