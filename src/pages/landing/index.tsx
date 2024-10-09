import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';
import { Landing } from './Landing';
import { Main } from './Main';

export const LandingPage = () => {
  const { getToken } = useGuardContext(TokenManageContext);
  const token = getToken();

  return token !== null ? <Main /> : <Landing />;
};
