import { useNavigate } from 'react-router-dom';

export const ReSignInModal = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate('/signin');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-24 w-[30rem] animate-popup relative">
        <h2 className="text-lg font-semibold mb-4">
          인증정보가 올바르지 않아요
        </h2>
        <p className="text-gray-600 mb-24">다시 로그인해 주세요</p>
        <div className="flex justify-center w-full">
          <button
            onClick={onClickButton}
            className="bg-teal-500 text-white py-8 px-16 rounded-md hover:bg-teal-600"
          >
            로그인 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};
