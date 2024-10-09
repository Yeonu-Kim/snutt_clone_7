import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ServiceContext } from '../../context/ServiceContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';

export const SignInPage = () => {
  // 로그인 목업
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { authService } = useGuardContext(ServiceContext);
  const { saveToken } = useGuardContext(TokenManageContext);
  const navigate = useNavigate();

  const onClickButton = async () => {
    const response = await authService.signIn({ id, password });
    if (response.type === 'success') {
      saveToken(response.data.token);
      navigate('/');
    } else alert(response.message);
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        onClick={() => {
          onClickButton().catch(() => {
            console.error('error');
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};
