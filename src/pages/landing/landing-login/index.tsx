import { useState } from 'react';

import { ServiceContext } from '../../../context/ServiceContext';
import { useGuardContext } from '../../../hooks/useGuardContext';

export const LandingLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { authService } = useGuardContext(ServiceContext);
  const onClickButton = async () => {
    const response = await authService.signIn({ id, password });
    if (response.type === 'success')
      alert(`로그인 성공! 토큰은 ${response.data.token}입니다.`);
    else alert(response.message);
  };
  return (
    <div className="LoginWrapper">
      <div className="LoginHeaderWrapper">
        <div>&larr; 뒤로</div>
        <h1>로그인</h1>
      </div>
      <div className="LoginFormWrapper">
        <div className="IDWrapper">
          <label htmlFor="id">아이디:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className="PasswordWrapper">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="FindIdPwWrapper">
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
        </div>
      </div>
      <button
        className="LoginButtonWrapper"
        onClick={() => {
          onClickButton().catch(() => {
            console.error('error');
          });
        }}
      >
        로그인
      </button>
    </div>
  );
};
