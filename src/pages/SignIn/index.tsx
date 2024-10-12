import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalManageContext } from '../../context/ModalManageContext';
import { ServiceContext } from '../../context/ServiceContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';

export const SignInPage = () => {
  const { closeModal } = useGuardContext(ModalManageContext);
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

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
        navigate('/');
      } else {
        alert(response.message);
      }
    },
    onError: () => {
      alert('로그인 중 문제가 발생했습니다.');
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

  if (isPending) return <div>로딩중...</div>;

  return (
    <div className="LoginWrapper flex flex-col items-center min-h-screen px-4 sm:px-6 lg:px:8">
      <div className="LoginHeaderWrapper flex items-center justify-between w-full mt-4 pb-6">
        <div className="text-gray-500">&larr; 뒤로</div>
        <h1 className="text-xl font-semibold text-center flex-1">로그인</h1>
        <div className="w-6"></div>
      </div>
      <div className="LoginFormWrapper w-full px-4 space-y-4">
        <div className="IDWrapper flex flex-col">
          <label htmlFor="id" className="text-gray-700 mb-1">
            아이디:
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
            className="p-3 border-b-2 border-gray-300 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="PasswordWrapper flex flex-col">
          <label htmlFor="password" className="text-gray-700 mb-1">
            비밀번호:
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
            className="p-3 border-b-2 border-gray-300 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="FindIdPwWrapper flex justify-between text-sm text-gray-500 py-4">
          <a href="#" className="hover:text-orange">
            아이디 찾기
          </a>
          <a href="#" className="hover:text-orange">
            비밀번호 찾기
          </a>
        </div>
        <button
          className={`LoginButton rounded-md w-full h-[41px] ${id !== '' && password !== '' ? 'bg-orange text-white cursor-pointer hover:800' : 'bg-gray-100 cursor-not-allowed'}`}
          onClick={onClickButton}
          disabled={!(id !== '' && password !== '')}
        >
          로그인
        </button>
      </div>
    </div>
  );
};
