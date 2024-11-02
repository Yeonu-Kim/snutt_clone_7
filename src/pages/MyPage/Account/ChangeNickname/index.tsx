import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { LoadingPage } from '@/components/Loading.tsx';
import { Navbar } from '@/components/Navbar.tsx';
import { ChangeNicknamePTag } from '@/components/styles/ChangeNicknamePTag.tsx';
import { Layout } from '@/components/styles/Layout.tsx';
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
  const [nickname, setNickname] = useState<string>();
  const queryClient = useQueryClient();

  const { mutate: changeNickname } = useMutation({
    mutationFn: ({ inputNickname }: { inputNickname: string }) => {
      if (token === null) {
        throw new Error();
      }
      return userService.patchUserInfo({
        token: token,
        body: { nickname: inputNickname },
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

  const onClickButton = () => {
    if (nickname !== undefined) {
      if (nickname !== '') {
        changeNickname({ inputNickname: nickname });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && nickname !== '') {
      onClickButton();
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
              <span onClick={toAccount}>&larr; 뒤로</span>
            </div>
            <div
              className="BackButtonWrapper absolute right-3 rounded-lg flex items-center
            cursor-pointer text-gray-500 hover:text-orange"
            >
              <span onClick={onClickButton}>저장</span>
            </div>
            <p className="font-bold">내 계정</p>
          </div>
          <div
            id="Main-Container"
            className="h-lvh flex flex-col justify-start items-center
            p-5 w-full mt-[60px] mb-[80px] bg-gray-200"
          >
            <ChangeNicknamePTag>
              <span>닉네임 (공백 포함 한/영/숫자 10자 이내)</span>
            </ChangeNicknamePTag>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder={userData.data.nickname.nickname}
              className="bg-white w-[335px] h-10 rounded-lg pl-4 mb-3 m-1"
            />
            <ChangeNicknamePTag>
              <span>최초 닉네임은 가입 시 임의 부여된 닉네임으로,</span>
            </ChangeNicknamePTag>
            <ChangeNicknamePTag className="mb-3">
              <span>
                앞의 이름을 변경할 시 4자리 숫자 태그는 자동 변경됩니다.
              </span>
            </ChangeNicknamePTag>
            <ChangeNicknamePTag className="mb-5">
              <span>변경된 닉네임은 나의 모든 친구에게 반영됩니다.</span>
            </ChangeNicknamePTag>
            <ChangeNicknamePTag className="font-bold">
              <span>닉네임 조건</span>
            </ChangeNicknamePTag>
            <ChangeNicknamePTag>
              <ul>- 불완전한 한글(예: ㄱ, ㅏ)은 포함될 수 없습니다.</ul>
              <ul>- 영문 대/소문자는 구분됩니다.</ul>
              <ul>
                - 상대에게 불쾌감을 주는 등 부적절한 닉네임은 관리자에 의해
                안내없이 수정될 수 있습니다.
              </ul>
            </ChangeNicknamePTag>
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
