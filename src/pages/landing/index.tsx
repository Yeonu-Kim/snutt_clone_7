import { useState } from 'react';

import { ServiceContext } from '../../context/ServiceContext';
import { useGaurdContext } from '../../hooks/useGaurdContext';

export const Landing = () => {
  // 로그인 목업
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const { authService } = useGaurdContext(ServiceContext);

  const onClickButton = async () => {
    const response = await authService.signIn({ id, password });
    if (response.type === 'success')
      alert(`로그인 성공! 토큰은 ${response.data.token}입니다.`);
    else alert(response.message);
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
