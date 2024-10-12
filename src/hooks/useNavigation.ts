import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const toSignIn = () => {
    navigate('/signin');
  };

  const toSignUp = () => {
    navigate('/signup');
  };

  return {
    toSignIn,
    toSignUp,
  };
};
