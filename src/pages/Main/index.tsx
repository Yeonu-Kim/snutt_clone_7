import { useQuery } from '@tanstack/react-query';

import { ServiceContext } from '../../context/ServiceContext';
import { TokenAuthContext } from '../../context/TokenAuthContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';

export const MainPage = () => {
  const { saveToken } = useGuardContext(TokenManageContext);
  const { userService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);

  const { data: userData } = useQuery({
    queryKey: ['UserService', 'getUserInfo', { token }] as const,
    queryFn: ({ queryKey }) => userService.getUserInfo(queryKey[2]),
  });

  const contaminateToken = () => {
    saveToken('xxx');
  };

  if (userData === undefined) return <div>로딩중...</div>;

  if (userData.type === 'success') {
    return (
      <>
        <p>아이디: {userData.data.local_id}</p>
        <button onClick={contaminateToken}>토큰 변조하기 버튼</button>
      </>
    );
  }

  return <p>{userData.message}</p>;
};
