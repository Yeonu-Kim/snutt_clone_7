import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate('/');
  };

  const toSignIn = () => {
    navigate('/signin');
  };

  const toSignUp = () => {
    navigate('/signup');
  };

  return {
    toMain,
    toSignIn,
    toSignUp,
  };
};
