import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { Layout } from '@/components/common/Layout';
import { NavigationHeader } from '@/components/header';
import { TextInput } from '@/components/input/Input';
import { LoadingPage } from '@/components/Loading';
import { ModalManageContext } from '@/context/ModalManageContext';
import { ServiceContext } from '@/context/ServiceContext';
import { TokenManageContext } from '@/context/TokenManageContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { useRouteNavigation } from '@/hooks/useRouteNavigation.ts';
import { showDialog } from '@/utils/showDialog';

export const SignInPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { showTBDDialog } = showDialog();
  const { signIn, isPending } = useSignIn();
  const { toMain } = useRouteNavigation();

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
      <div className="flex h-screen w-full flex-col items-center px-5">
        <NavigationHeader
          darkModeInvert="none"
          title="로그인"
          moveTo={toMain}
        />
        <div className="flex h-full w-full flex-auto flex-col justify-between pb-8">
          <div className="w-full space-y-4">
            <div className="flex flex-col">
              <label htmlFor="id" className="mb-1">
                아이디
              </label>
              <TextInput
                id="id"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1">
                비밀번호
              </label>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="justify-left flex gap-2 py-4 text-sm text-gray-500">
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

const useSignIn = () => {
  const { setOpen } = useGuardContext(ModalManageContext);
  const { authService } = useGuardContext(ServiceContext);
  const { saveToken } = useGuardContext(TokenManageContext);
  const { showErrorDialog } = showDialog();
  const { toMain } = useRouteNavigation();

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

  return { signIn, isPending };
};
