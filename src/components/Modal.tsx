import { useNavigate } from 'react-router-dom';

import { ModalManageContext } from '../context/ModalManageContext';
import { useGuardContext } from '../hooks/useGuardContext';

export const ReSignInModal = () => {
  const { closeModal } = useGuardContext(ModalManageContext);

  const navigate = useNavigate();
  const onClickButton = () => {
    closeModal();
    navigate('/signin');
  };

  return (
    <div>
      <p>재로그인이 필요합니다.</p>
      <button onClick={onClickButton}>로그인 페이지로 이동</button>
    </div>
  );
};
