import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  const onClickSignIn = () => {
    navigate('/signIn');
  };

  const onClickSignUp = () => {
    navigate('signUp');
  };
  return (
    <div>
      <button onClick={onClickSignIn}>로그인</button>
      <button onClick={onClickSignUp}>회원가입</button>
    </div>
  );
};
