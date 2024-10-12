import { useNavigate } from 'react-router-dom';

export const ReSignInModal = () => {
  const navigate = useNavigate();
  const onClickButton = () => {
    navigate('/signin');
  };

  return (
    <div>
      <p>재로그인이 필요합니다.</p>
      <button onClick={onClickButton}>로그인 페이지로 이동</button>
    </div>
  );
};
