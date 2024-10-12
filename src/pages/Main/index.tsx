import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { LoadingPage } from '../../components/Loading';
import { ServiceContext } from '../../context/ServiceContext';
import { TokenAuthContext } from '../../context/TokenAuthContext';
import { TokenManageContext } from '../../context/TokenManageContext';
import { useGuardContext } from '../../hooks/useGuardContext';

export const MainPage = () => {
  const { contaminateToken } = useGuardContext(TokenManageContext);
  const { userService } = useGuardContext(ServiceContext);
  const { token } = useGuardContext(TokenAuthContext);

  const { data: userData } = useQuery({
    queryKey: ['UserService', 'getUserInfo', { token }] as const,
    queryFn: ({ queryKey }) => userService.getUserInfo(queryKey[2]),
  });

  const handleClickContaminateButton = () => {
    contaminateToken('xxx');
  };

  if (userData === undefined) return <LoadingPage />;

  if (userData.type === 'success') {
    return (
      <div className="flex flex-col justify-between items-center h-dvh py-[300px]">
        <span className="text-xl font-bold">
          안녕하세요, {userData.data.nickname.nickname} #
          {userData.data.nickname.tag}님!
        </span>
        <div className="flex flex-col items-center gap-4">
          <span>개발자를 위한 버튼입니다.</span>
          <button
            className="flex px-10 py-2 rounded bg-orange text-white"
            onClick={handleClickContaminateButton}
          >
            토큰 변조하기 버튼
          </button>
        </div>
      </div>
    );
  }

  toast.error(userData.message);
  return null;
};
