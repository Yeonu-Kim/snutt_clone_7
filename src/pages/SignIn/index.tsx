import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { LoadingPage } from '../../components/Loading';
import { Button } from '../../components/styles/Button';
import { Layout } from '../../components/styles/Layout';
import { ModalManageContext } from '../../context/ModalManageContext';
import { ServiceContext } from '../../context/ServiceContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';
import { useNavigation } from '../../hooks/useNavigation';

export const SignInPage = () => {
  const { closeModal } = useGuardContext(ModalManageContext);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toMain } = useNavigation();

  const { authService } = useGuardContext(ServiceContext);
  const { saveToken } = useGuardContext(TokenManageContext);

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
        closeModal();
        toMain();
      } else {
        toast.error(response.message);
      }
    },
    onError: () => {
      toast.error('로그인 중 문제가 발생했습니다.');
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
    toast('아직 없는 기능이에요.', {
      icon: '🔔',
    });
  };

  if (isPending) return <LoadingPage />;

  return (
    <Layout>
      <div className="LoginWrapper flex flex-col items-center w-full min-h-screen px-[20px] psm:px-2 lg:px:8">
        <div className="LoginHeaderWrapper relative flex w-full mt-4 pb-6">
          <div className="BackButtonWrapper absolute flex top-0.5 left-0 items-center cursor-pointer ">
            <span className="text-gray-500 hover:text-orange" onClick={toMain}>
              &larr; 뒤로
            </span>
          </div>
          <h1 className="text-xl font-semibold text-center w-full">로그인</h1>
        </div>
        <div className="LoginWrapper flex flex-col flex-auto w-full h-full justify-between pb-8">
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
                className="py-1 border-b-2 border-gray focus:outline-none focus:border-orange"
              />
            </div>
            <div className="PasswordWrapper flex flex-col">
              <label htmlFor="password" className=" mb-1">
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
                className="py-1 border-b-2 border-gray text-sm focus:outline-none focus:border-orange"
              />
            </div>
            <div className="FindIdPwWrapper flex justify-left text-sm text-gray-500 py-4 gap-2">
              <a onClick={onClickTBD} className="hover:text-orange underline">
                아이디 찾기
              </a>
              <span>|</span>
              <a onClick={onClickTBD} className="hover:text-orange underline">
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
