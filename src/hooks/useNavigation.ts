import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate('/', { replace: true });
  };

  const toSignIn = () => {
    navigate('/signin', { replace: true });
  };

  const toSignUp = () => {
    navigate('/signup', { replace: true });
  };

  return {
    toMain,
    toSignIn,
    toSignUp,
  };
};
