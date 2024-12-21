import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Layout } from '@/components/common/Layout';
import { OptionLabel } from '@/components/common/OptionLabel';
import { LoadingPage, SpinnerLoading } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { ModalManageContext } from '@/context/ModalManageContext.ts';
import { ServiceContext } from '@/context/ServiceContext.ts';
import { TokenAuthContext } from '@/context/TokenAuthContext.ts';
import { useGuardContext } from '@/hooks/useGuardContext.ts';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog.ts';

export const ChangeNicknamePage = () => {
  const { token } = useGuardContext(TokenAuthContext);
  const { userService } = useGuardContext(ServiceContext);
  const { setOpen } = useGuardContext(ModalManageContext);
  const { showErrorDialog } = showDialog();
  const { toAccount } = useRouteNavigation();
  const [nickname, setNickname] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate: changeNickname, isPending } = useMutation({
    mutationFn: ({ inputNickname }: { inputNickname: string }) => {
      if (token === null) {
        throw new Error();
      }
      return userService.patchUserInfo({
        token: token,
        nickname: inputNickname,
      });
    },
    onSuccess: async (response) => {
      if (response.type === 'success') {
        await queryClient.invalidateQueries({
          queryKey: ['UserService', 'getUserInfo', token],
        });
        toAccount();
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('로그인 중 문제가 발생했습니다.');
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname !== '') {
      changeNickname({ inputNickname: nickname });
    }
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
        {isPending && <SpinnerLoading />}
        <div
          id="Wrapper-Container"
          className="flex min-h-screen w-full flex-col items-center dark:bg-gray-950"
        >
          <div
            id="upper-bar"
            className="fixed top-0 flex w-full max-w-375 items-center justify-center bg-white px-6 py-4 dark:bg-gray-800 dark:text-gray-200"
          >
            <div className="BackButtonWrapper absolute left-3 flex cursor-pointer items-center rounded-lg text-gray-500 hover:text-orange dark:text-gray-200">
              <span onClick={toAccount}>&larr; 뒤로</span>
            </div>
            <div className="BackButtonWrapper absolute right-3 flex cursor-pointer items-center rounded-lg text-gray-500 hover:text-orange dark:text-gray-200">
              <button type="submit" form="changeNicknameForm">
                저장
              </button>
            </div>
            <p className="font-bold">내 계정</p>
          </div>
          <div
            id="Main-Container"
            className="mb-[80px] mt-[60px] flex h-lvh w-full flex-col items-center justify-start bg-gray-200 p-5 dark:bg-gray-950 dark:text-gray-200"
          >
            <OptionLabel>
              <span>닉네임 (공백 포함 한/영/숫자 10자 이내)</span>
            </OptionLabel>
            <form id="changeNicknameForm" onSubmit={onSubmit}>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                disabled={isPending}
                placeholder={userData.data.nickname.nickname}
                className="m-1 mb-3 h-10 w-[335px] rounded-lg bg-white pl-4 dark:bg-gray-800 dark:text-gray-200"
              />
            </form>
            <OptionLabel>
              <span>최초 닉네임은 가입 시 임의 부여된 닉네임으로,</span>
            </OptionLabel>
            <OptionLabel className="mb-3">
              <span>
                앞의 이름을 변경할 시 4자리 숫자 태그는 자동 변경됩니다.
              </span>
            </OptionLabel>
            <OptionLabel className="mb-5">
              <span>변경된 닉네임은 나의 모든 친구에게 반영됩니다.</span>
            </OptionLabel>
            <OptionLabel className="font-bold">
              <span>닉네임 조건</span>
            </OptionLabel>
            <OptionLabel>
              <span>- 불완전한 한글(예: ㄱ, ㅏ)은 포함될 수 없습니다.</span>
              <span>- 영문 대/소문자는 구분됩니다.</span>
              <span>
                - 상대에게 불쾌감을 주는 등 부적절한 닉네임은 관리자에 의해
                안내없이 수정될 수 있습니다.
              </span>
            </OptionLabel>
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
