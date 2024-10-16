import { ServiceContext } from '../context/ServiceContext';
import { TokenManageContext } from '../context/TokenManageContext';
import { useGuardContext } from '../hooks/useGuardContext';
import { useNavigation } from '../hooks/useNavigation';

export const ReSignInModal = () => {
  const { toSignIn } = useNavigation();
  const { authService } = useGuardContext(ServiceContext);
  const { clearToken } = useGuardContext(TokenManageContext);

  const onClickButton = () => {
    authService.logout();
    clearToken();
    toSignIn();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] animate-popup relative">
        <h2 className="text-lg font-semibold mb-4">
          인증정보가 올바르지 않아요
        </h2>
        <p className="text-gray-600 mb-6">다시 로그인해 주세요</p>
        <div className="flex justify-center w-full">
          <button
            onClick={onClickButton}
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          >
            로그인 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};
