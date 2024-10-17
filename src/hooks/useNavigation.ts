import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    toMain: () => {
      navigate('/', { replace: true });
    },
    toSignIn: () => {
      navigate('/signin', { replace: true });
    },
    toSignUp: () => {
      navigate('/signup', { replace: true });
    },
  };
};
