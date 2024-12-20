import { useEffect, useState } from 'react';

export const LoadingPage = () => {
  const tips = [
    '친구의 아이디를 알면 바로 친구 추가가 가능해요.',
    '강의 평점을 통해 강의 선택에 도움을 받을 수 있어요.',
    '시간표 테마기능으로 나만의 시간표를 만들어봐요',
    '내가 원하는 유형의 강의를 강의평 둘러보기에서 찾아봐요.',
    '내 계정 설정에서 아이디를 바꿀 수 있어요.',
    '빈자리 알림 기능으로 수강신청 클리어!',
    'SNUTT를 만든 사람들은 누구일까요? 개발자 정보를 확인해보세요.',
  ];

  // 시작 지점을 랜덤으로 설정
  const [currentTip, setCurrentTip] = useState(
    Math.floor(Math.random() * tips.length),
  );

  // 2초에 한번씩 문구가 바뀜.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTip((prevTip) => (prevTip + 1) % tips.length);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [tips.length]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-3 text-center dark:bg-gray-800">
      <div className="relative flex h-20 items-center justify-center space-x-2 text-6xl font-bold">
        <h1 className="flex space-x-1">
          <span className="animate-updown-1 text-blue">S</span>
          <span className="animate-updown-2 text-mint">N</span>
          <span className="animate-updown-3 text-lime">U</span>
          <span className="animate-updown-4 text-green">T</span>
          <span className="animate-updown-5 text-orange">T</span>
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
        로딩중... 잠시만 기다려주세요.
      </p>
      <div className="flex-col">
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
          😀 SNUTT의 숨은 꿀팁
        </p>
        <p className="animate-slide-up mt-2 text-sm text-gray-500 dark:text-gray-200">
          {tips[currentTip]}
        </p>
      </div>
    </div>
  );
};

export const SpinnerLoading = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white bg-opacity-75">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-mint"></div>
    </div>
  );
};
