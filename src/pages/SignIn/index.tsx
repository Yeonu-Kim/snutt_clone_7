import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Layout } from '@/components/common/Layout';
import { LoadingPage } from '@/components/Loading';
import { ICON_SRC } from '@/constants/fileSource';
import { ModalManageContext } from '@/context/ModalManageContext';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenManageContext } from '@/context/TokenManageContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog';

export const SignInPage = () => {
  const { setOpen } = useGuardContext(ModalManageContext);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toMain } = useRouteNavigation();

  const { authService } = useGuardContext(ServiceContext);
  const { saveToken } = useGuardContext(TokenManageContext);
  const { showErrorDialog, showTBDDialog } = showDialog();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({
      inputId,
      inputPassword,
    }: {
      inputId: string;
      inputPassword: string;
    }) => authService.signIn({ id: inputId, password: inputPassword }),
    onSuccess: (response) => {
      if (response.type === 'success') {
        saveToken(response.data.token);
        setOpen(false);
        toMain();
      } else {
        showErrorDialog(response.message);
      }
    },
    onError: () => {
      showErrorDialog('로그인 중 문제가 발생했습니다.');
    },
  });

  const onClickButton = () => {
    if (id !== '' && password !== '') {
      signIn({ inputId: id, inputPassword: password });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && id !== '' && password !== '') {
      onClickButton();
    }
  };

  const onClickTBD = () => {
    showTBDDialog();
  };

  if (isPending) return <LoadingPage />;

  return (
    <Layout>
      <div className="LoginWrapper psm:px-2 lg:px:8 flex min-h-screen w-full flex-col items-center px-[20px]">
        <div className="LoginHeaderWrapper relative mt-4 flex w-full pb-6">
          <div className="BackButtonWrapper absolute left-0 top-0.5 flex cursor-pointer items-center">
            <Icon
              src={ICON_SRC.ARROW.DOWN}
              className="rotate-90"
              alt="화살표 아이콘"
            />
            <span className="text-gray-500 hover:text-orange" onClick={toMain}>
              뒤로
            </span>
          </div>
          <h1 className="w-full text-center text-xl font-semibold">로그인</h1>
        </div>
        <div className="LoginWrapper flex h-full w-full flex-auto flex-col justify-between pb-8">
          <div className="LoginFormWrapper w-full space-y-4">
            <div className="IDWrapper flex flex-col">
              <label htmlFor="id" className="mb-1">
                아이디
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="아이디를 입력하세요"
                className="border-b-2 border-gray py-1 text-sm focus:border-orange focus:outline-none"
              />
            </div>
            <div className="PasswordWrapper flex flex-col">
              <label htmlFor="password" className="mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호를 입력하세요"
                className="border-b-2 border-gray py-1 text-sm focus:border-orange focus:outline-none"
              />
            </div>
            <div className="FindIdPwWrapper justify-left flex gap-2 py-4 text-sm text-gray-500">
              <a onClick={onClickTBD} className="underline hover:text-orange">
                아이디 찾기
              </a>
              <span>|</span>
              <a onClick={onClickTBD} className="underline hover:text-orange">
                비밀번호 찾기
              </a>
            </div>
          </div>
          <Button
            className={` ${id !== '' && password !== '' ? '' : 'disable'}`}
            onClick={onClickButton}
            disabled={!(id !== '' && password !== '')}
          >
            로그인
          </Button>
        </div>
      </div>
    </Layout>
  );
};
